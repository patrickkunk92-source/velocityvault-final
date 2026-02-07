/**
 * VelocityVault x402-Gated API Routes
 *
 * Every route in this file is protected by the x402 paymentMiddleware.
 * AI agents pay USDC on Base to access structured bike data,
 * recommendations, affiliate intelligence, and market analytics.
 */

import { Router } from 'express';
import { products, AMAZON_TAG, getMarketData, getAffiliateLink } from '../data/products.js';

const router = Router();

// ============================================================
// TIER 1 — Micro reads ($0.001 per request)
// ============================================================

/**
 * GET /api/x402/products
 * Full product catalog with optional filters.
 * Query params: ?category=bmx-20&brand=Mongoose&minPrice=100&maxPrice=300&tag=freestyle
 */
router.get('/products', (req, res) => {
  let results = [...products];
  const { category, brand, minPrice, maxPrice, tag, wheelSize, inStock, sort, limit, offset } = req.query;

  if (category) results = results.filter(p => p.category === category);
  if (brand) results = results.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
  if (minPrice) results = results.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) results = results.filter(p => p.price <= parseFloat(maxPrice));
  if (tag) results = results.filter(p => p.tags.includes(tag));
  if (wheelSize) results = results.filter(p => p.wheelSize === wheelSize);
  if (inStock === 'true') results = results.filter(p => p.inStock);

  // Sorting
  if (sort === 'price_asc') results.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') results.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
  else if (sort === 'reviews') results.sort((a, b) => b.reviews - a.reviews);

  const total = results.length;
  const off = parseInt(offset) || 0;
  const lim = parseInt(limit) || total;
  results = results.slice(off, off + lim);

  res.json({
    provider: 'VelocityVault x402 API',
    endpoint: '/api/x402/products',
    total,
    offset: off,
    limit: lim,
    filters_applied: { category, brand, minPrice, maxPrice, tag, wheelSize, inStock, sort },
    products: results,
  });
});

/**
 * GET /api/x402/products/:id
 * Single product with full detail and affiliate link.
 */
router.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found', id: req.params.id });

  res.json({
    provider: 'VelocityVault x402 API',
    endpoint: `/api/x402/products/${req.params.id}`,
    product: {
      ...product,
      affiliate_link: getAffiliateLink(product.asin),
      affiliate_tag: AMAZON_TAG,
      savings: +(product.msrp - product.price).toFixed(2),
      discount_pct: +((1 - product.price / product.msrp) * 100).toFixed(1),
    },
  });
});

/**
 * GET /api/x402/categories
 * All product categories with counts and price ranges.
 */
router.get('/categories', (_req, res) => {
  const categories = {};
  for (const p of products) {
    if (!categories[p.category]) {
      categories[p.category] = { count: 0, products: [], priceRange: { min: Infinity, max: 0 }, brands: new Set() };
    }
    const cat = categories[p.category];
    cat.count++;
    cat.products.push(p.id);
    cat.priceRange.min = Math.min(cat.priceRange.min, p.price);
    cat.priceRange.max = Math.max(cat.priceRange.max, p.price);
    cat.brands.add(p.brand);
  }

  const result = {};
  for (const [key, val] of Object.entries(categories)) {
    result[key] = { ...val, brands: [...val.brands] };
  }

  res.json({
    provider: 'VelocityVault x402 API',
    endpoint: '/api/x402/categories',
    total_categories: Object.keys(result).length,
    categories: result,
  });
});

// ============================================================
// TIER 2 — Intelligence ($0.005 per request)
// ============================================================

/**
 * GET /api/x402/recommend
 * Bike recommendation engine.
 * Query: ?age=adult&budget=200&style=freestyle&experience=intermediate
 */
router.get('/recommend', (req, res) => {
  const { age, budget, style, experience, wheelSize: prefWheel } = req.query;
  let candidates = [...products];

  // Filter by age / wheel size preference
  if (age === 'kids' || prefWheel === '16"' || prefWheel === '18"') {
    candidates = candidates.filter(p => ['bmx-16', 'bmx-18'].includes(p.category));
  } else if (age === 'teen') {
    candidates = candidates.filter(p => ['bmx-20', 'bmx-24'].includes(p.category));
  } else if (age === 'adult') {
    candidates = candidates.filter(p => ['bmx-20', 'bmx-24', 'bmx-26', 'bmx-29', 'electric'].includes(p.category));
  }

  // Budget filter
  if (budget) {
    const maxBudget = parseFloat(budget);
    candidates = candidates.filter(p => p.price <= maxBudget * 1.1); // 10% flex
  }

  // Style filter
  if (style) {
    candidates = candidates.filter(p => p.subcategory === style || p.tags.includes(style));
  }

  // Experience-based sorting
  if (experience === 'beginner') {
    candidates = candidates.filter(p => p.tags.includes('beginner') || p.tags.includes('entry-level') || p.tags.includes('kids'));
    candidates.sort((a, b) => a.price - b.price);
  } else if (experience === 'intermediate') {
    candidates.sort((a, b) => b.rating - a.rating);
  } else if (experience === 'advanced' || experience === 'pro') {
    candidates = candidates.filter(p => p.tags.includes('pro') || p.tags.includes('advanced') || p.tags.includes('chromoly'));
    candidates.sort((a, b) => b.rating - a.rating);
  } else {
    // Default: best value sort
    candidates.sort((a, b) => (b.rating / b.price) - (a.rating / a.price));
  }

  const recommendations = candidates.slice(0, 5).map((p, i) => ({
    rank: i + 1,
    id: p.id,
    name: p.name,
    price: p.price,
    rating: p.rating,
    brand: p.brand,
    category: p.category,
    wheelSize: p.wheelSize,
    match_reason: buildMatchReason(p, { age, budget, style, experience }),
    affiliate_link: getAffiliateLink(p.asin),
  }));

  res.json({
    provider: 'VelocityVault x402 API',
    endpoint: '/api/x402/recommend',
    query: { age, budget, style, experience },
    total_matches: candidates.length,
    recommendations,
  });
});

