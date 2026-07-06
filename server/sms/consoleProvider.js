/**
 * Console SmsProvider — prints messages instead of sending them.
 * Lets the full order flow work locally without any SMTP credentials.
 */
export function createConsoleProvider() {
  return {
    async sendSms({ to, body }) {
      console.log(`\n──── SMS → ${to} ────\n${body}\n─────────────────────\n`);
      return { response: 'console (not sent)' };
    },
  };
}
