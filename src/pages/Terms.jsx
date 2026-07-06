import LegalPage, { CONTACT } from './LegalPage.jsx';

export default function Terms() {
  return (
    <LegalPage title="Terms & Conditions" updated="July 5, 2026">
      <p>
        These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your use of the
        Ten-eighty Tree Lumber &amp; Logs website and your participation in our
        text message (SMS) program. By submitting an order request or providing
        your phone number, you agree to these Terms.
      </p>

      <h2>Order requests</h2>
      <ul>
        <li>Submitting the order form sends us a <strong>request</strong> — it is not a completed sale or a guarantee of availability.</li>
        <li>We follow up to confirm product availability, final pricing, pickup or delivery details, and payment.</li>
        <li>Prices shown on the site are estimates and may be adjusted before your order is confirmed.</li>
        <li>Payment is arranged directly with us at the time we confirm your order.</li>
      </ul>

      <h2>SMS text messaging program</h2>
      <p>
        When you provide a mobile phone number as part of an order request, you
        agree to receive text messages from Ten-eighty Tree Lumber &amp; Logs
        related to that order. The program covers the following:
      </p>

      <div className="legal__callout">
        <strong>Program summary.</strong> By providing your mobile number, you
        consent to receive order-related text messages from us. Message frequency
        varies. Message and data rates may apply. Reply <strong>STOP</strong> to
        cancel or <strong>HELP</strong> for help.
      </div>

      <ul>
        <li>
          <strong>Program (brand) name:</strong> Ten-eighty Tree Lumber &amp; Logs.
        </li>
        <li>
          <strong>Types of messages:</strong> transactional messages about a
          request you initiated — order confirmations, availability, pickup or
          delivery coordination, and payment arrangements.
        </li>
        <li>
          <strong>Message frequency:</strong> varies based on your order and our
          back-and-forth with you. This is not a recurring marketing program.
        </li>
        <li>
          <strong>Cost:</strong> we do not charge for the messages, but message
          and data rates may apply depending on your mobile carrier and plan.
        </li>
      </ul>

      <h2>How to opt in</h2>
      <p>
        You opt in by entering your mobile phone number when you submit an order
        request through our website. Providing your number is your consent to
        receive order-related texts about that request.
      </p>

      <h2>How to opt out</h2>
      <p>
        You can cancel the SMS service at any time by texting <strong>STOP</strong>{' '}
        to any message you receive from us. After you send STOP, we will send a
        one-time confirmation and will stop sending order-related texts. You may
        still reach us by phone or email to complete your order.
      </p>

      <h2>Help</h2>
      <p>
        For help with the messaging program, reply <strong>HELP</strong> to any
        message, or contact us at{' '}
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or {CONTACT.phone}.
      </p>

      <h2>Carrier disclaimer</h2>
      <p>
        Carriers are not liable for delayed or undelivered messages. Message
        delivery is subject to your carrier&rsquo;s network and terms.
      </p>

      <h2>Pickup &amp; delivery</h2>
      <ul>
        <li>Pickup is by appointment. We&rsquo;ll coordinate a time when we confirm your order.</li>
        <li>Local delivery is available within our service area; we&rsquo;ll confirm whether your address qualifies.</li>
        <li>You are responsible for providing an accurate delivery address and any access details (e.g. gate codes).</li>
      </ul>

      <h2>Product</h2>
      <p>
        Firewood is a natural product. Measurements (bundle, face cord, full cord)
        and seasoning are described in good faith; slight variation is normal.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Ten-eighty Tree Lumber &amp; Logs
        is not liable for indirect or incidental damages arising from use of the
        website or the messaging program. The website is provided on an
        &ldquo;as is&rdquo; basis.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. Changes take effect when we
        post the updated version here, with a revised &ldquo;Last updated&rdquo;
        date.
      </p>
    </LegalPage>
  );
}