function buildMatchReason(product, criteria) {
  const reasons = [];
  if (criteria.budget && product.price <= parseFloat(criteria.budget)) reasons.push('within budget');
  if (criteria.style && (product.subcategory === criteria.style || product.tags.includes(criteria.style))) reasons.push(`matches ${criteria.style} style`);
  if (product.rating >= 4.5) reasons.push('top rated');
  if (product.tags.includes('best-seller')) reasons.push('best seller');
  if (product.msrp - product.price > 30) reasons.push(`$${(product.msrp - product.price).toFixed(0)} savings`);
  return reasons.length ? reasons.join(', ') : 'good overall match';
}

/**
 * GET /api/x402/compare
 * Side-by-side comparison. Query: ?ids=4,5,7
 */
router.get('/compare', (req, res) => {
  const ids = (req.query.ids || '').split(',').filter(Boolean);
  if (ids.length < 2) return res.status(400).json({ error: 'Provide at least 2 product IDs via ?ids=4,5,7' });

  const items = ids.map(id => products.find(p => p.id === id)).filter(Boolean);
  if (items.length < 2) return res.status(404).json({ error: 'One or more product IDs not found' });

  // Build spec diff
  const allSpecKeys = new Set();
  items.forEach(p => Object.keys(p.specs).forEach(k => allSpecKeys.add(k)));

  const specComparison = {};
  for (const key of allSpecKeys) {
    specComparison[key] = items.map(p => ({ id: p.id, value: p.specs[key] || 'N/A' }));
  }

  // Value scoring
  const compared = items.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    msrp: p.msrp,
    rating: p.rating,
    reviews: p.reviews,
    brand: p.brand,
    category: p.category,
    valueScore: +(p.rating / (p.price / 100)).toFixed(2),
    savings: +(p.msrp - p.price).toFixed(2),
    affiliate_link: getAffiliateLink(p.asin),
  }));

  const bestValue = [...compared].sort((a, b) => b.valueScore - a.valueScore)[0];
  const cheapest = [...compared].sort((a, b) => a.price - b.price)[0];
  const highestRated = [...compared].sort((a, b) => b.rating - a.rating)[0];

  res.json({
    provider: 'VelocityVault x402 API',
    endpoint: '/api/x402/compare',
    products: compared,
    spec_comparison: specComparison,
    winners: {
      best_value: { id: bestValue.id, name: bestValue.name, score: bestValue.valueScore },
      cheapest: { id: cheapest.id, name: cheapest.name, price: cheapest.price },
      highest_rated: { id: highestRated.id, name: highestRated.name, rating: highestRated.rating },
    },
  });
});

/**
 * GET /api/x402/search
 * Semantic keyword search across catalog.
 * Query: ?q=chromoly+freestyle+pegs
 */
router.get('/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase().trim();
  if (!query) return res.status(400).json({ error: 'Provide a search query via ?q=keyword' });

  const terms = query.split(/\s+/);

  const scored = products.map(p => {
    const searchable = [p.name, p.brand, p.description, p.category, p.subcategory, p.style, ...p.tags, ...Object.values(p.specs).map(String)].join(' ').toLowerCase();
    let score = 0;
    for (const term of terms) {
      const regex = new RegExp(term, 'gi');
      const matches = searchable.match(regex);
      if (matches) score += matches.length;
    }
    return { product: p, score };
  }).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

  res.json({
    provider: 'VelocityVault x402 API',
    endpoint: '/api/x402/search',
    query,
    total_results: scored.length,
    results: scored.map((s, i) => ({
      rank: i + 1,
      relevance_score: s.score,
      id: s.product.id,
      name: s.product.name,
      price: s.product.price,
      rating: s.product.rating,
      brand: s.product.brand,
      category: s.product.category,
      affiliate_link: getAffiliateLink(s.product.asin),
    })),
  });
});

