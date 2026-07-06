import woodpile from '../assets/woodpile.jpg';
import { smoothScrollTo } from '../utils/scroll.js';

export default function Hero() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    smoothScrollTo(id);
  };

  return (
    <section className="hero">
      <svg className="hero__pattern" preserveAspectRatio="none">
        <defs>
          <pattern
            id="woodstripe"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(8)"
          >
            <rect width="26" height="26" fill="transparent" />
            <rect width="13" height="26" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#woodstripe)" />
      </svg>

      <div className="hero__inner">
        <div>
          {/* TODO(content): confirm final eyebrow copy with owner (see README). */}
          <div className="hero__badge">Delivery / Pickup Golden CO</div>
          <h1 className="hero__title">
            Seasoned firewood, cut small and priced fair.
          </h1>
          {/* TODO(content): fix "studens" typo & confirm claim before launch. */}
          <p className="hero__subhead">
            Fully owned and operated by students of The Colorado School of Mines
          </p>
          <div className="hero__cta">
            <a
              href="#order"
              className="btn btn--primary"
              onClick={(e) => scrollToSection(e, 'order')}
            >
              Place an Order
            </a>
            <a
              href="#products"
              className="btn btn--outline"
              onClick={(e) => scrollToSection(e, 'products')}
            >
              See Prices
            </a>
          </div>
        </div>

        <div className="hero__image">
          <img
            src={woodpile}
            alt="Split, seasoned firewood stacked beside cut log rounds under a tree"
            width="4000"
            height="3000"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
