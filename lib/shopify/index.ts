import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery,
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery,
} from './queries';
import { createCartMutation } from './mutations';
import {
  sampleCollections,
  sampleProducts,
  sampleProductsForCollection,
} from './sample-data';
import type {
  Cart,
  Collection,
  Connection,
  Image,
  Product,
  ShopifyCollection,
  ShopifyProduct,
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, '')}`
  : '';
const endpoint = `${domain}/api/${process.env.SHOPIFY_API_VERSION || '2025-01'}/graphql.json`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

/** True only when both the store domain and access token are present. */
export function isShopifyConfigured(): boolean {
  return Boolean(process.env.SHOPIFY_STORE_DOMAIN && key);
}

type ShopifyFetchArgs = {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  cache?: RequestCache;
};

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  cache = 'force-cache',
}: ShopifyFetchArgs): Promise<{ status: number; body: T }> {
  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': key,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags && { next: { tags } }),
  });

  const body = await result.json();
  if (body.errors) {
    throw new Error(body.errors[0]?.message || 'Shopify Storefront API error');
  }
  return { status: result.status, body: body.data as T };
}

// ---- reshape helpers -------------------------------------------------------

function removeEdgesAndNodes<T>(connection: Connection<T>): T[] {
  return connection.edges.map((edge) => edge.node);
}

function reshapeImages(images: Connection<Image>, title: string): Image[] {
  return removeEdgesAndNodes(images).map((image, i) => ({
    ...image,
    altText: image.altText || `${title} — image ${i + 1}`,
  }));
}

function reshapeProduct(product: ShopifyProduct): Product {
  return {
    ...product,
    images: reshapeImages(product.images, product.title),
    variants: removeEdgesAndNodes(product.variants),
  };
}

function reshapeProducts(products: Connection<ShopifyProduct>): Product[] {
  return removeEdgesAndNodes(products).map(reshapeProduct);
}

function reshapeCollection(collection: ShopifyCollection): Collection {
  return { ...collection, path: `/collections/${collection.handle}` };
}

// ---- public data API (Shopify with graceful sample fallback) ---------------

const SORT_MAP: Record<string, { sortKey: string; reverse: boolean }> = {
  'price-asc': { sortKey: 'PRICE', reverse: false },
  'price-desc': { sortKey: 'PRICE', reverse: true },
  'title-asc': { sortKey: 'TITLE', reverse: false },
  newest: { sortKey: 'CREATED', reverse: true },
  'best-selling': { sortKey: 'BEST_SELLING', reverse: false },
  relevance: { sortKey: 'RELEVANCE', reverse: false },
};

export async function getProduct(handle: string): Promise<Product | undefined> {
  if (!isShopifyConfigured()) {
    return sampleProducts.find((p) => p.handle === handle);
  }
  const res = await shopifyFetch<{ product: ShopifyProduct }>({
    query: getProductQuery,
    tags: ['products'],
    variables: { handle },
  });
  if (!res.body.product) return undefined;
  return reshapeProduct(res.body.product);
}

export async function getProducts({
  query,
  sortKey,
  reverse,
  first = 100,
}: {
  query?: string;
  sortKey?: string;
  reverse?: boolean;
  first?: number;
} = {}): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    let products = [...sampleProducts];
    if (query) {
      const q = query.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return products.slice(0, first);
  }
  const res = await shopifyFetch<{ products: Connection<ShopifyProduct> }>({
    query: getProductsQuery,
    tags: ['products'],
    variables: { query, sortKey, reverse, first },
  });
  return reshapeProducts(res.body.products);
}

export async function getCollections(): Promise<Collection[]> {
  if (!isShopifyConfigured()) return sampleCollections;
  const res = await shopifyFetch<{ collections: Connection<ShopifyCollection> }>({
    query: getCollectionsQuery,
    tags: ['collections'],
  });
  return removeEdgesAndNodes(res.body.collections)
    .filter((c) => !c.handle.startsWith('hidden'))
    .map(reshapeCollection);
}

export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
  if (!isShopifyConfigured()) {
    return sampleCollections.find((c) => c.handle === handle);
  }
  const res = await shopifyFetch<{ collection: ShopifyCollection }>({
    query: getCollectionQuery,
    tags: ['collections'],
    variables: { handle },
  });
  if (!res.body.collection) return undefined;
  return reshapeCollection(res.body.collection);
}

export async function getCollectionProducts({
  collection,
  sort,
  first = 100,
}: {
  collection: string;
  sort?: string;
  first?: number;
}): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    let products = sampleProductsForCollection(collection);
    products = applySampleSort(products, sort);
    return products.slice(0, first);
  }
  const mapped = (sort && SORT_MAP[sort]) || undefined;
  const res = await shopifyFetch<{
    collection: { products: Connection<ShopifyProduct> };
  }>({
    query: getCollectionProductsQuery,
    tags: ['collections', 'products'],
    variables: {
      handle: collection,
      first,
      sortKey: mapped?.sortKey === 'BEST_SELLING' ? 'BEST_SELLING' : mapped?.sortKey,
      reverse: mapped?.reverse,
    },
  });
  if (!res.body.collection) return [];
  return reshapeProducts(res.body.collection.products);
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return sampleProducts.filter((p) => p.id !== productId).slice(0, 4);
  }
  const res = await shopifyFetch<{ productRecommendations: ShopifyProduct[] }>({
    query: getProductRecommendationsQuery,
    tags: ['products'],
    variables: { productId },
  });
  return res.body.productRecommendations.map(reshapeProduct);
}

function applySampleSort(products: Product[], sort?: string): Product[] {
  const sorted = [...products];
  switch (sort) {
    case 'price-asc':
      return sorted.sort(
        (a, b) =>
          Number(a.priceRange.minVariantPrice.amount) -
          Number(b.priceRange.minVariantPrice.amount),
      );
    case 'price-desc':
      return sorted.sort(
        (a, b) =>
          Number(b.priceRange.minVariantPrice.amount) -
          Number(a.priceRange.minVariantPrice.amount),
      );
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
      return sorted.sort(
        (a, b) =>
          (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0),
      );
    default:
      return sorted;
  }
}

// ---- checkout --------------------------------------------------------------

export type CheckoutLine = { merchandiseId: string; quantity: number };

/**
 * Creates a Shopify cart from the given line items and returns the hosted
 * checkout URL (Shop Pay / Apple Pay / Google Pay / cards). Returns null when
 * Shopify is not yet configured so the UI can prompt to connect.
 */
export async function createCheckout(
  lines: CheckoutLine[],
): Promise<string | null> {
  if (!isShopifyConfigured() || lines.length === 0) return null;
  const res = await shopifyFetch<{ cartCreate: { cart: Cart } }>({
    query: createCartMutation,
    cache: 'no-store',
    variables: { lineItems: lines },
  });
  return res.body.cartCreate?.cart?.checkoutUrl ?? null;
}
