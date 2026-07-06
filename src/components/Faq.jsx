import { useState } from 'react';
import { faqs } from '../data/faqs.js';

export default function Faq() {
  // Independent open/closed state per row (multiple may be open at once).
  const [open, setOpen] = useState({});

  const toggle = (id) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <section id="faq" className="section section--narrow">
      <div className="eyebrow">FAQ</div>
      <h2 className="section-title" style={{ marginBottom: 40 }}>
        Good questions
      </h2>
      <div className="faq-list">
        {faqs.map((f) => {
          const isOpen = !!open[f.id];
          return (
            <div key={f.id} className="faq-item">
              <button
                type="button"
                className="faq-item__header"
                aria-expanded={isOpen}
                onClick={() => toggle(f.id)}
              >
                {f.q}
                <span className="faq-item__icon">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && <div className="faq-item__body">{f.a}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
