/**
 * SmsProvider factory.
 *
 * An SmsProvider is just: { sendSms({ to, body }): Promise<void> }
 *
 * - "email"   → emails each owner's carrier gateway (see emailProvider.js), so
 *               the message lands as a text. Needs SMTP creds.
 * - "console" → logs messages to stdout; used for local dev / when SMTP isn't
 *               configured, so the whole flow works with zero secrets.
 *
 * Add another transport by writing a module that returns the same shape and
 * wiring it in here.
 */
export async function createSmsProvider(smsConfig) {
  if (smsConfig.provider === 'email') {
    const { createEmailProvider } = await import('./emailProvider.js');
    return createEmailProvider(smsConfig.email);
  }
  const { createConsoleProvider } = await import('./consoleProvider.js');
  return createConsoleProvider();
}
