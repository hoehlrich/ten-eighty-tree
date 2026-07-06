import { Router } from 'express';
import { normalizeAndValidate } from '../domain/order.js';

export function createOrdersRouter({ dispatcher }) {
  const router = Router();

  // POST /api/orders — receive an order request and notify the owners.
  router.post('/', async (req, res) => {
    const { valid, errors, order } = normalizeAndValidate(req.body);
    if (!valid) {
      return res.status(400).json({ ok: false, errors });
    }

    try {
      const { ok, results } = await dispatcher.dispatch(order);
      if (!ok) {
        return res.status(502).json({
          ok: false,
          error: 'notification_failed',
          orderId: order.id,
        });
      }
      return res.status(201).json({
        ok: true,
        orderId: order.id,
        summary: order.summary,
        results,
      });
    } catch (err) {
      console.error('[orders] unexpected error:', err);
      return res.status(500).json({ ok: false, error: 'internal_error' });
    }
  });

  return router;
}
