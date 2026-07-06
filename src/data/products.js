// Product lineup. Prices are PLACEHOLDERS pending the owners' final pricing —
// see README "Content to confirm before launch".
export const products = [
  {
    id: 'bundle',
    name: 'Bundle',
    desc: 'A tied bundle of split, seasoned firewood',
    priceNum: 8,
    unit: 'per bundle',
    badge: 'Most popular',
  },
  {
    id: 'faceCord',
    name: 'Face Cord',
    desc: 'A stack 4’ high × 8’ long × 16" deep stacked and seasoned firewood',
    priceNum: 120,
    unit: 'per face cord',
    badge: null,
  },
  {
    id: 'fullCord',
    name: 'Full Cord',
    desc: '4’ × 8’ × 4’ stacked and seasoned firewood',
    priceNum: 300,
    unit: 'per full cord',
    badge: null,
  },
];

export const productById = (id) =>
  products.find((p) => p.id === id) || products[0];

export const formatPrice = (n) => '$' + n;
