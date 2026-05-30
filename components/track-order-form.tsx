'use client';

import { useState } from 'react';
import { SITE } from '@/lib/constants';

/**
 * Order tracking. When SHOPIFY_STORE_DOMAIN is set, Shopify's native order
 * status / lookup page is the source of truth, so we deep-link customers there.
 * Otherwise we guide them to email support.
 */
export function TrackOrderForm({ storeDomain }: { storeDomain?: string }) {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (storeDomain) {
      // Shopify's account/order lookup lives on the store domain.
      window.open(`https://${storeDomain}/account`, '_blank', 'noopener');
    }
    setSubmitted(true);
  }

  return (
    <div className="rounded-card border border-ink/10 bg-white p-6 shadow-card">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Order number</span>
          <input name="order" required className="input" placeholder="#1234" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email address</span>
          <input name="email" type="email" required className="input" placeholder="you@email.com" />
        </label>
        <button type="submit" className="btn-primary btn-lg w-full">
          Track my order
        </button>
      </form>
      {submitted && (
        <p className="mt-4 rounded-lg bg-sand-50 px-3 py-2 text-xs text-ink-soft">
          {storeDomain
            ? 'We’ve opened your secure order lookup in a new tab. You can also find live tracking in your shipping confirmation email.'
            : `Order tracking activates once the store is connected. In the meantime, email ${SITE.supportEmail} with your order number and we’ll send your tracking right away.`}
        </p>
      )}
    </div>
  );
}
