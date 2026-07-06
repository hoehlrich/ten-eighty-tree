/**
 * The dispatcher fans a received order out to every registered handler.
 *
 * A "handler" is anything that does something with an order:
 *   { name, critical, handle(order) }
 *
 * To add persistence, email, Slack, etc. later, write a new handler and add
 * it to the array passed here (see server/index.js) — nothing else changes.
 *
 * Handlers run concurrently and are isolated: one throwing never stops the
 * others. `critical` handlers determine the HTTP result — if any critical
 * handler fails, the request is reported as failed so the customer is told to
 * follow up another way. Non-critical handlers are best-effort.
 */
export function createDispatcher(handlers) {
  return {
    async dispatch(order) {
      const results = await Promise.all(
        handlers.map(async (h) => {
          try {
            await h.handle(order);
            return { name: h.name, critical: !!h.critical, ok: true };
          } catch (err) {
            console.error(`[dispatch] handler "${h.name}" failed:`, err);
            return {
              name: h.name,
              critical: !!h.critical,
              ok: false,
              error: err?.message || String(err),
            };
          }
        })
      );

      const criticalFailed = results.some((r) => r.critical && !r.ok);
      return { ok: !criticalFailed, results };
    },
  };
}
