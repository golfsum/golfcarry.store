'use server';

import { createCheckout, type CheckoutLine } from '@/lib/shopify';

/**
 * Server action: turn the client cart into a Shopify hosted checkout.
 * Returns the checkout URL (Shop Pay / Apple Pay / Google Pay / cards) or null
 * when Shopify isn't configured yet — the UI prompts to connect in that case.
 */
export async function createCheckoutAction(
  lines: CheckoutLine[],
): Promise<{ url: string | null; configured: boolean }> {
  const url = await createCheckout(lines);
  return { url, configured: url !== null };
}
