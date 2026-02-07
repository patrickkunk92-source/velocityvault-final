/**
 * Local development server.
 * Imports the configured Express app and starts listening.
 *
 * Usage: npm start   (or: node server/start.js)
 */

import app from './index.js';
import { WALLET_ADDRESS, NETWORK, ROUTE_PRICING } from './config/wallet.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════════╗');
  console.log('║         VelocityVault x402 Monetization Server      ║');
  console.log('╠══════════════════════════════════════════════════════╣');
  console.log(`║  Local:     http://localhost:${PORT}                    ║`);
  console.log(`║  Network:   ${NETWORK.padEnd(40)}║`);
  console.log(`║  Wallet:    ${WALLET_ADDRESS.slice(0, 10)}...${WALLET_ADDRESS.slice(-6)}                    ║`);
  console.log(`║  Routes:    ${Object.keys(ROUTE_PRICING).length} paid endpoints                        ║`);
  console.log('╚══════════════════════════════════════════════════════╝');
  console.log('');
});
