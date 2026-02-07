/**
 * VelocityVault Security Middleware
 *
 * Digital gatekeeper that protects the site and API from:
 * - Brute force / DDoS via rate limiting
 * - XSS / injection via input sanitization
 * - Clickjacking via security headers
 * - MIME sniffing attacks
 * - Directory traversal
 * - Suspicious payloads (SQL injection, script injection, path traversal)
 * - Oversized request bodies
 */

// ─── In-memory rate limiter ─────────────────────────────────
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 100;     // max requests per window per IP
const RATE_LIMIT_X402_MAX = 200;         // higher limit for paying x402 agents

function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS * 2) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimits, 5 * 60 * 1000);

function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return next();
  }

  const entry = rateLimitStore.get(ip);

  // Reset window if expired
  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    entry.count = 1;
    entry.windowStart = now;
    return next();
  }

  entry.count++;

  // Paying x402 agents get a higher limit
  const isX402 = req.path.startsWith('/api/x402/') && req.headers['x-payment'];
  const limit = isX402 ? RATE_LIMIT_X402_MAX : RATE_LIMIT_MAX_REQUESTS;

  if (entry.count > limit) {
    res.set('Retry-After', Math.ceil((RATE_LIMIT_WINDOW_MS - (now - entry.windowStart)) / 1000));
    return res.status(429).json({
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Max ${limit} requests per minute.`,
      retryAfter: Math.ceil((RATE_LIMIT_WINDOW_MS - (now - entry.windowStart)) / 1000),
    });
  }

  // Add rate limit headers
  res.set('X-RateLimit-Limit', String(limit));
  res.set('X-RateLimit-Remaining', String(limit - entry.count));
  res.set('X-RateLimit-Reset', String(Math.ceil((entry.windowStart + RATE_LIMIT_WINDOW_MS) / 1000)));

  next();
}

// ─── Input sanitization ─────────────────────────────────────
// Block requests with suspicious patterns in query/params/body

const SUSPICIOUS_PATTERNS = [
  // SQL injection
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC)\b.*\b(FROM|INTO|TABLE|WHERE|SET)\b)/i,
  /('.*--)/,
  /(;.*DROP\b)/i,

  // Script injection / XSS
  /<script[\s>]/i,
  /javascript:/i,
  /on(load|error|click|mouseover|submit|focus|blur)\s*=/i,
  /<iframe/i,
  /<object/i,
  /<embed/i,

  // Path traversal
  /\.\.\//,
  /\.\.\\/,
  /%2e%2e/i,
  /%252e%252e/i,

  // Command injection
  /[;&|`$].*\b(cat|ls|rm|mv|cp|wget|curl|bash|sh|python|perl|ruby|nc|ncat)\b/i,
  /\$\(.*\)/,
  /`.*`/,

  // Null byte injection
  /%00/,
  /\x00/,
];

function inputSanitizer(req, res, next) {
  const checkValue = (value, location) => {
    if (typeof value !== 'string') return false;
    for (const pattern of SUSPICIOUS_PATTERNS) {
      if (pattern.test(value)) {
        console.warn(`[SECURITY] Blocked suspicious ${location}: ${value.substring(0, 100)}`);
        return true;
      }
    }
    return false;
  };

  // Check query parameters
  for (const [key, value] of Object.entries(req.query || {})) {
    if (checkValue(key, 'query key') || checkValue(String(value), 'query value')) {
      return res.status(400).json({ error: 'Bad Request', message: 'Invalid characters in request' });
    }
  }

  // Check URL params
  for (const [key, value] of Object.entries(req.params || {})) {
    if (checkValue(key, 'param key') || checkValue(String(value), 'param value')) {
      return res.status(400).json({ error: 'Bad Request', message: 'Invalid characters in request' });
    }
  }

  // Check body (for POST endpoints)
  if (req.body && typeof req.body === 'object') {
    const bodyStr = JSON.stringify(req.body);
    if (bodyStr.length > 10000) {
      return res.status(413).json({ error: 'Payload Too Large', message: 'Request body exceeds 10KB limit' });
    }
    for (const pattern of SUSPICIOUS_PATTERNS) {
      if (pattern.test(bodyStr)) {
        console.warn(`[SECURITY] Blocked suspicious body content`);
        return res.status(400).json({ error: 'Bad Request', message: 'Invalid content in request body' });
      }
    }
  }

  next();
}

// ─── Security headers ───────────────────────────────────────
function securityHeaders(_req, res, next) {
  // Prevent clickjacking
  res.set('X-Frame-Options', 'SAMEORIGIN');

  // Prevent MIME-type sniffing
  res.set('X-Content-Type-Options', 'nosniff');

  // XSS protection (legacy browsers)
  res.set('X-XSS-Protection', '1; mode=block');

  // Referrer policy
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions policy — disable unnecessary browser features
  res.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(self)');

  // HSTS (uncomment for production with HTTPS)
  // res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  next();
}

// ─── Request logging for threat detection ───────────────────
const suspiciousIPs = new Map();
const SUSPICIOUS_THRESHOLD = 10; // blocked attempts before flagging

function threatLogger(req, res, next) {
  // Log blocked requests to detect persistent attackers
  const originalSend = res.send;
  res.send = function(body) {
    if (res.statusCode === 400 || res.statusCode === 429) {
      const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
      const count = (suspiciousIPs.get(ip) || 0) + 1;
      suspiciousIPs.set(ip, count);

      if (count >= SUSPICIOUS_THRESHOLD) {
        console.error(`[THREAT] IP ${ip} has ${count} blocked requests — potential attack`);
      }
    }
    return originalSend.call(this, body);
  };
  next();
}

// ─── Combined security middleware ───────────────────────────
function securityMiddleware(app) {
  app.use(securityHeaders);
  app.use(threatLogger);
  app.use(rateLimiter);
  app.use(inputSanitizer);

  // Limit JSON body size to 100KB
  app.use((req, res, next) => {
    if (req.headers['content-length'] && parseInt(req.headers['content-length']) > 100000) {
      return res.status(413).json({ error: 'Payload Too Large' });
    }
    next();
  });

  console.log('[SECURITY] Digital gatekeeper active — rate limiting, input sanitization, threat detection enabled');
}

export { securityMiddleware, rateLimiter, inputSanitizer, securityHeaders, threatLogger };
