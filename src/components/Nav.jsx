import logo from '../assets/ten-eighty-horizontal.svg';
import { smoothScrollTo } from '../utils/scroll.js';

const LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#order', label: 'Order' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const scrollToSection = (e, href) => {
    e.preventDefault();
    smoothScrollTo(href.slice(1));
  };

  return (
    <header className="nav">
      <div className="nav__brand">
        <img
          className="nav__logo"
          src={logo}
          alt="Ten-eighty Tree Lumber & Logs"
        />
      </div>
      <nav className="nav__links">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="nav__link"
            onClick={(e) => scrollToSection(e, l.href)}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#order"
          className="btn btn--pill"
          onClick={(e) => scrollToSection(e, '#order')}
        >
          Order Now
        </a>
      </nav>
    </header>
  );
}
