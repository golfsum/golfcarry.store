import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CollectionView } from '@/components/collection/collection-view';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  getCollection,
  getCollectionProducts,
  getCollections,
  getProducts,
} from '@/lib/shopify';
import { SITE } from '@/lib/constants';

export const revalidate = 3600;

type Params = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  const collections = await getCollections();
  return [{ handle: 'all' }, ...collections.map((c) => ({ handle: c.handle }))];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  if (handle === 'all') {
    return {
      title: 'Shop All Golf Gear',
      description: 'Browse the full GolfCarry.Store collection of premium golf gear.',
      alternates: { canonical: '/collections/all' },
    };
  }
  const collection = await getCollection(handle);
  if (!collection) return {};
  return {
    title: collection.seo?.title || collection.title,
    description: collection.seo?.description || collection.description,
    alternates: { canonical: `/collections/${handle}` },
    openGraph: {
      title: collection.title,
      description: collection.description,
      images: collection.image ? [{ url: collection.image.url }] : undefined,
    },
  };
}

export default async function CollectionPage({ params }: Params) {
  const { handle } = await params;

  const isAll = handle === 'all';
  const collection = isAll ? null : await getCollection(handle);
  if (!isAll && !collection) notFound();

  const products = isAll
    ? await getProducts({ first: 100 })
    : await getCollectionProducts({ collection: handle, first: 100 });

  const title = isAll ? 'Shop All' : collection!.title;
  const description = isAll
    ? 'Every product in the GolfCarry.Store lineup — bags, training aids, accessories, apparel, electronics, and gifts.'
    : collection!.description;

  return (
    <div className="container-page py-8 sm:py-10">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: title, href: `/collections/${handle}` },
        ]}
      />
      <header className="mb-8 mt-4 max-w-2xl">
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 text-ink-soft">{description}</p>}
      </header>

      {products.length === 0 ? (
        <p className="py-20 text-center text-ink-soft">
          No products in this collection yet — check back soon.
        </p>
      ) : (
        <CollectionView products={products} />
      )}

      {/* CollectionPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${title} | ${SITE.name}`,
            description,
            url: `${SITE.url}/collections/${handle}`,
          }),
        }}
      />
    </div>
  );
}
