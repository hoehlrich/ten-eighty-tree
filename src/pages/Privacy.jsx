import LegalPage from './LegalPage.jsx';

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="July 5, 2026">
      <p>
        This Privacy Policy explains how Ten-eighty Tree Lumber &amp; Logs
        (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses,
        and protects the information you provide when you place a firewood order
        request through our website or communicate with us by text message (SMS).
      </p>

      <div className="legal__callout">
        <strong>Text messaging &amp; your mobile information.</strong> No mobile
        information will be shared with third parties or affiliates for marketing
        or promotional purposes. Information collected as part of the SMS consent
        process will not be shared with any third parties.
      </div>

      <h2>Information we collect</h2>
      <p>When you submit an order request, we collect only what we need to fulfill it:</p>
      <ul>
        <li><strong>Contact details</strong> — your name and the phone number or email address you provide.</li>
        <li><strong>Order details</strong> — the product, quantity, and whether you chose pickup or local delivery.</li>
        <li><strong>Delivery address</strong> — only if you request local delivery.</li>
        <li><strong>Notes</strong> — anything you optionally tell us (e.g. wood species preference, gate code, timing).</li>
      </ul>
      <p>
        We do not collect payment information through the website. Payment is
        arranged directly with you when we confirm your order.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To contact you and confirm availability, details, and payment for your order.</li>
        <li>To coordinate pickup or delivery of your firewood.</li>
        <li>To respond to questions you send us.</li>
        <li>To keep a basic record of orders for our own bookkeeping.</li>
      </ul>

      <h2>Text messaging (SMS)</h2>
      <p>
        If you provide a mobile phone number when placing an order, you consent to
        receive text messages from us related to that order — for example, to
        confirm details, arrange pickup or delivery, and coordinate payment. These
        are transactional, account-related messages tied to a request you initiated.
      </p>
      <ul>
        <li>Message frequency varies based on your order and our back-and-forth with you.</li>
        <li>Message and data rates may apply, depending on your mobile carrier and plan.</li>
        <li>You can opt out at any time by replying <strong>STOP</strong>. Reply <strong>HELP</strong> for help.</li>
      </ul>
      <p>
        <strong>We do not sell your information.</strong> No mobile information
        will be shared with third parties or affiliates for marketing or
        promotional purposes. We only share information with service providers
        strictly as needed to deliver messages and fulfill your order (see below).
      </p>

      <h2>How we share information</h2>
      <p>We share information only as necessary, and never for third-party marketing:</p>
      <ul>
        <li>
          <strong>Messaging provider.</strong> We use a third-party messaging
          service (Twilio) to send and receive text messages. Your phone number
          and message content are processed by them solely to deliver those
          messages.
        </li>
        <li>
          <strong>Legal requirements.</strong> We may disclose information if
          required by law or to protect our rights, safety, or property.
        </li>
      </ul>

      <h2>Data retention</h2>
      <p>
        We keep order and contact information only as long as needed to fulfill
        your order and for reasonable bookkeeping, after which we delete or
        anonymize it.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>Reply <strong>STOP</strong> to any text to stop receiving messages.</li>
        <li>Contact us to request that we update or delete your information.</li>
      </ul>

      <h2>Children&rsquo;s privacy</h2>
      <p>
        Our website and services are intended for adults. We do not knowingly
        collect information from children under 13.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes take effect
        when we post the updated version here, with a revised &ldquo;Last
        updated&rdquo; date.
      </p>
    </LegalPage>
  );
}
