import { products, formatPrice } from '../data/products.js';

export default function Products() {
  return (
    <section id="products" className="section container">
      <div className="eyebrow">What We Sell</div>
      <h2 className="section-title">Priced for the small orders</h2>
      <p className="section-lead">
      </p>

      <div className="product-grid">
        {products.map((p) => (
          <article key={p.id} className="product-card">
            {p.badge && <div className="product-card__badge">{p.badge}</div>}
            <div className="product-card__name">{p.name}</div>
            <div className="product-card__desc">{p.desc}</div>
            <div className="product-card__price-row">
              <div className="product-card__price">
                {formatPrice(p.priceNum)}
              </div>
              <div className="product-card__unit">{p.unit}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
