/**
 * VelocityVault x402 Application
 *
 * Creates and configures the Express app with:
 * - x402 payment middleware (USDC on Base)
 * - 7-layer security hardening
 * - Public + paid API routes
 *
 * Exported for both:
 * - Local dev: server/start.js calls app.listen()
 * - Vercel: api/index.js re-exports as serverless function
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

// ─── Trust proxy (Vercel / Cloudflare) ──────────────────────
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
app.use(morgan('short'));
app.use(express.json({ limit: '100kb' }));

// ─── Security Gatekeeper ────────────────────────────────────
securityMiddleware(app);

// ─── Public (free) API ───────────────────────────────────────
app.use('/api', publicRoutes);

// ─── x402 Payment Middleware ─────────────────────────────────
async function mountX402() {
  try {
    const { paymentMiddleware } = await import('x402-express');

    let facilitatorConfig;
    try {
      const { createFacilitatorConfig, facilitator } = await import('@coinbase/x402');
      if (process.env.CDP_API_KEY_ID && process.env.CDP_API_KEY_SECRET) {
        facilitatorConfig = createFacilitatorConfig(
          process.env.CDP_API_KEY_ID,
          process.env.CDP_API_KEY_SECRET,
        );
        console.log('[x402] Coinbase facilitator with CDP keys');
      } else {
        facilitatorConfig = facilitator;
        console.log('[x402] Coinbase facilitator (env-based)');
      }
    } catch {
      // fallback
    }

    const args = [WALLET_ADDRESS, ROUTE_PRICING];
    if (facilitatorConfig) args.push(facilitatorConfig);

    app.use(paymentMiddleware(...args));
    console.log(`[x402] ACTIVE — fees -> ${WALLET_ADDRESS}`);
  } catch (err) {
    console.warn(`[x402] OPEN mode — ${err.message}`);
  }
}

await mountX402();

// ─── x402-Gated API Routes ──────────────────────────────────
app.use('/api/x402', x402Routes);

// ─── Revenue log ────────────────────────────────────────────
app.use('/api/x402', (req, _res, next) => {
  if (req.headers['x-payment']) {
    console.log(`[x402:paid] ${req.method} ${req.path} from ${req.ip}`);
  }
  next();
});

export default app;
