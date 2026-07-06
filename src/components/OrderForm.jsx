import { useState } from 'react';
import { products, productById, formatPrice } from '../data/products.js';

const EMPTY_FORM = { name: '', contact: '', address: '', notes: '' };

const INITIAL = {
  selectedProduct: 'bundle',
  qty: 1,
  method: 'pickup',
  form: EMPTY_FORM,
};

export default function OrderForm() {
  const [selectedProduct, setSelectedProduct] = useState(INITIAL.selectedProduct);
  const [qty, setQty] = useState(INITIAL.qty);
  const [method, setMethod] = useState(INITIAL.method);
  const [form, setForm] = useState(INITIAL.form);
  const [submitted, setSubmitted] = useState(false);

  const selected = productById(selectedProduct);
  const isDelivery = method === 'delivery';
  const estTotal = formatPrice(selected.priceNum * qty);
  const orderSummary = `${qty} × ${selected.name} (${
    isDelivery ? 'delivery' : 'pickup'
  })`;

  const updateField = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submitOrder = () => {
    // NOTE: prototype has no backend. Wire this to a real destination
    // (form service, email/SMS notification, order inbox) before launch.
    setSubmitted(true);
  };

  const resetForm = () => {
    setSelectedProduct(INITIAL.selectedProduct);
    setQty(INITIAL.qty);
    setMethod(INITIAL.method);
    setForm(EMPTY_FORM);
    setSubmitted(false);
  };

  return (
    <section id="order" className="section order">
      <div className="order__inner">
        <div className="eyebrow">Order</div>
        <h2 className="section-title" style={{ marginBottom: 40 }}>
          Tell us what you need
        </h2>

        {submitted ? (
          <div className="confirm-card">
            <div className="confirm-card__title">Thanks, {form.name}!</div>
            <div className="confirm-card__line">
              We got your request for <strong>{orderSummary}</strong>.
            </div>
            <div className="confirm-card__line">
              We'll reach out at {form.contact} to confirm details and payment.
            </div>
            <button className="confirm-card__reset" onClick={resetForm}>
              Place another order
            </button>
          </div>
        ) : (
          <div className="order-card">
            {/* Step 1 — product */}
            <div className="order-step">
              <div className="order-step__label">1. Choose a product</div>
              <div className="tile-grid">
                {products.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={
                      'tile' +
                      (selectedProduct === p.id ? ' tile--selected' : '')
                    }
                    onClick={() => setSelectedProduct(p.id)}
                  >
                    {p.name}
                    <div className="tile__sub">
                      {formatPrice(p.priceNum)} {p.unit}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — quantity */}
            <div className="order-step">
              <div className="order-step__label">2. Quantity</div>
              <div className="stepper">
                <button
                  type="button"
                  className="stepper__btn"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(q - 1, 1))}
                >
                  −
                </button>
                <div className="stepper__count">{qty}</div>
                <button
                  type="button"
                  className="stepper__btn"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(q + 1, 99))}
                >
                  +
                </button>
                <div className="stepper__total">Est. total: {estTotal}</div>
              </div>
            </div>

            {/* Step 3 — delivery or pickup */}
            <div className="order-step">
              <div className="order-step__label">3. Delivery or pickup</div>
              <div className="tile-row">
                <button
                  type="button"
                  className={
                    'tile tile--wide' + (isDelivery ? ' tile--selected' : '')
                  }
                  onClick={() => setMethod('delivery')}
                >
                  Local Delivery
                </button>
                <button
                  type="button"
                  className={
                    'tile tile--wide' + (!isDelivery ? ' tile--selected' : '')
                  }
                  onClick={() => setMethod('pickup')}
                >
                  Pickup
                </button>
              </div>
            </div>

            {/* Step 4 — your info */}
            <div className="order-step">
              <div className="order-step__label">4. Your info</div>
              <div className="field-row">
                <input
                  className="input"
                  placeholder="Name"
                  value={form.name}
                  onInput={updateField('name')}
                  onChange={updateField('name')}
                />
                <input
                  className="input"
                  placeholder="Phone or email"
                  value={form.contact}
                  onInput={updateField('contact')}
                  onChange={updateField('contact')}
                />
              </div>
              {isDelivery && (
                <input
                  className="input input--spaced"
                  placeholder="Delivery address"
                  value={form.address}
                  onInput={updateField('address')}
                  onChange={updateField('address')}
                />
              )}
              <textarea
                className="input input--textarea"
                placeholder="Anything else we should know? (e.g. wood species preference, gate code, timing)"
                value={form.notes}
                onInput={updateField('notes')}
                onChange={updateField('notes')}
              />
            </div>

            <button type="button" className="submit-btn" onClick={submitOrder}>
              Send Order Request
            </button>
            <div className="submit-note">
              This sends a request. We'll follow up to confirm availability and
              take payment.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
