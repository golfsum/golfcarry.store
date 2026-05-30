'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/product/product-card';
import { ChevronDown, CloseIcon } from '@/components/icons';
import { SORT_OPTIONS } from '@/lib/constants';
import type { Product } from '@/lib/shopify/types';

type PriceBand = { label: string; min: number; max: number };
const PRICE_BANDS: PriceBand[] = [
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 – $75', min: 25, max: 75 },
  { label: '$75 – $150', min: 75, max: 150 },
  { label: '$150 & up', min: 150, max: Infinity },
];

function sortProducts(products: Product[], sort: string): Product[] {
  const out = [...products];
  const price = (p: Product) => Number(p.priceRange.minVariantPrice.amount);
  switch (sort) {
    case 'price-asc':
      return out.sort((a, b) => price(a) - price(b));
    case 'price-desc':
      return out.sort((a, b) => price(b) - price(a));
    case 'title-asc':
      return out.sort((a, b) => a.title.localeCompare(b.title));
    case 'newest':
      return out.sort(
        (a, b) =>
          (b.tags.includes('new') ? 1 : 0) - (a.tags.includes('new') ? 1 : 0),
      );
    default:
      return out; // featured / best-selling — keep API order
  }
}

export function CollectionView({ products }: { products: Product[] }) {
  const [sort, setSort] = useState('best-selling');
  const [types, setTypes] = useState<string[]>([]);
  const [band, setBand] = useState<number | null>(null);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  const allTypes = useMemo(
    () => Array.from(new Set(products.map((p) => p.productType))).sort(),
    [products],
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (types.length && !types.includes(p.productType)) return false;
      if (inStock && !p.availableForSale) return false;
      const price = Number(p.priceRange.minVariantPrice.amount);
      const compareAt = Number(p.compareAtPriceRange.minVariantPrice.amount);
      if (onSale && !(compareAt > price)) return false;
      if (band !== null) {
        const b = PRICE_BANDS[band];
        if (price < b.min || price >= b.max) return false;
      }
      return true;
    });
    return sortProducts(list, sort);
  }, [products, types, inStock, onSale, band, sort]);

  function toggleType(t: string) {
    setTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  const activeFilterCount =
    types.length + (band !== null ? 1 : 0) + (inStock ? 1 : 0) + (onSale ? 1 : 0);

  function clearAll() {
    setTypes([]);
    setBand(null);
    setInStock(false);
    setOnSale(false);
  }

  const filterPanel = (
    <div className="space-y-6">
      {allTypes.length > 1 && (
        <FilterGroup title="Category">
          {allTypes.map((t) => (
            <label key={t} className="flex cursor-pointer items-center gap-2.5 py-1 text-sm">
              <input
                type="checkbox"
                checked={types.includes(t)}
                onChange={() => toggleType(t)}
                className="rounded border-ink/25 text-fairway-600 focus:ring-fairway-600"
              />
              {t}
            </label>
          ))}
        </FilterGroup>
      )}
      <FilterGroup title="Price">
        {PRICE_BANDS.map((b, i) => (
          <label key={b.label} className="flex cursor-pointer items-center gap-2.5 py-1 text-sm">
            <input
              type="radio"
              name="price-band"
              checked={band === i}
              onChange={() => setBand(band === i ? null : i)}
              onClick={() => band === i && setBand(null)}
              className="border-ink/25 text-fairway-600 focus:ring-fairway-600"
            />
            {b.label}
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Availability">
        <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="rounded border-ink/25 text-fairway-600 focus:ring-fairway-600"
          />
          In stock only
        </label>
        <label className="flex cursor-pointer items-center gap-2.5 py-1 text-sm">
          <input
            type="checkbox"
            checked={onSale}
            onChange={(e) => setOnSale(e.target.checked)}
            className="rounded border-ink/25 text-fairway-600 focus:ring-fairway-600"
          />
          On sale
        </label>
      </FilterGroup>
      {activeFilterCount > 0 && (
        <button onClick={clearAll} className="text-sm font-medium text-fairway-700 underline">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide">Filter</h2>
        {filterPanel}
      </aside>

      <div>
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between gap-3 border-b border-ink/10 pb-4">
          <p className="text-sm text-ink-soft">
            {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileFilters(true)}
              className="btn-secondary btn-sm lg:hidden"
            >
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
                className="h-9 appearance-none rounded-full border border-ink/15 bg-white pl-4 pr-9 text-sm font-medium focus:border-fairway-600 focus:ring-fairway-600"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    Sort: {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-ink-soft">No products match your filters.</p>
            <button onClick={clearAll} className="btn-secondary btn-md mt-4">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setMobileFilters(false)} aria-label="Close filters" className="tap rounded-full p-1.5 hover:bg-sand-50">
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            {filterPanel}
            <button
              onClick={() => setMobileFilters(false)}
              className="btn-primary btn-lg mt-6 w-full"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {title}
      </h3>
      <div className="text-ink-soft">{children}</div>
    </div>
  );
}
