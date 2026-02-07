/**
 * Vercel Serverless Entry Point
 *
 * Re-exports the Express app as a Vercel serverless function.
 * Vercel calls this function for every /api/* request.
 *
 * Environment variables are set in Vercel Dashboard:
 *   Settings → Environment Variables
 */

import app from '../server/index.js';

export default app;
