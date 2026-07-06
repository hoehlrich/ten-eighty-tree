# Ten-eighty Tree — Development

A Vite + React recreation of the marketing/order-request site described in
[`README.md`](./README.md) (the design handoff). The original prototype
(`Ten Eighty-Tree.dc.html`) is kept only as the design reference — it is **not**
shipped and its `support.js` runtime is not used.

## Commands

```bash
npm install     # install dependencies
npm run dev     # local dev server (http://localhost:5173)
npm run build   # production build → dist/
npm run preview # preview the production build
```

## Structure

```
index.html                 # Vite entry; loads Google Fonts (Bitter, Public Sans)
src/
  main.jsx                 # React root
  App.jsx                  # page composition (Nav → Hero → Products → Order → FAQ → Footer)
  styles/index.css         # design tokens (OKLCH) + all component styles + responsive rules
  data/
    products.js            # product lineup (prices are placeholders — see below)
    faqs.js                # FAQ content
  components/
    Nav.jsx                # sticky header
    Hero.jsx               # dark hero band + woodpile photo (src/assets/woodpile.jpg)
    Products.jsx           # 3 product cards
    OrderForm.jsx          # stateful 4-step order request + confirmation view
    Faq.jsx                # independent accordion rows
    Footer.jsx             # contact / visit info
```

## Before launch (see README "Content to confirm")

Search the source for `TODO(content)`:

- **Order form has no backend.** `submitOrder` in `OrderForm.jsx` only flips to
  the confirmation view. Wire it to a real destination (form service, email/SMS,
  or a small serverless endpoint) so orders are actually received.
- Fix the hero subhead typo (already corrected to "students") and confirm the claim.
- Confirm the hero eyebrow copy.
- Replace **placeholder prices** (`data/products.js`) and footer phone/email.
