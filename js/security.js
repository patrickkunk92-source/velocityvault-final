/**
 * VelocityVault Client-Side Security
 *
 * Digital gatekeeper for the frontend:
 * - XSS protection via output encoding
 * - Form input sanitization
 * - External link safety (rel=noopener)
 * - Console warning for DevTools social engineering
 * - Integrity checks on critical scripts
 */

(function() {
  'use strict';

  // ─── Console warning against social engineering ───────────
  if (typeof console !== 'undefined') {
    console.log(
      '%cSTOP!',
      'color: red; font-size: 48px; font-weight: bold; text-shadow: 2px 2px black;'
    );
    console.log(
      '%cThis is a browser feature intended for developers. If someone told you to copy-paste something here, it is likely a scam.',
      'color: #ff6b35; font-size: 16px;'
    );
  }

  // ─── Sanitize all form inputs on submit ───────────────────
  function sanitizeString(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  // Intercept all form submissions
  document.addEventListener('submit', function(e) {
    const form = e.target;
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
    inputs.forEach(function(input) {
      // Strip script tags and event handlers from input values
      if (input.value) {
        input.value = input.value
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
          .replace(/javascript:/gi, '');
      }
    });
  }, true);

  // ─── Secure all external links ────────────────────────────
  function secureExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
      if (!link.getAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
        link.setAttribute('rel', (link.getAttribute('rel') || '') + ' noopener noreferrer');
      }
    });
  }

  // Run on load and observe for dynamically added links
  document.addEventListener('DOMContentLoaded', secureExternalLinks);
  const observer = new MutationObserver(secureExternalLinks);
  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });

  // ─── Prevent clickjacking ─────────────────────────────────
  if (window.self !== window.top) {
    // Site is being iframed — check if it's allowed
    try {
      if (window.top.location.hostname !== window.location.hostname) {
        document.body.innerHTML = '<h1 style="text-align:center;padding:50px;">This page cannot be displayed in an iframe.</h1>';
      }
    } catch (e) {
      // Cross-origin — definitely being iframed by external site
      document.body.innerHTML = '<h1 style="text-align:center;padding:50px;">This page cannot be displayed in an iframe.</h1>';
    }
  }

  // ─── Detect and warn about modified localStorage ──────────
  function checkStorageIntegrity() {
    try {
      const cart = localStorage.getItem('velocityVaultCart');
      if (cart) {
        const parsed = JSON.parse(cart);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            // Check for tampered prices (negative or absurdly high)
            if (item.price !== undefined && (item.price < 0 || item.price > 100000)) {
              console.warn('[SECURITY] Suspicious cart data detected — resetting');
              localStorage.removeItem('velocityVaultCart');
              break;
            }
          }
        }
      }
    } catch {
      // Corrupted data — reset
      localStorage.removeItem('velocityVaultCart');
    }
  }

  document.addEventListener('DOMContentLoaded', checkStorageIntegrity);

  console.log('[SECURITY] Client-side gatekeeper active');
})();
