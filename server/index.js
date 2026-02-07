/**
 * VelocityVault x402 Monetization Server
 *
 * Express server that:
 * 1. Serves the static VelocityVault site
 * 2. Exposes free public API endpoints (health, pricing, preview)
 * 3. Gates premium API endpoints behind x402 paymentMiddleware
 *    so AI agents pay USDC on Base per request
 * 4. Full security hardening (rate limiting, WAF, agent auth, CORS lockdown)
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

// ─── Trust proxy (for Vercel / Cloudflare) ──────────────────
app.set('trust proxy', 1);

// ─── Global Middleware ───────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://velocityvault.pro', 'https://www.velocityvault.pro']
    : true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-PAYMENT', 'Authorization', 'X-API-Key'],
  exposedHeaders: ['X-PAYMENT-RESPONSE', 'X-RateLimit-Limit', 'X-RateLimit-Remaining'],
  maxAge: 86400,
}));
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '100kb' }));

// ─── Security Gatekeeper ────────────────────────────────────
securityMiddleware(app);

// ─── Static Site ─────────────────────────────────────────────
const staticDir = process.env.STATIC_DIR || path.join(__dirname, '..');
app.use(express.static(staticDir));

// ─── Public (free) API ───────────────────────────────────────
app.use('/api', publicRoutes);

// ─── x402 Payment Middleware ─────────────────────────────────
async function mountX402() {
  try {
    const { paymentMiddleware } = await import('x402-express');

    // Use Coinbase facilitator (reads CDP_API_KEY_ID and CDP_API_KEY_SECRET from env)
    let facilitatorConfig;
    try {
      const { createFacilitatorConfig, facilitator } = await import('@coinbase/x402');
      if (process.env.CDP_API_KEY_ID && process.env.CDP_API_KEY_SECRET) {
        facilitatorConfig = createFacilitatorConfig(
          process.env.CDP_API_KEY_ID,
          process.env.CDP_API_KEY_SECRET,
        );
        console.log('[x402] Coinbase facilitator configured with CDP API keys');
      } else {
        // Default facilitator reads env vars at request time
        facilitatorConfig = facilitator;
        console.log('[x402] Coinbase facilitator (env-based auth)');
      }
    } catch {
      console.warn('[x402] @coinbase/x402 not loaded — using default facilitator');
    }

    const args = [WALLET_ADDRESS, ROUTE_PRICING];
    if (facilitatorConfig) args.push(facilitatorConfig);

    app.use(paymentMiddleware(...args));
    console.log('[x402] Payment middleware ACTIVE');
    console.log(`[x402] Collecting fees at: ${WALLET_ADDRESS}`);
    console.log(`[x402] Network: ${NETWORK}`);
    console.log(`[x402] Protected routes: ${Object.keys(ROUTE_PRICING).length}`);
  } catch (err) {
    console.warn('[x402] Payment middleware not loaded — OPEN mode (no payment required)');
    console.warn(`[x402] Reason: ${err.message}`);
  }
}

await mountX402();

// ─── x402-Gated API Routes ──────────────────────────────────
app.use('/api/x402', x402Routes);

// ─── Revenue Tracking ───────────────────────────────────────
app.use('/api/x402', (req, _res, next) => {
  const payment = req.headers['x-payment'];
  if (payment) {
    console.log(`[x402:paid] ${req.method} ${req.path} from ${req.ip}`);
  }
  next();
});

// ─── Fallback: serve index.html ─────────────────────────────
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
  console.log('║    Rate limiting .............. ACTIVE                ║');
  console.log('║    WAF / Input filter ......... ACTIVE                ║');
  console.log('║    Threat detection ........... ACTIVE                ║');
  console.log('║    CORS lockdown .............. ACTIVE                ║');
  console.log('║    IP ban (auto) .............. ACTIVE                ║');
  console.log('║    Bot fingerprint ............ ACTIVE                ║');
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
});

export default app;
