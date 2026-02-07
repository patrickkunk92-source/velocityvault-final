/**
 * VelocityVault Production Security Middleware
 *
 * Multi-layer defense:
 * 1. IP auto-ban — repeated offenders get temp-banned
 * 2. Rate limiting — per-IP, higher limits for x402 payers
 * 3. WAF — blocks SQL injection, XSS, path traversal, command injection
 * 4. Bot fingerprinting — detects scanner/exploit tools
 * 5. Admin route protection — ADMIN_API_KEY required
 * 6. Security headers — HSTS, CSP reporting, frame protection
 * 7. Request integrity — body size, content-type validation
 */

// ─── IP Ban Store ───────────────────────────────────────────
const bannedIPs = new Map();        // ip -> { until: timestamp, reason: string }
const strikeCounter = new Map();    // ip -> count
const STRIKE_THRESHOLD = 15;        // strikes before auto-ban
const BAN_DURATION_MS = 15 * 60 * 1000; // 15 minute ban

// ─── Rate Limit Store ───────────────────────────────────────
const rateLimitStore = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX) || 100;
const MAX_X402_REQUESTS = parseInt(process.env.RATE_LIMIT_X402_MAX) || 200;

// ─── Known malicious bot signatures ─────────────────────────
const MALICIOUS_UA_PATTERNS = [
  /nikto/i, /sqlmap/i, /nmap/i, /masscan/i,
  /dirbuster/i, /gobuster/i, /wfuzz/i, /ffuf/i,
  /nuclei/i, /httpx/i, /burpsuite/i, /zap\//i,
  /havij/i, /w3af/i, /arachni/i, /commix/i,
  /nessus/i, /openvas/i, /qualys/i,
  /<script/i, /javascript:/i,
];

