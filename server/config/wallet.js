/**
 * VelocityVault x402 Wallet & Payment Configuration
 *
 * Configures the receiving wallet, network, facilitator,
 * and per-route pricing for all x402-gated API endpoints.
 */

// Default to env vars, fallback to testnet placeholder
const WALLET_ADDRESS = process.env.WALLET_ADDRESS || '0x0000000000000000000000000000000000000000';
const NETWORK = process.env.X402_NETWORK || 'base-sepolia';

/**
 * Pricing tiers for x402-gated endpoints.
 * Each key is an Express route path. Values are x402 route configs.
 * Prices are in USD (settled in USDC on Base).
 */
const ROUTE_PRICING = {
  // --- Tier 1: Micro reads ($0.001) ---
  'GET /api/x402/products': {
    price: '$0.001',
    network: NETWORK,
    config: {
      description: 'Full product catalog — 25+ verified BMX & e-bike listings with specs, pricing, and images',
    },
  },
  'GET /api/x402/products/:id': {
    price: '$0.001',
    network: NETWORK,
    config: {
      description: 'Single product detail — full specs, description, images, Amazon ASIN',
    },
  },
  'GET /api/x402/categories': {
    price: '$0.001',
    network: NETWORK,
    config: {
      description: 'Product categories with counts and metadata',
    },
  },

  // --- Tier 2: Intelligence ($0.005) ---
  'GET /api/x402/recommend': {
    price: '$0.005',
    network: NETWORK,
    config: {
      description: 'AI bike recommendation — provide rider profile, get ranked product matches',
    },
  },
  'GET /api/x402/compare': {
    price: '$0.005',
    network: NETWORK,
    config: {
      description: 'Side-by-side product comparison with spec diff and value scoring',
    },
  },
  'GET /api/x402/search': {
    price: '$0.005',
    network: NETWORK,
    config: {
      description: 'Semantic product search across catalog with relevance scoring',
    },
  },

  // --- Tier 3: Premium data ($0.01) ---
  'GET /api/x402/affiliate-intel': {
    price: '$0.01',
    network: NETWORK,
    config: {
      description: 'Affiliate intelligence — product links, commission rates, conversion data',
    },
  },
  'GET /api/x402/market-data': {
    price: '$0.01',
    network: NETWORK,
    config: {
      description: 'BMX market intelligence — pricing trends, category breakdown, demand signals',
    },
  },
  'GET /api/x402/analytics': {
    price: '$0.01',
    network: NETWORK,
    config: {
      description: 'Platform analytics snapshot — traffic, conversions, top products',
    },
  },

  // --- Tier 4: Bulk / Export ($0.05) ---
  'GET /api/x402/export': {
    price: '$0.05',
    network: NETWORK,
    config: {
      description: 'Full catalog export — complete product database as structured JSON',
    },
  },
};

export { WALLET_ADDRESS, NETWORK, ROUTE_PRICING };
