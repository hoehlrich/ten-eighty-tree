# Ten-eighty Tree — Development

A Vite + React recreation of the marketing/order-request site described in
[`README.md`](./README.md) (the design handoff). The original prototype
(`Ten Eighty-Tree.dc.html`) is kept only as the design reference — it is **not**
shipped and its `support.js` runtime is not used.

## Commands

```bash
npm install      # install dependencies (frontend + API)
cp .env.example .env   # then edit — set ORDER_NOTIFY_RECIPIENTS (and SMTP creds for real texts)

npm run dev:all  # run BOTH: Vite (5173) + API (3001) together
npm run dev      # frontend only (http://localhost:5173)
npm run dev:api  # API only (http://localhost:3001), auto-restarts on change
npm run build    # production build of the frontend → dist/
npm run start    # run the API in production
```

In dev, Vite proxies `/api/*` to the API on :3001 (see `vite.config.js`), so the
form's `fetch('/api/orders')` just works same-origin.

## Structure

```
index.html                 # Vite entry; loads Google Fonts (Bitter, Public Sans)
.env.example               # backend config template (copy to .env)
src/                       # ── FRONTEND (Vite + React) ──
  main.jsx                 # React root
  App.jsx                  # page composition (Nav → Hero → Products → Order → FAQ → Footer)
  styles/index.css         # design tokens (OKLCH) + all component styles + responsive rules
  data/{products,faqs}.js  # storefront content (prices are placeholders — see below)
  components/              # Nav, Hero, Products, OrderForm, Faq, Footer
server/                    # ── BACKEND (Node + Express) ──
  index.js                 # bootstrap: builds handlers + dispatcher, starts app
  app.js                   # Express app factory
  config.js                # env-driven config
  routes/orders.js         # POST /api/orders
  domain/
    catalog.js             # authoritative product prices (server never trusts client price)
    order.js               # validation + normalization → canonical Order
  notifications/
    dispatcher.js          # fans an order out to all handlers (isolated, concurrent)
    handlers/smsHandler.js # texts the owners (the one handler active today)
  sms/
    index.js               # SmsProvider factory (email | console)
    emailProvider.js       # real texts via email-to-SMS (lazy-loads nodemailer)
    gateways.js            # carrier → email-to-SMS gateway map (tmobile, verizon)
    consoleProvider.js     # logs messages — dev / no-credentials mode
```

## How the backend is wired (and how to extend it)

An order flows: **validate → dispatcher → handlers**. There are two seams:

1. **Handlers** — what to *do* with an order (`{ name, critical, handle(order) }`).
   To add DB persistence, email, Slack, etc., write a handler and push it into
   the `handlers` array in `server/index.js`. Handlers run concurrently and in
   isolation; a `critical` handler failing makes the request report an error,
   non-critical ones are best-effort. Today SMS is the only (critical) handler.
2. **SMS providers** — *how* to send a text (`{ sendSms({ to, body }) }`).
   Today this is email-to-SMS: we email each owner's carrier gateway (see
   `server/sms/gateways.js`). Swap in another transport by adding a provider in
   `server/sms/`.

With no SMTP creds set, notifications run in **console mode** (messages print to
the API log), so the whole flow is testable locally without secrets.

## Before launch (see README "Content to confirm")

Search the source for `TODO(content)`:

- Set real owner numbers + carriers in `ORDER_NOTIFY_RECIPIENTS` and add SMTP
  credentials (`SMTP_*`) so real texts go out via email-to-SMS.
- Deploy note: the frontend `fetch` targets `/api/orders`, so host the API at the
  same origin (or add a proxy/rewrite) — the dev-only Vite proxy doesn't apply in prod.
- Keep prices in sync between `src/data/products.js` (display) and
  `server/domain/catalog.js` (authoritative) — both are still placeholders.
- Fix the hero subhead typo (already corrected to "students") and confirm the claim.
- Confirm the hero eyebrow copy; replace footer phone/email placeholders.
