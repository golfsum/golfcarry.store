import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading } from '@/components/section-heading';
import type { Collection } from '@/lib/shopify/types';
import { FEATURED_CATEGORIES } from '@/lib/constants';

export function FeaturedCategories({ collections }: { collections: Collection[] }) {
  const byHandle = new Map(collections.map((c) => [c.handle, c]));
  const cats = FEATURED_CATEGORIES.map((c) => ({
    ...c,
    image: byHandle.get(c.handle)?.image?.url,
  }));

  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading
        eyebrow="Shop by category"
        title="Find exactly what your game needs"
        href="/collections/all"
        hrefLabel="Browse all"
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {cats.map((cat, i) => (
          <Link
            key={cat.handle}
            href={`/collections/${cat.handle}`}
            className={`group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card bg-fairway-900 p-4 text-white shadow-card transition-shadow hover:shadow-card-hover ${
              i === 0 ? 'col-span-2 md:col-span-1' : ''
            }`}
          >
            {cat.image && (
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="relative">
              <h3 className="text-lg font-semibold leading-tight">{cat.title}</h3>
              <p className="text-xs text-white/80">{cat.blurb}</p>
              <span className="mt-1 inline-block text-xs font-semibold text-fairway-300 opacity-0 transition-opacity group-hover:opacity-100">
                Shop now →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
