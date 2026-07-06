// Central config, read from environment. Values are validated/derived once
// here so the rest of the app just reads `config`.

import { gatewayAddress } from './sms/gateways.js';

// Parse "number:carrier,number:carrier" into carrier gateway email addresses.
// e.g. "+19193490461:tmobile" → "9193490461@tmomail.net"
const parseRecipients = (raw) =>
  (raw || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      const [number, carrier] = entry.split(':').map((s) => (s || '').trim());
      return gatewayAddress(number, carrier);
    });

const {
  PORT,
  NOTIFY_TRANSPORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
  SMTP_FROM,
  ORDER_NOTIFY_RECIPIENTS,
} = process.env;

const hasSmtpCreds = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && SMTP_FROM);

export const config = {
  port: Number(PORT) || 3001,
  sms: {
    // Default to email only if SMTP creds exist; otherwise console (dev-safe).
    provider: NOTIFY_TRANSPORT || (hasSmtpCreds ? 'email' : 'console'),
    email: {
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      user: SMTP_USER,
      pass: SMTP_PASS,
      from: SMTP_FROM,
    },
    // The owners who get notified on every order — carrier gateway addresses
    // derived from ORDER_NOTIFY_RECIPIENTS.
    recipients: parseRecipients(ORDER_NOTIFY_RECIPIENTS),
  },
};
