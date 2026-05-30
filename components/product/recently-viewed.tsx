'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export type ViewedItem = {
  handle: string;
  title: string;
  image: string;
  price: { amount: string; currencyCode: string };
  productType: string;
};

const KEY = 'golfcarry-recently-viewed';
const MAX = 8;

export function RecentlyViewed({ current }: { current: ViewedItem }) {
  const [items, setItems] = useState<ViewedItem[]>([]);

  useEffect(() => {
    let stored: ViewedItem[] = [];
    try {
      stored = JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      stored = [];
    }
    // Show everything previously viewed except the current product.
    setItems(stored.filter((i) => i.handle !== current.handle).slice(0, MAX));

    // Record the current product at the front.
    const next = [current, ...stored.filter((i) => i.handle !== current.handle)].slice(
      0,
      MAX + 1,
    );
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage may be unavailable */
    }
  }, [current]);

  if (items.length === 0) return null;

  return (
    <section className="container-page py-12">
      <h2 className="mb-6 text-2xl font-semibold">Recently viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {items.map((item) => (
          <Link
            key={item.handle}
            href={`/product/${item.handle}`}
            className="group w-40 shrink-0 sm:w-48"
          >
            <div className="relative aspect-square overflow-hidden rounded-card bg-sand-50">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="192px"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <h3 className="mt-2 line-clamp-2 text-sm font-medium group-hover:text-fairway-700">
              {item.title}
            </h3>
            <p className="mt-0.5 text-sm font-semibold">{formatPrice(item.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
