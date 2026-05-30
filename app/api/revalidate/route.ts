import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Shopify webhook target for instant cache invalidation. Point Shopify webhooks
 * (products/update, collections/update, etc.) at:
 *   https://<your-domain>/api/revalidate?secret=YOUR_SECRET
 * so storefront pages refresh the moment you edit products or collections,
 * instead of waiting for the hourly revalidate window.
 */
export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get('secret');
  if (!process.env.SHOPIFY_REVALIDATION_SECRET || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  const topic = request.headers.get('x-shopify-topic') || '';
  if (topic.startsWith('collections')) revalidateTag('collections');
  if (topic.startsWith('products')) revalidateTag('products');
  // If no topic header (manual ping), refresh both.
  if (!topic) {
    revalidateTag('collections');
    revalidateTag('products');
  }

  return NextResponse.json({ revalidated: true, topic, now: Date.now() });
}
