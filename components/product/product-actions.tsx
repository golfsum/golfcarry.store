'use client';

import { useMemo, useState, useTransition } from 'react';
import clsx from 'clsx';
import type { Product } from '@/lib/shopify/types';
import { useCart } from '@/components/cart/cart-context';
import { createCheckoutAction } from '@/components/cart/actions';
import { Price } from './price';
import { Stars } from '@/components/reviews/stars';
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  LockIcon,
  TruckIcon,
} from '@/components/icons';
import { discountPercent, pseudoRating, formatPrice } from '@/lib/utils';
import { SITE } from '@/lib/constants';

export function ProductActions({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const [isPending, startTransition] = useTransition();
  const [notice, setNotice] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Default-select the first value of each option.
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((o) => [o.name, o.values[0]])),
  );

  const variant = useMemo(() => {
    return (
      product.variants.find((v) =>
        v.selectedOptions.every((o) => selected[o.name] === o.value),
      ) ?? product.variants[0]
    );
  }, [product.variants, selected]);

  const price = variant?.price ?? product.priceRange.minVariantPrice;
  const compareAt = variant?.compareAtPrice ?? null;
  const onSale = compareAt && Number(compareAt.amount) > Number(price.amount);
  const discount = onSale ? discountPercent(price.amount, compareAt.amount) : null;
  const available = variant?.availableForSale ?? product.availableForSale;
  const { rating, count } = pseudoRating(product.handle);

  function buildLine() {
    return {
      variantId: variant?.id ?? product.id,
      productId: product.id,
      handle: product.handle,
      title: product.title,
      variantTitle: variant?.title ?? '',
      image: {
        url: product.featuredImage.url,
        altText: product.featuredImage.altText,
      },
      price,
      options: variant?.selectedOptions ?? [],
    };
  }

  function addToCart() {
    addItem(buildLine(), quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function buyNow() {
    setNotice(null);
    startTransition(async () => {
      const { url, configured } = await createCheckoutAction([
        { merchandiseId: variant?.id ?? product.id, quantity },
      ]);
      if (configured && url) {
        window.location.href = url;
      } else {
        addItem(buildLine(), quantity);
        openCart();
        setNotice(
          'Connect your Shopify Storefront API token to enable instant checkout (Shop Pay, Apple Pay, Google Pay). Item added to cart for now.',
        );
      }
    });
  }

  return (
    <div>
      {/* Title + rating */}
      <p className="text-xs font-semibold uppercase tracking-wide text-fairway-600">
        {product.vendor}
      </p>
      <h1 className="mt-1 text-3xl font-semibold leading-tight sm:text-4xl">
        {product.title}
      </h1>
      <a href="#reviews" className="mt-2 inline-flex items-center gap-2">
        <Stars rating={rating} size="md" />
        <span className="text-sm text-ink-soft underline-offset-2 hover:underline">
          {rating} ({count} reviews)
        </span>
      </a>

      {/* Price */}
      <div className="mt-4 flex items-center gap-3">
        <Price price={price} compareAt={onSale ? compareAt : null} size="lg" />
        {discount && <span className="badge-sale">Save {discount}%</span>}
      </div>

      <p className="mt-4 text-ink-soft">{product.description}</p>

      {/* Options */}
      {product.options.map((option) =>
        option.values.length <= 1 && option.name === 'Title' ? null : (
          <div key={option.id} className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold">{option.name}</span>
              <span className="text-sm text-ink-muted">{selected[option.name]}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const isSelected = selected[option.name] === value;
                return (
                  <button
                    key={value}
                    onClick={() =>
                      setSelected((prev) => ({ ...prev, [option.name]: value }))
                    }
                    className={clsx(
                      'tap min-w-[3rem] rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                      isSelected
                        ? 'border-fairway-600 bg-fairway-600 text-white'
                        : 'border-ink/20 bg-white text-ink hover:border-ink/40',
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ),
      )}

      {/* Quantity + availability */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center rounded-full border border-ink/15">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="tap flex h-11 w-11 items-center justify-center rounded-l-full hover:bg-sand-50"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="tap flex h-11 w-11 items-center justify-center rounded-r-full hover:bg-sand-50"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
        <span
          className={clsx(
            'inline-flex items-center gap-1.5 text-sm font-medium',
            available ? 'text-fairway-700' : 'text-ink-muted',
          )}
        >
          <span
            className={clsx(
              'h-2 w-2 rounded-full',
              available ? 'bg-fairway-500' : 'bg-ink-muted',
            )}
          />
          {available ? 'In stock — ships in 1–2 days' : 'Sold out'}
        </span>
      </div>

      {/* CTAs — above the fold */}
      <div className="mt-5 flex flex-col gap-3">
        <button
          onClick={addToCart}
          disabled={!available}
          className="btn-primary btn-lg w-full"
        >
          {added ? (
            <>
              <CheckIcon className="h-5 w-5" /> Added to cart
            </>
          ) : (
            'Add to Cart'
          )}
        </button>
        <button
          onClick={buyNow}
          disabled={!available || isPending}
          className="btn-dark btn-lg w-full"
        >
          <LockIcon className="h-4 w-4" />
          {isPending ? 'Starting checkout…' : 'Buy It Now'}
        </button>
      </div>

      {notice && (
        <p className="mt-3 rounded-lg bg-sand-50 px-3 py-2 text-xs text-ink-soft">
          {notice}
        </p>
      )}

      {/* Reassurance */}
      <div className="mt-5 space-y-2 rounded-card border border-ink/10 bg-sand-50 p-4 text-sm text-ink-soft">
        <p className="flex items-center gap-2">
          <TruckIcon className="h-4 w-4 text-fairway-700" />
          Free shipping on orders over {formatPrice({ amount: String(SITE.freeShippingThreshold), currencyCode: 'USD' })}
        </p>
        <p className="flex items-center gap-2">
          <LockIcon className="h-4 w-4 text-fairway-700" />
          Secure checkout · Shop Pay · Apple Pay · Google Pay
        </p>
        <p className="flex items-center gap-2">
          <CheckIcon className="h-4 w-4 text-fairway-700" />
          30-day easy returns &amp; responsive support
        </p>
      </div>
    </div>
  );
}
