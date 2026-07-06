/**
 * Email-to-SMS carrier gateways.
 *
 * Instead of a paid SMS API, we email each owner's carrier gateway address —
 * `<10-digit-number>@<gateway>` — and the carrier delivers it to their phone
 * as a text. This is plenty for our tiny internal notify list (just us three).
 *
 * Add a carrier by dropping its gateway domain in here. If messages ever come
 * through truncated, switch that carrier to its MMS gateway (listed alongside).
 */
export const CARRIER_GATEWAYS = {
  tmobile: 'tmomail.net', // T-Mobile (handles SMS + MMS)
  verizon: 'vtext.com', //   Verizon SMS — use 'vzwpix.com' for MMS if truncated
};

const KNOWN = Object.keys(CARRIER_GATEWAYS).join(', ');

/**
 * Build the gateway email address for a US phone number + carrier.
 * Accepts numbers in any common form (+1 xxx, 1xxxxxxxxxx, (xxx) ...).
 */
export function gatewayAddress(number, carrier) {
  const key = String(carrier || '').toLowerCase();
  const gateway = CARRIER_GATEWAYS[key];
  if (!gateway) {
    throw new Error(
      `Unknown carrier "${carrier}" for "${number}" in ORDER_NOTIFY_RECIPIENTS ` +
        `(known carriers: ${KNOWN}). Expected "number:carrier".`
    );
  }

  // Normalize to the bare 10-digit number the gateways expect.
  const digits = String(number || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  if (digits.length !== 10) {
    throw new Error(
      `Recipient "${number}" must be a 10-digit US phone number (optionally +1).`
    );
  }

  return `${digits}@${gateway}`;
}
