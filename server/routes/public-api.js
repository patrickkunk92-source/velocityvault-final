/**
 * VelocityVault Public (Free) API Routes
 *
 * These routes are NOT gated by x402. They serve:
 * - API health / discovery
 * - x402 pricing documentation (so agents know what to pay)
 * - Free product count (teaser to upsell premium)
 */

import { Router } from 'express';
import { products } from '../data/products.js';
import { WALLET_ADDRESS, NETWORK, ROUTE_PRICING } from '../config/wallet.js';

const router = Router();

/**
 * GET /api/health
 * Health check + protocol info.
 */
router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'VelocityVault x402 API',
    version: '1.0.0',
    protocol: 'x402',
    network: NETWORK,
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/pricing
 * Full x402 pricing table so agents can discover what's available and how much it costs.
 */
router.get('/pricing', (_req, res) => {
  const pricing = Object.entries(ROUTE_PRICING).map(([route, config]) => ({
    route,
    price: config.price,
    network: config.network,
    currency: 'USDC',
    description: config.config?.description || '',
  }));

  // Group by tier
  const tiers = {
    micro: { label: 'Micro Reads', price: '$0.001', endpoints: [] },
    intelligence: { label: 'Intelligence', price: '$0.005', endpoints: [] },
    premium: { label: 'Premium Data', price: '$0.01', endpoints: [] },
    bulk: { label: 'Bulk Export', price: '$0.05', endpoints: [] },
  };

  for (const p of pricing) {
    if (p.price === '$0.001') tiers.micro.endpoints.push(p);
    else if (p.price === '$0.005') tiers.intelligence.endpoints.push(p);
    else if (p.price === '$0.01') tiers.premium.endpoints.push(p);
    else if (p.price === '$0.05') tiers.bulk.endpoints.push(p);
  }

  res.json({
    provider: 'VelocityVault',
    protocol: 'x402 (HTTP 402 Payment Required)',
    payment_currency: 'USDC',
    payment_network: NETWORK,
    payment_address: WALLET_ADDRESS,
    facilitator: 'Coinbase Developer Platform',
    documentation: 'https://velocityvault.pro/x402-docs.html',
    tiers,
    all_endpoints: pricing,
  });
});

/**
 * GET /api/preview
 * Free teaser — product count + categories only (no detail).
 * Encourages agents to pay for full data.
 */
router.get('/preview', (_req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  res.json({
    provider: 'VelocityVault',
    message: 'This is a free preview. Pay via x402 to access full product data, recommendations, and affiliate intelligence.',
    catalog_summary: {
      total_products: products.length,
      categories,
      brands,
      price_range: {
        min: Math.min(...products.map(p => p.price)),
        max: Math.max(...products.map(p => p.price)),
      },
    },
    upgrade: {
      full_catalog: 'GET /api/x402/products — $0.001 USDC',
      recommendations: 'GET /api/x402/recommend — $0.005 USDC',
      affiliate_data: 'GET /api/x402/affiliate-intel — $0.01 USDC',
      full_export: 'GET /api/x402/export — $0.05 USDC',
    },
    pricing_endpoint: '/api/pricing',
  });
});

/**
 * GET /api/x402/info
 * x402 protocol info for agent discovery.
 */
router.get('/x402/info', (_req, res) => {
  res.json({
    protocol: 'x402',
    spec: 'https://www.x402.org',
    version: '1.0',
    provider: 'VelocityVault',
    domain: 'velocityvault.pro',
    wallet: WALLET_ADDRESS,
    network: NETWORK,
    currency: 'USDC',
    facilitator: 'https://x402.org/facilitator',
    description: 'BMX & e-bike product data API monetized via x402. AI agents pay USDC per request for structured product data, recommendations, affiliate intelligence, and market analytics.',
    capabilities: [
      'product-catalog',
      'product-search',
      'product-comparison',
      'bike-recommendations',
      'affiliate-intelligence',
      'market-analytics',
      'bulk-export',
    ],
  });
});

export default router;
