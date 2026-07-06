// Server-side product catalog — the authoritative source for names & prices.
//
// The order API trusts THIS for pricing, never the client, so a tampered
// request can't change what an order costs. Keep these in sync with the
// storefront copy in src/data/products.js (prices are still placeholders).
export const catalog = {
  bundle: { id: 'bundle', name: 'Bundle', unit: 'per bundle', priceNum: 8 },
  faceCord: {
    id: 'faceCord',
    name: 'Face Cord',
    unit: 'per face cord',
    priceNum: 120,
  },
  fullCord: {
    id: 'fullCord',
    name: 'Full Cord',
    unit: 'per full cord',
    priceNum: 300,
  },
};

export const getProduct = (id) => catalog[id] || null;
