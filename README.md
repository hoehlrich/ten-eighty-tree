# Handoff: Ten-eighty Tree Lumber & Logs — Marketing/Order Site

## Overview
A single-page marketing + ordering site for Ten-eighty Tree Lumber & Logs, a small firewood business. The site presents the product lineup (bundle / face cord / full cord), lets a visitor build and submit an order request, and answers common questions. The business specifically wants to prioritize and encourage small orders (under 1 cord).

## About the Design Files
The bundled file (`Ten Eighty-Tree.dc.html`) is a **design reference prototype** built in HTML with inline styles and a lightweight custom templating/component runtime (`support.js`, referenced but not included — it is prototyping-tool infrastructure, not something to ship). **Do not copy this file or its runtime directly into production.** The task is to **recreate this design and its interactions in whatever framework fits the target project** (e.g., React, Vue, plain HTML/CSS/JS, a static site generator) using that project's own conventions, component library, and build tooling. If no codebase exists yet, choose a simple, appropriate stack for a small static marketing/order site (a static site generator or a minimal React/Vite app are both reasonable; a form backend like Formspree/Netlify Forms/a small serverless function is reasonable for the order submission).

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and interaction behavior shown in the prototype are final-intent (except prices, which are explicit placeholders — see Design Tokens/Content notes below). Recreate pixel-close using the target codebase's own component/styling system rather than inlining these exact styles verbatim.

## Screens / Views
This is a single scrolling page with five sections (anchors: `#products`, `#order`, `#faq`, `#contact`). A sticky nav sits above all sections.

### 1. Nav (sticky header)
- **Purpose**: Persistent site nav + quick jump to ordering.
- **Layout**: Full-width flex row, `justify-content: space-between`, padding `18px 48px`, sticky at `top: 0`, `z-index: 50`, translucent background with `backdrop-filter: blur(6px)`, 1px bottom border.
- **Components**:
  - Logo mark: 38×38px rounded square (`border-radius: 8px`), dark brown fill `oklch(30% 0.05 45)`, white "10" text, `Bitter` 800 weight, 18px.
  - Wordmark: "Ten-eighty Tree" (Bitter 700, 19px) + "Lumber & Logs" (weight 500, muted brown `oklch(45% 0.04 50)`).
  - Nav links: Products, Order, FAQ, Contact — plain text links, 15px, weight 600, no underline.
  - "Order Now" pill CTA button — rust background `oklch(58% 0.16 40)`, white text, `padding: 10px 20px`, `border-radius: 7px`, weight 700.

### 2. Hero
- **Purpose**: Establish brand, headline value prop (small-order friendly, seasoned wood), primary CTAs.
- **Layout**: Dark brown full-width band (`oklch(28% 0.045 48)`), padding `96px 48px 88px`, subtle diagonal white-stripe SVG pattern overlay at 12% opacity behind content. Content is a 2-column grid (`1.2fr 1fr`), 56px gap, vertically centered, max-width 1100px, centered.
- **Components** (left column):
  - H1: "Seasoned firewood, cut small and priced fair." Bitter 800, 52px, line-height 1.08, margin-bottom 20px.
  - Subhead: "Fully owned and operated by studens of The Colorado School of Mines" (note: contains a typo, "studens" → "students" — flag for the business owner before shipping), 18px, muted cream `oklch(88% 0.02 65)`, max-width 480px.
  - Two CTA buttons side by side, 14px gap: "Place an Order" (filled rust, links to `#order`) and "See Prices" (outlined, transparent bg, 1.5px border, links to `#products`). Both `padding: 14px 28px`, `border-radius: 8px`, weight 700, 16px.
- **Components** (right column): Placeholder image — a rounded-corner (14px) box containing a striped SVG graphic with centered monospace label `[ photo: stacked woodpile ]`. **Replace with a real photo of the woodpile/stacks before launch.**