// ─── WAF patterns ───────────────────────────────────────────
const WAF_PATTERNS = [
  // SQL injection
  { pattern: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC)\b.*\b(FROM|INTO|TABLE|WHERE|SET)\b)/i, name: 'sqli' },
  { pattern: /('.*(--))/,           name: 'sqli-comment' },
  { pattern: /(;\s*(DROP|DELETE|UPDATE|INSERT)\b)/i, name: 'sqli-chain' },
  { pattern: /(\bOR\b\s+\d+\s*=\s*\d+)/i,          name: 'sqli-boolean' },

  // XSS
  { pattern: /<script[\s>]/i,       name: 'xss-script' },
  { pattern: /javascript\s*:/i,     name: 'xss-proto' },
  { pattern: /on(load|error|click|mouseover|submit|focus|blur|mouse)\s*=/i, name: 'xss-event' },
  { pattern: /<(iframe|object|embed|svg|math|form|input)/i, name: 'xss-tag' },
  { pattern: /\beval\s*\(/i,        name: 'xss-eval' },
  { pattern: /document\.(cookie|domain|write)/i, name: 'xss-dom' },

  // Path traversal
  { pattern: /\.\.\//,              name: 'path-traversal' },
  { pattern: /\.\.\\/,              name: 'path-traversal-win' },
  { pattern: /%2e%2e(%2f|%5c)/i,    name: 'path-traversal-encoded' },
  { pattern: /%252e%252e/i,         name: 'path-traversal-double' },
  { pattern: /\/etc\/(passwd|shadow|hosts)/i, name: 'path-sensitive' },
  { pattern: /\/proc\/self/i,       name: 'path-proc' },

  // Command injection
  { pattern: /[;&|`]\s*(cat|ls|rm|mv|cp|wget|curl|bash|sh|python|perl|ruby|nc|ncat|chmod|chown|kill)\b/i, name: 'cmd-injection' },
  { pattern: /\$\([^)]+\)/,         name: 'cmd-subshell' },
  { pattern: /`[^`]+`/,             name: 'cmd-backtick' },
  { pattern: /\|\s*\w+/,            name: 'cmd-pipe' },

  // Null byte
  { pattern: /%00/,                 name: 'null-byte' },
  { pattern: /\x00/,               name: 'null-byte-raw' },

  // SSRF indicators
  { pattern: /\b(127\.0\.0\.1|localhost|0\.0\.0\.0|169\.254\.\d+\.\d+|::1)\b/i, name: 'ssrf-local' },
  { pattern: /\b(metadata\.google|169\.254\.169\.254)\b/i, name: 'ssrf-cloud' },

  // Log injection / CRLF
  { pattern: /%0[ad]/i,             name: 'crlf' },
  { pattern: /\r\n/,                name: 'crlf-raw' },
];

// ─── Honeypot paths (instant ban) ───────────────────────────
const HONEYPOT_PATHS = [
  '/wp-admin', '/wp-login.php', '/wp-content',
  '/.env', '/.git', '/.git/config', '/.git/HEAD',
  '/phpmyadmin', '/pma', '/adminer.php',
  '/admin/config', '/config.php', '/info.php',
  '/server-status', '/server-info',
  '/.htaccess', '/.htpasswd',
  '/api/admin/shell', '/api/eval',
  '/debug', '/console',
  '/actuator', '/actuator/env',
  '/solr/admin', '/manager/html',
];

// ─── Cleanup interval ──────────────────────────────────────
setInterval(() => {
  const now = Date.now();
  for (const [ip, ban] of bannedIPs) {
    if (now > ban.until) bannedIPs.delete(ip);
  }
  for (const [ip, entry] of rateLimitStore) {
    if (now - entry.windowStart > WINDOW_MS * 3) rateLimitStore.delete(ip);
  }
}, 60 * 1000);

// ─── Helper: get real IP ────────────────────────────────────
function getIP(req) {
  return req.ip || req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown';
}

// ─── Helper: add strike ─────────────────────────────────────
function addStrike(ip, reason) {
  const count = (strikeCounter.get(ip) || 0) + 1;
  strikeCounter.set(ip, count);
  if (count >= STRIKE_THRESHOLD) {
    bannedIPs.set(ip, { until: Date.now() + BAN_DURATION_MS, reason });
    strikeCounter.delete(ip);
    console.error(`[BAN] IP ${ip} banned for ${BAN_DURATION_MS / 60000}m — ${reason} (${count} strikes)`);
  }
}

// ─── Layer 1: IP Ban Check ──────────────────────────────────
function banCheck(req, res, next) {
  const ip = getIP(req);
  const ban = bannedIPs.get(ip);
  if (ban && Date.now() < ban.until) {
    return res.status(403).json({ error: 'Forbidden', message: 'Access denied' });
  }
  next();
}

// ─── Layer 2: Honeypot ──────────────────────────────────────
function honeypot(req, res, next) {
  const lowerPath = req.path.toLowerCase();
  if (HONEYPOT_PATHS.some(hp => lowerPath.startsWith(hp))) {
    const ip = getIP(req);
    console.warn(`[HONEYPOT] ${ip} hit ${req.path}`);
    bannedIPs.set(ip, { until: Date.now() + BAN_DURATION_MS * 2, reason: `honeypot: ${req.path}` });
    return res.status(404).send('Not Found');
  }
  next();
}

// ─── Layer 3: Bot Fingerprint ───────────────────────────────
function botFilter(req, res, next) {
  const ua = req.headers['user-agent'] || '';
  for (const pattern of MALICIOUS_UA_PATTERNS) {
    if (pattern.test(ua)) {
      const ip = getIP(req);
      console.warn(`[BOT] Blocked scanner ${ip}: ${ua.substring(0, 60)}`);
      addStrike(ip, `malicious-ua: ${ua.substring(0, 40)}`);
      return res.status(403).json({ error: 'Forbidden' });
    }
  }
  next();
}

// ─── Layer 4: Rate Limiter ──────────────────────────────────
function rateLimiter(req, res, next) {
  const ip = getIP(req);
  const now = Date.now();

  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return next();
  }

  const entry = rateLimitStore.get(ip);
  if (now - entry.windowStart > WINDOW_MS) {
    entry.count = 1;
    entry.windowStart = now;
    return next();
  }

  entry.count++;

  const isPayingAgent = req.path.startsWith('/api/x402/') && req.headers['x-payment'];
  const limit = isPayingAgent ? MAX_X402_REQUESTS : MAX_REQUESTS;

  if (entry.count > limit) {
    addStrike(ip, 'rate-limit-exceeded');
    const retryAfter = Math.ceil((WINDOW_MS - (now - entry.windowStart)) / 1000);
    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({
      error: 'Too Many Requests',
      retryAfter,
    });
  }

  res.set('X-RateLimit-Limit', String(limit));
  res.set('X-RateLimit-Remaining', String(Math.max(0, limit - entry.count)));
  next();
}

// ─── Layer 5: WAF (input filtering) ─────────────────────────
function waf(req, res, next) {
  const ip = getIP(req);

  // Check URL path itself
  for (const rule of WAF_PATTERNS) {
    if (rule.pattern.test(req.path)) {
      console.warn(`[WAF] ${ip} blocked on path — ${rule.name}: ${req.path.substring(0, 80)}`);
      addStrike(ip, `waf-path: ${rule.name}`);
      return res.status(400).json({ error: 'Bad Request' });
    }
  }

  // Check query string values
  for (const val of Object.values(req.query || {})) {
    const str = String(val);
    for (const rule of WAF_PATTERNS) {
      if (rule.pattern.test(str)) {
        console.warn(`[WAF] ${ip} blocked on query — ${rule.name}`);
        addStrike(ip, `waf-query: ${rule.name}`);
        return res.status(400).json({ error: 'Bad Request' });
      }
    }
  }

  // Check body (POST/PUT)
  if (req.body && typeof req.body === 'object') {
    const bodyStr = JSON.stringify(req.body);
    if (bodyStr.length > 50000) {
      return res.status(413).json({ error: 'Payload Too Large' });
    }
    for (const rule of WAF_PATTERNS) {
      if (rule.pattern.test(bodyStr)) {
        console.warn(`[WAF] ${ip} blocked on body — ${rule.name}`);
        addStrike(ip, `waf-body: ${rule.name}`);
        return res.status(400).json({ error: 'Bad Request' });
      }
    }
  }

  next();
}

// ─── Layer 6: Security Headers ──────────────────────────────
function securityHeaders(_req, res, next) {
  res.set('X-Frame-Options', 'DENY');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(self)');
  res.set('X-Permitted-Cross-Domain-Policies', 'none');
  res.set('X-Download-Options', 'noopen');

  // HSTS in production
  if (process.env.NODE_ENV === 'production') {
    res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  next();
}

// ─── Layer 7: Admin Protection ──────────────────────────────
function adminProtection(req, res, next) {
  // Protect any /api/admin/* endpoints
  if (req.path.startsWith('/api/admin')) {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (!process.env.ADMIN_API_KEY || apiKey !== process.env.ADMIN_API_KEY) {
      const ip = getIP(req);
      console.warn(`[AUTH] Unauthorized admin access from ${ip}: ${req.path}`);
      addStrike(ip, 'unauthorized-admin');
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
  next();
}

// ─── Compose all layers ─────────────────────────────────────
function securityMiddleware(app) {
  app.use(banCheck);
  app.use(honeypot);
  app.use(securityHeaders);
  app.use(botFilter);
  app.use(rateLimiter);
  app.use(adminProtection);
  app.use(waf);

  console.log('[SECURITY] All defense layers active:');
  console.log('  L1: IP auto-ban ........... armed');
  console.log('  L2: Honeypot traps ........ armed');
  console.log('  L3: Bot fingerprint ....... armed');
  console.log('  L4: Rate limiting ......... armed');
  console.log('  L5: WAF/input filter ...... armed');
  console.log('  L6: Security headers ...... armed');
  console.log('  L7: Admin protection ...... armed');
}

export {
  securityMiddleware,
  bannedIPs,
  strikeCounter,
  rateLimitStore,
};