// ============================================================
// TIER 3 — Premium data ($0.01 per request)
// ============================================================

/**
 * GET /api/x402/affiliate-intel
 * Affiliate link intelligence: links, commissions, best earners.
 */
router.get('/affiliate-intel', (_req, res) => {
  const affiliateData = products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    asin: p.asin,
    affiliate_link: getAffiliateLink(p.asin),
    affiliate_tag: AMAZON_TAG,
    estimated_commission_rate: '4-8%',
    estimated_commission_usd: +((p.price * 0.06).toFixed(2)),
    category: p.category,
    rating: p.rating,
    reviews: p.reviews,
    conversion_potential: p.reviews > 1000 ? 'high' : p.reviews > 500 ? 'medium' : 'low',
  }));

  const topEarners = [...affiliateData].sort((a, b) => b.estimated_commission_usd - a.estimated_commission_usd).slice(0, 5);
  const highConversion = affiliateData.filter(p => p.conversion_potential === 'high');

  res.json({
    provider: 'VelocityVault x402 API',
    endpoint: '/api/x402/affiliate-intel',
    affiliate_tag: AMAZON_TAG,
    affiliate_program: 'Amazon Associates',
    total_products: affiliateData.length,
    products: affiliateData,
    insights: {
      top_earners: topEarners,
      high_conversion_products: highConversion.length,
      total_estimated_commission_if_all_sell: +affiliateData.reduce((sum, p) => sum + p.estimated_commission_usd, 0).toFixed(2),
    },
  });
});

/**
 * GET /api/x402/market-data
 * BMX market intelligence from catalog analytics.
 */
router.get('/market-data', (_req, res) => {
  const data = getMarketData();
  res.json({
    provider: 'VelocityVault x402 API',
    endpoint: '/api/x402/market-data',
    ...data,
  });
});

/**
 * GET /api/x402/analytics
 * Platform analytics snapshot (simulated from catalog data).
 */
router.get('/analytics', (_req, res) => {
  const totalReviews = products.reduce((s, p) => s + p.reviews, 0);
  const avgRating = +(products.reduce((s, p) => s + p.rating, 0) / products.length).toFixed(2);
  const totalCatalogValue = +products.reduce((s, p) => s + p.price, 0).toFixed(2);

  const byCategory = {};
  for (const p of products) {
    if (!byCategory[p.category]) byCategory[p.category] = { count: 0, totalRevenuePotential: 0, avgRating: 0, ratings: [] };
    byCategory[p.category].count++;
    byCategory[p.category].totalRevenuePotential += p.price;
    byCategory[p.category].ratings.push(p.rating);
  }
  for (const cat of Object.values(byCategory)) {
    cat.avgRating = +(cat.ratings.reduce((a, b) => a + b, 0) / cat.ratings.length).toFixed(2);
    cat.totalRevenuePotential = +cat.totalRevenuePotential.toFixed(2);
    delete cat.ratings;
  }

  res.json({
    provider: 'VelocityVault x402 API',
    endpoint: '/api/x402/analytics',
    platform: 'velocityvault.pro',
    snapshot_date: new Date().toISOString(),
    catalog: {
      total_products: products.length,
      total_catalog_value: totalCatalogValue,
      total_customer_reviews: totalReviews,
      avg_product_rating: avgRating,
      categories_breakdown: byCategory,
    },
    top_products: {
      by_rating: [...products].sort((a, b) => b.rating - a.rating).slice(0, 3).map(p => ({ id: p.id, name: p.name, rating: p.rating })),
      by_reviews: [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 3).map(p => ({ id: p.id, name: p.name, reviews: p.reviews })),
      by_value: [...products].sort((a, b) => (b.msrp - b.price) - (a.msrp - a.price)).slice(0, 3).map(p => ({ id: p.id, name: p.name, savings: +(p.msrp - p.price).toFixed(2) })),
    },
  });
});

// ============================================================
// TIER 4 — Bulk / Export ($0.05 per request)
// ============================================================

/**
 * GET /api/x402/export
 * Full catalog export with affiliate links.
 */
router.get('/export', (_req, res) => {
  const fullExport = products.map(p => ({
    ...p,
    affiliate_link: getAffiliateLink(p.asin),
    affiliate_tag: AMAZON_TAG,
    savings: +(p.msrp - p.price).toFixed(2),
    discount_pct: +((1 - p.price / p.msrp) * 100).toFixed(1),
  }));

  res.json({
    provider: 'VelocityVault x402 API',
    endpoint: '/api/x402/export',
    exported_at: new Date().toISOString(),
    format: 'json',
    total_products: fullExport.length,
    affiliate_tag: AMAZON_TAG,
    market_summary: getMarketData(),
    products: fullExport,
  });
});

export default router;