### 3. Products (`#products`)
- **Purpose**: Show the three sellable units with prices, and flag which are best for small orders.
- **Layout**: Centered column (max-width 1100px) with eyebrow label "WHAT WE SELL" (rust, uppercase, 13px, weight 700), H2 "Priced for the small orders" (Bitter 700, 34px, centered), supporting line (16px, muted, max-width 560px, centered). Below: 3-column grid, 24px gap.
- **Components (product card)** — repeated 3×:
  - Card: white-ish bg `oklch(99% 0.008 75)`, 1px border `oklch(88% 0.02 60)`, `border-radius: 14px`, `padding: 28px`, vertical flex, 14px gap.
  - Optional badge (top-left, overlapping the card's top edge by -12px): pill, green `oklch(55% 0.11 145)` bg, white text, 12px, weight 700. Shown on Bundle ("Most popular") and Face Cord ("Great for small orders"); Full Cord has no badge.
  - Product name (Bitter 700, 22px).
  - Description (14.5px, muted brown).
  - Price row: large price (Bitter 800, 30px, dark brown) + unit label (14px, muted) inline, baseline-aligned.
  - Small italic disclaimer: "Price placeholder — final pricing TBD" (12px, muted).
  - **Content (current placeholder data — replace with real prices)**:
    - Bundle — $8 / per bundle — "A tied bundle of split, seasoned firewood — perfect for one night by the fire." — badge: Most popular
    - Face Cord — $120 / per face cord — "A stack 4' high × 8' long × 16" deep. Great for a weekend or two." — badge: Great for small orders
    - Full Cord — $300 / per full cord — "4' × 8' × 4' stacked — our biggest offering, for the whole season." — no badge

### 4. Order (`#order`)
- **Purpose**: Let a visitor configure and submit an order request (this is a **request/inquiry form**, not a live checkout — no payment is collected on this page).
- **Layout**: Centered column, max-width 760px, on a warm tan band (`oklch(93% 0.018 68)`). Eyebrow "ORDER" + H2 "Tell us what you need", then a single card containing a 4-step vertical form, 26px gap between steps. Card: white bg, 1px border, `border-radius: 14px`, `padding: 36px`.
- **Step 1 — Choose a product**: 3-column grid of selectable tiles (10px gap). Each tile: product name (weight 700, 14.5px) + price/unit (weight 500, 12.5px, muted) below it. Selected state: 1.5px rust border + light rust tint background (`oklch(93% 0.05 40)`); unselected: neutral border/bg. Clicking a tile selects that product.
- **Step 2 — Quantity**: stepper with − / + circular buttons (38×38px, 1.5px neutral border, `border-radius: 8px`) around a centered numeric readout (18px, weight 700). To the right (pushed with `margin-left: auto`), a live "Est. total: $X" readout (weight 700, 15px) computed as `selected product price × quantity`.
- **Step 3 — Delivery or pickup**: two equal-width selectable tiles side by side (10px gap): "Local Delivery" and "Pickup". Same selected/unselected styling pattern as Step 1.
- **Step 4 — Your info**: two-column row of text inputs (Name, Phone or email), then — **only when Delivery is selected** — a full-width "Delivery address" input appears, then a full-width notes textarea ("Anything else we should know?..."). All inputs: 1.5px neutral border, `border-radius: 8px`, `padding: 12px 14px`, 15px font.
- **Submit**: full-width rust button "Send Order Request" (`padding: 15px`, `border-radius: 9px`, weight 700, 16px, white text), with a small disclaimer line below it: "This sends a request — we'll follow up to confirm availability and take payment."
- **Confirmation state**: after submit, the form is replaced by a confirmation card (same card chrome, green-tinted border `oklch(55% 0.11 145)`) reading "Thanks, {name}!" (Bitter 700, 24px) + "We got your request for **{qty} × {product} ({delivery/pickup})**." + "We'll reach out at {contact} to confirm details and payment." + an underlined "Place another order" link (rust color) that resets the form.

### 5. FAQ (`#faq`)
- **Purpose**: Answer common questions inline via an accordion.
- **Layout**: Centered column, max-width 780px. Eyebrow "FAQ" + H2 "Good questions". List of 4 accordion rows, 10px gap between rows.
- **Components (accordion row)**: white card, 1px border, `border-radius: 10px`, `overflow: hidden`. Header row is clickable (`padding: 18px 22px`, flex row, `justify-content: space-between`): question text (weight 700, 15.5px) + a rust "+"/"−" toggle glyph (20px) that flips on open/close. Body (shown only when open): `padding: 0 22px 20px`, 15px, muted brown.
- **Content**:
  1. "Is the wood seasoned or green?" → "All our firewood is seasoned at least 6 months before it goes out the door — dry, low-smoke, ready to burn."
  2. "How fast can you deliver?" → "Most local deliveries go out within 2–3 days of ordering. We'll confirm a window when we call to set up your order."
  3. "What wood species do you carry?" → "Mostly mixed hardwood — oak, maple, and ash. Let us know a preference in your order notes and we'll do our best."
  4. "Do you really sell such small amounts?" → "Yep — single bundles are our bread and butter. No order is too small."

### 6. Footer (`#contact`)
- **Layout**: Dark brown band (`oklch(24% 0.035 48)`), padding `64px 48px 48px`, 3-column grid (`1.3fr 1fr 1fr`), 40px gap, max-width 1100px centered.
- **Columns**: (1) Wordmark (Bitter 700, 20px, near-white) + one-line description, max-width 320px. (2) "VISIT / PICKUP" label (13px, uppercase, muted) / "Pickup by appointment" (14.5px, line-height 1.8). (3) "CONTACT" label + phone/email placeholders (`(555) 019-0834`, `orders@tenoetee.com` — **replace with real contact info**).
- **Bottom bar**: 1px top border, 24px top padding, 13px muted copyright line: "© 2026 Ten-eighty Tree Lumber & Logs. All wood, no BS."

## Interactions & Behavior
- **Smooth scroll**: nav links and hero CTAs scroll to section anchors (`scroll-behavior: smooth` on the page).
- **Sticky nav**: header stays pinned to the top of the viewport while scrolling; background gets a blur so content doesn't collide visually.
- **Product tile selection** (in the order form): clicking a product tile sets it as selected; only one product may be selected at a time; the selected tile gets a rust border + tinted fill, all others revert to neutral.
- **Quantity stepper**: − decrements, floor of 1 (cannot go below 1); + increments, cap of 99. The "Est. total" readout updates live as `price × qty`.
- **Delivery/Pickup toggle**: mutually exclusive selectable tiles (identical pattern to product tiles). Selecting "Local Delivery" reveals an additional "Delivery address" input above the notes field; selecting "Pickup" hides it.
- **Form fields**: standard controlled text inputs — Name, Phone or email, (conditionally) Address, and a free-text Notes textarea.
- **Submit**: on click, the form section is replaced by a confirmation message summarizing the order (quantity, product, delivery/pickup, and a promise to follow up at the contact info given). No page navigation occurs. **Note: this prototype has no real backend — the developer must wire submission to an actual destination** (e.g., email notification, SMS, a lightweight order-management inbox, or a form service) so the business actually receives these requests.
- **"Place another order"** link on the confirmation screen resets all form state (quantity back to 1, product back to Bundle, method back to Pickup, all fields cleared) and returns to the form.
- **FAQ accordion**: each row toggles independently (not mutually exclusive — multiple can be open at once); toggle icon switches between "+" and "−".
- **No responsive/mobile layout was designed** — all grids are fixed multi-column layouts intended for desktop widths. The developer should design reasonable mobile breakpoints (e.g., stacking the hero and product grids to a single column, converting the footer's 3-column grid to stacked) following the target project's existing responsive patterns, since a real ordering site needs to work on phones.

## State Management
- `selectedProduct`: one of `bundle | faceCord | fullCord` — drives selected-tile styling and the price used in the total.
- `qty`: integer ≥ 1 — drives the total calculation.
- `method`: `pickup | delivery` — drives selected-tile styling and whether the address field is shown.
- `form`: `{ name, contact, address, notes }` — plain string fields.
- `submitted`: boolean — toggles between the order form and the confirmation view.
- `faqOpen`: map of FAQ id → boolean — independent open/closed state per accordion row.
- No data fetching is involved; all product/FAQ data is static/hardcoded in the prototype and should live in a small local data file or CMS field in the real implementation.

## Design Tokens

**Colors** (defined in OKLCH in the prototype; approximate sRGB hex given for convenience — verify conversions in the target codebase's color tooling):
- Background (page): `oklch(97% 0.015 75)` — warm off-white, ~`#F7F3EE`
- Primary text: `oklch(24% 0.03 50)` — near-black warm brown, ~`#2B221C`
- Dark brown (hero/footer bands, logo mark): `oklch(28% 0.045 48)` and `oklch(30% 0.05 45)` — ~`#3A2A1F`
- Muted brown (secondary text): `oklch(45% 0.03–0.04 50–55)` — ~`#7A6552`
- Rust/orange accent (primary CTA, selected states, eyebrow labels): `oklch(58% 0.16 40)` — ~`#C1642B`
- Rust tint (selected tile background): `oklch(93% 0.05 40)` — ~`#F3DCC9`
- Green accent (badges, success confirmation border): `oklch(55% 0.11 145)` — ~`#4C8A5E`
- Neutral borders: `oklch(85–88% 0.02 60)` — ~`#DBD3C8`
- Card background (near-white): `oklch(99% 0.008 75)` — ~`#FCFAF8`

**Typography**:
- Headings: **Bitter** (slab serif), weights 500/600/700/800, from Google Fonts.
- Body/UI: **Public Sans**, weights 400/500/600/700, from Google Fonts.
- Scale used: 52px (H1), 34px (H2), 22–24px (card/section titles), 15–19px (body/buttons), 12–13px (eyebrow labels/fine print).

**Spacing / radii**:
- Section padding: 88–96px vertical, 48px horizontal.
- Card radius: 14px; button/input radius: 7–9px; pill radius: 999px.
- Common gaps: 10–14px (tight groups), 24–40px (section/card spacing).

**Shadows**: none used — the design relies on borders and flat color fields, not drop shadows.

## Assets
- No real images are used. The hero includes one placeholder graphic (striped SVG rectangle labeled `[ photo: stacked woodpile ]`) that must be replaced with an actual photo of the firewood/stacks/property.
- Fonts are loaded from Google Fonts (Bitter, Public Sans) via a standard `<link>` — reference these directly or self-host per the target project's font strategy.
- No icon library is used; the only iconography is the plain-text "+"/"−" FAQ toggle glyphs and a "−"/"+" for the quantity stepper.

## Content to confirm before launch
- Hero subhead currently reads "Fully owned and operated by studens of The Colorado School of Mines" — contains a typo ("studens") and introduces a new claim not previously discussed; confirm accuracy and fix spelling before shipping.
- All three product prices ($8 / $120 / $300) are explicit placeholders pending the owners' final pricing decision.
- Footer phone number and email are placeholders (`(555) 019-0834`, `orders@tenoetee.com`).

## Files
- `Ten Eighty-Tree.dc.html` — the full design reference (prototype markup + interaction logic in one file). This is the canonical source for exact copy, structure, and behavior described above.
