import type { Money } from './shopify/types';

export function formatPrice(money: Money | { amount: string; currencyCode: string }) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: money.currencyCode || 'USD',
    currencyDisplay: 'narrowSymbol',
  }).format(Number(money.amount));
}

export function discountPercent(price: string, compareAt?: string | null): number | null {
  if (!compareAt) return null;
  const p = Number(price);
  const c = Number(compareAt);
  if (!c || c <= p) return null;
  return Math.round(((c - p) / c) * 100);
}

/** Stable pseudo-rating derived from a handle so sample reviews look consistent. */
export function pseudoRating(seed: string): { rating: number; count: number } {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const rating = 4.4 + (hash % 6) / 10; // 4.4 – 4.9
  const count = 38 + (hash % 380); // 38 – 417
  return { rating: Math.min(4.9, Number(rating.toFixed(1))), count };
}

export function absoluteUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://golfcarry.store';
  return `${base}${path.startsWith('/') ? '' : '/'}${path}`;
}
