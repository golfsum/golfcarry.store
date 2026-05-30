import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductGrid } from '@/components/product/product-card';
import { SearchBox } from '@/components/layout/search-box';
import { getProducts } from '@/lib/shopify';

export const metadata: Metadata = {
  title: 'Search',
  robots: { index: false, follow: true },
};

type Search = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Search) {
  const { q } = await searchParams;
  const query = q?.trim();
  const products = query ? await getProducts({ query, first: 60 }) : [];

  return (
    <div className="container-page py-10">
      <header className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">Search</h1>
        <p className="mt-2 text-ink-soft">Find the gear that fits your game.</p>
        <div className="mx-auto mt-5 max-w-md">
          <Suspense fallback={<div className="input h-10 rounded-full" />}>
            <SearchBox autoFocus />
          </Suspense>
        </div>
      </header>

      {query && (
        <div className="mt-10">
          <p className="mb-6 text-sm text-ink-soft">
            {products.length} {products.length === 1 ? 'result' : 'results'} for{' '}
            <span className="font-semibold text-ink">“{query}”</span>
          </p>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="py-16 text-center">
              <p className="text-ink-soft">
                No products matched “{query}”. Try a different search term, or{' '}
                <a href="/collections/all" className="font-semibold text-fairway-700 underline">
                  browse all products
                </a>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
