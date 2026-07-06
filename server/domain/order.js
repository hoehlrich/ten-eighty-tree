import { randomUUID } from 'node:crypto';
import { getProduct } from './catalog.js';

const METHODS = new Set(['pickup', 'delivery']);
const MAX_QTY = 99;
const MAX_NOTES = 1000;

const str = (v) => (typeof v === 'string' ? v.trim() : '');

/**
 * Validate and normalize a raw request body into a canonical Order.
 *
 * The returned order is the shape every downstream handler (SMS now; DB,
 * email, etc. later) consumes — handlers never see raw request input.
 *
 * @returns {{ valid: boolean, errors: {field:string,message:string}[], order: object|null }}
 */
export function normalizeAndValidate(raw) {
  const body = raw && typeof raw === 'object' ? raw : {};
  const errors = [];

  const productId = str(body.productId);
  const product = getProduct(productId);
  if (!product) errors.push({ field: 'productId', message: 'Unknown product' });

  const qty = Number(body.qty);
  if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) {
    errors.push({ field: 'qty', message: `Quantity must be a whole number 1–${MAX_QTY}` });
  }

  const method = str(body.method);
  if (!METHODS.has(method)) {
    errors.push({ field: 'method', message: 'Method must be pickup or delivery' });
  }

  const customer = body.customer && typeof body.customer === 'object' ? body.customer : {};
  const name = str(customer.name);
  const contact = str(customer.contact);
  const address = str(customer.address);
  const notes = str(customer.notes).slice(0, MAX_NOTES);
  if (!name) errors.push({ field: 'customer.name', message: 'Name is required' });
  if (!contact) errors.push({ field: 'customer.contact', message: 'Phone or email is required' });
  if (method === 'delivery' && !address) {
    errors.push({ field: 'customer.address', message: 'Delivery address is required' });
  }

  if (errors.length) return { valid: false, errors, order: null };

  const estTotal = product.priceNum * qty; // authoritative — computed server-side
  const order = {
    id: randomUUID().slice(0, 8),
    receivedAt: new Date().toISOString(),
    product: {
      id: product.id,
      name: product.name,
      unit: product.unit,
      unitPrice: product.priceNum,
    },
    qty,
    method,
    estTotal,
    customer: {
      name,
      contact,
      address: method === 'delivery' ? address : '',
      notes,
    },
    summary: `${qty} × ${product.name} (${method})`,
  };

  return { valid: true, errors: [], order };
}
