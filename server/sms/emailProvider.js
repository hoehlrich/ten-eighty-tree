/**
 * Email-to-SMS provider.
 *
 * Sends the order notification as a plain email to each recipient's carrier
 * gateway address (see gateways.js); the carrier turns it into a text. This
 * replaces the old paid SMS API for our small internal notify list.
 *
 * `nodemailer` is imported lazily (only when this provider is selected) so the
 * app can run in console mode without the dependency loaded.
 */
export async function createEmailProvider({ host, port, user, pass, from }) {
  if (!host || !user || !pass || !from) {
    throw new Error(
      'Email transport selected but SMTP_HOST / SMTP_USER / SMTP_PASS / SMTP_FROM are not all set'
    );
  }

  const { createTransport } = await import('nodemailer');
  const transport = createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS; 587/25 = STARTTLS
    auth: { user, pass },
  });

  return {
    // `to` is a carrier gateway address (e.g. 9193490461@tmomail.net).
    // Subject is left empty on purpose — SMS gateways prepend it to the body.
    //
    // Returns { messageId, response } on success so the caller can log it.
    // NOTE: this only confirms the mail server *accepted* the message for
    // delivery — the carrier gateway (esp. Verizon) can still drop it silently
    // downstream. A rejection at the SMTP level, though, we can and do surface.
    async sendSms({ to, body }) {
      const info = await transport.sendMail({ from, to, text: body });
      if (info.rejected && info.rejected.length) {
        throw new Error(`mail server rejected ${info.rejected.join(', ')}`);
      }
      return { messageId: info.messageId, response: info.response };
    },
  };
}
