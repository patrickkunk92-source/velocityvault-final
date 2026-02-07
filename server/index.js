/**
 * VelocityVault x402 Monetization Server
 *
 * Express server that:
 * 1. Serves the static VelocityVault site
 * 2. Exposes free public API endpoints (health, pricing, preview)
 * 3. Gates premium API endpoints behind x402 paymentMiddleware
 *    so AI agents pay USDC on Base per request
 *
 * Usage:
 *   cp .env.example .env   # fill in wallet address + CDP keys
 *   npm install
 *   npm start
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { WALLET_ADDRESS, NETWORK, ROUTE_PRICING } from './config/wallet.js';
import { securityMiddleware } from './middleware/security.js';
import publicRoutes from './routes/public-api.js';
import x402Routes from './routes/x402-api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Global Middleware ───────────────────────────────────────
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false })); // CSP off for CDN assets
app.use(morgan('combined'));
app.use(express.json({ limit: '100kb' }));

// ─── Security Gatekeeper ────────────────────────────────────
// Rate limiting, input sanitization, threat detection, security headers
securityMiddleware(app);

// ─── Static Site ─────────────────────────────────────────────
const staticDir = process.env.STATIC_DIR || path.join(__dirname, '..');
app.use(express.static(staticDir));

// ─── Public (free) API ───────────────────────────────────────
app.use('/api', publicRoutes);

// ─── x402 Payment Middleware ─────────────────────────────────
// Dynamic import so the server still starts even if the x402
// packages aren't installed yet (graceful degradation).
async function mountX402() {
  try {
    const { paymentMiddleware } = await import('x402-express');

    // Try to use the Coinbase facilitator if CDP keys are configured
    let facilitator;
    try {
      if (process.env.CDP_API_KEY_ID && process.env.CDP_API_KEY_SECRET) {
        const coinbase = await import('@coinbase/x402');
        facilitator = coinbase.facilitator;
        console.log('[x402] Using Coinbase facilitator (production)');
      }
    } catch {
      // Coinbase facilitator not available — use default
    }

    const middlewareArgs = [WALLET_ADDRESS, ROUTE_PRICING];
    if (facilitator) middlewareArgs.push(facilitator);

    app.use(paymentMiddleware(...middlewareArgs));
    console.log('[x402] Payment middleware active');
    console.log(`[x402] Wallet: ${WALLET_ADDRESS}`);
    console.log(`[x402] Network: ${NETWORK}`);
    console.log(`[x402] Protected routes: ${Object.keys(ROUTE_PRICING).length}`);
  } catch (err) {
    console.warn('[x402] Payment middleware not loaded — running in OPEN mode (no payment required)');
    console.warn('[x402] Install packages: npm install x402-express @coinbase/x402');
    console.warn(`[x402] Error: ${err.message}`);
  }
}

await mountX402();

// ─── x402-Gated API Routes ──────────────────────────────────
app.use('/api/x402', x402Routes);

// ─── Revenue Tracking Middleware ─────────────────────────────
// Logs every paid request for internal analytics
app.use('/api/x402', (req, _res, next) => {
  const payment = req.headers['x-payment'] || req.headers['payment-signature'];
  if (payment) {
    console.log(`[x402:paid] ${req.method} ${req.path} — payment received`);
  }
  next();
});

// ─── Fallback: serve index.html for SPA-like navigation ─────
app.get('*', (_req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

// ─── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║         VelocityVault x402 Monetization Server      ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log(`║  Server:    http://localhost:${PORT}                    ║`);
  console.log(`║  Network:   ${NETWORK.padEnd(40)}║`);
  console.log(`║  Wallet:    ${WALLET_ADDRESS.slice(0, 10)}...${WALLET_ADDRESS.slice(-6)}                    ║`);
  console.log('║                                                      ║');
  console.log('║  Free endpoints:                                     ║');
  console.log('║    GET /api/health        — health check             ║');
  console.log('║    GET /api/pricing       — x402 pricing table       ║');
  console.log('║    GET /api/preview       — catalog teaser           ║');
  console.log('║    GET /api/x402/info     — protocol discovery       ║');
  console.log('║                                                      ║');
  console.log('║  x402-gated endpoints (USDC on Base):                ║');
  console.log('║    GET /api/x402/products      — $0.001              ║');
  console.log('║    GET /api/x402/products/:id  — $0.001              ║');
  console.log('║    GET /api/x402/categories    — $0.001              ║');
  console.log('║    GET /api/x402/recommend     — $0.005              ║');
  console.log('║    GET /api/x402/compare       — $0.005              ║');
  console.log('║    GET /api/x402/search        — $0.005              ║');
  console.log('║    GET /api/x402/affiliate-intel — $0.01             ║');
  console.log('║    GET /api/x402/market-data   — $0.01               ║');
  console.log('║    GET /api/x402/analytics     — $0.01               ║');
  console.log('║    GET /api/x402/export        — $0.05               ║');
  console.log('║                                                      ║');
  console.log('║  Security:                                           ║');
  console.log('║    Rate limiting .............. 100 req/min/IP       ║');
  console.log('║    Input sanitization ......... Active               ║');
  console.log('║    Threat detection ........... Active               ║');
  console.log('║    Security headers ........... Active               ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
});

export default app;
