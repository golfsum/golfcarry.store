import type { MetadataRoute } from 'next';
import { getCollections, getProducts } from '@/lib/shopify';
import { POLICY_SLUGS } from '@/lib/policies';
import { SITE } from '@/lib/constants';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;

  const staticRoutes = [
    '',
    '/collections/all',
    '/about',
    '/contact',
    '/faq',
    '/track-order',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const policyRoutes = POLICY_SLUGS.map((slug) => ({
    url: `${base}/policies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const [collections, products] = await Promise.all([
      getCollections(),
      getProducts({ first: 100 }),
    ]);
    dynamicRoutes = [
      ...collections.map((c) => ({
        url: `${base}/collections/${c.handle}`,
        lastModified: new Date(c.updatedAt),
        changeFrequency: 'daily' as const,
        priority: 0.8,
      })),
      ...products.map((p) => ({
        url: `${base}/product/${p.handle}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      })),
    ];
  } catch {
    // If the Storefront API is unreachable at build time, ship static routes.
  }

  return [...staticRoutes, ...dynamicRoutes, ...policyRoutes];
}
