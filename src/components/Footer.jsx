export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer__grid">
        <div>
          <div className="footer__brand">Ten-eighty Tree Lumber &amp; Logs</div>
        </div>
        <div>
          <div className="footer__label">Visit / Pickup</div>
          {/* TODO(content): confirm pickup details with owner. */}
          <div className="footer__detail">
            Pickup by appointment
          </div>
        </div>
        <div>
          <div className="footer__label">Contact</div>
          {/* TODO(content): replace placeholder phone/email before launch. */}
          <div className="footer__detail">
            (919) 349-0461
            <br />
            orders@teneightytree.com
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        © 2026 Ten-eighty Tree Lumber &amp; Logs
      </div>
    </footer>
  );
}
