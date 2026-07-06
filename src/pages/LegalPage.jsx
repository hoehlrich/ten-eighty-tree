import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONTACT = {
  email: 'orders@teneightytree.com',
  phone: '(919) 349-0461',
};

// Shared shell for the legal/compliance pages (Privacy, Terms). Keeps the
// header, contact block, and cross-links consistent between them.
export default function LegalPage({ title, updated, children }) {
  // These are standalone documents, not part of the marketing scroll — make
  // sure a hard load or in-app navigation starts at the top.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} — Ten-eighty Tree Lumber & Logs`;
  }, [title]);

  const otherPage =
    title === 'Privacy Policy'
      ? { to: '/terms', label: 'Terms & Conditions' }
      : { to: '/privacy', label: 'Privacy Policy' };

  return (
    <div className="legal">
      <div className="legal__wrap">
        <Link className="legal__backlink" to="/">
          ← Back to Ten-eighty Tree
        </Link>

        <header className="legal__header">
          <div className="legal__brand">Ten-eighty Tree Lumber &amp; Logs</div>
          <h1 className="legal__title">{title}</h1>
          <p className="legal__updated">Last updated: {updated}</p>
        </header>

        {children}

        <div className="legal__contact">
          <h2>Contact us</h2>
          <p>
            Ten-eighty Tree Lumber &amp; Logs
            <br />
            Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <br />
            Phone: {CONTACT.phone}
          </p>
        </div>

        <footer className="legal__footer">
          © 2026 Ten-eighty Tree Lumber &amp; Logs. &nbsp;See also our{' '}
          <Link to={otherPage.to}>{otherPage.label}</Link>.
        </footer>
      </div>
    </div>
  );
}

export { CONTACT };
