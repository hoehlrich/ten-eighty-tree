/**
 * SMS handler — texts every configured owner when an order comes in.
 *
 * It depends only on an `SmsProvider` ({ sendSms({ to, body }) }), so the
 * underlying transport (email-to-SMS, console, or anything else) is swappable
 * without touching this file. See server/sms/.
 */
export function createSmsHandler({ provider, recipients }) {
  return {
    name: 'sms',
    critical: true, // for now this is the only way owners learn about an order
    async handle(order) {
      if (!recipients.length) {
        throw new Error('No SMS recipients configured (set ORDER_NOTIFY_RECIPIENTS)');
      }
      const body = formatOrderSms(order);

      // Send to each owner independently (allSettled, not all) so one bad
      // recipient can't hide the others, and log the outcome per recipient.
      // "accepted" means the mail server took the message for delivery — it is
      // NOT proof the text reached the phone; carrier email-to-SMS gateways
      // (Verizon especially) can still drop it downstream with no error. This
      // logging surfaces SMTP-level failures; it can't detect a silent drop.
      const settled = await Promise.allSettled(
        recipients.map((to) => provider.sendSms({ to, body }))
      );

      const failures = [];
      settled.forEach((result, i) => {
        const to = recipients[i];
        if (result.status === 'fulfilled') {
          const id = result.value?.messageId;
          console.log(
            `[sms] order #${order.id} → ${to}: accepted for delivery` +
              (id ? ` (${id})` : '')
          );
        } else {
          const reason = result.reason?.message || String(result.reason);
          failures.push({ to, reason });
          console.error(`[sms] order #${order.id} → ${to}: FAILED — ${reason}`);
        }
      });

      // Preserve critical-handler semantics: if any send failed, the whole
      // handler fails so the request surfaces an error rather than silently
      // dropping the order — but the log above still names which ones went out.
      if (failures.length) {
        throw new Error(
          `SMS send failed for ${failures.length}/${recipients.length} recipient(s): ` +
            failures.map((f) => `${f.to} (${f.reason})`).join('; ')
        );
      }
    },
  };
}

export function formatOrderSms(order) {
  const lines = [
    `🔥 New firewood order #${order.id}`,
    order.summary,
    `Est. $${order.estTotal}`,
    `From: ${order.customer.name} — ${order.customer.contact}`,
  ];
  if (order.method === 'delivery' && order.customer.address) {
    lines.push(`Deliver to: ${order.customer.address}`);
  }
  if (order.customer.notes) {
    lines.push(`Notes: ${order.customer.notes}`);
  }
  return lines.join('\n');
}
