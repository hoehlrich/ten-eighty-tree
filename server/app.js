import express from 'express';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { createOrdersRouter } from './routes/orders.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');

// App factory — takes its dependencies (the dispatcher) so it stays easy to
// test and to wire up differently (e.g. a fake dispatcher in tests).
export function createApp({ dispatcher }) {
  const app = express();
  app.use(express.json({ limit: '16kb' }));

  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.use('/api/orders', createOrdersRouter({ dispatcher }));

  // In production, serve the built frontend from the same origin. This also
  // gives the client-side routes (/, /privacy, /terms) an SPA history
  // fallback, so a hard load or external fetch of /privacy resolves to
  // index.html instead of 404ing — required for the legal pages to work as
  // submittable links (SMS/A2P compliance).
  // In dev this directory doesn't exist (Vite serves the frontend), so the
  // whole block is skipped.
  if (existsSync(DIST_DIR)) {
    app.use(express.static(DIST_DIR));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      res.sendFile(join(DIST_DIR, 'index.html'));
    });
  }

  return app;
}
