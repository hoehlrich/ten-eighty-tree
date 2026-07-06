import 'dotenv/config';
import { config } from './config.js';
import { createApp } from './app.js';
import { createDispatcher } from './notifications/dispatcher.js';
import { createSmsHandler } from './notifications/handlers/smsHandler.js';
import { createSmsProvider } from './sms/index.js';

// --- Compose the app ------------------------------------------------------
// This is the one place that decides which handlers are active. To add
// persistence later: createDbHandler(...) and push it into `handlers`.
const smsProvider = await createSmsProvider(config.sms);

const handlers = [
  createSmsHandler({
    provider: smsProvider,
    recipients: config.sms.recipients,
  }),
];

const dispatcher = createDispatcher(handlers);
const app = createApp({ dispatcher });

app.listen(config.port, () => {
  console.log(
    `Ten-eighty Tree API listening on :${config.port} ` +
      `(sms provider: ${config.sms.provider}, recipients: ${config.sms.recipients.length})`
  );
  if (config.sms.provider === 'console') {
    console.log('Notifications in console mode — messages print here, not sent. Set SMTP_* to send via email-to-SMS.');
  }
});
