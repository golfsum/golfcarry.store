'use client';

import { useState } from 'react';
import { useCart, type CartLine } from '@/components/cart/cart-context';
import { CheckIcon, PlusIcon } from '@/components/icons';

/**
 * Quick add-to-cart used on product cards. If the product has multiple
 * variants/options, it links through to the product page to choose; otherwise
 * it adds the single variant instantly.
 */
export function QuickAdd({
  line,
  hasOptions,
  handle,
  available,
}: {
  line: Omit<CartLine, 'quantity'>;
  hasOptions: boolean;
  handle: string;
  available: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!available) {
    return (
      <span className="btn-secondary btn-sm w-full cursor-not-allowed opacity-70">
        Sold out
      </span>
    );
  }

  if (hasOptions) {
    return (
      <a href={`/product/${handle}`} className="btn-secondary btn-sm w-full">
        Choose options
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        addItem(line);
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
      }}
      className="btn-primary btn-sm w-full"
    >
      {added ? (
        <>
          <CheckIcon className="h-4 w-4" /> Added
        </>
      ) : (
        <>
          <PlusIcon className="h-4 w-4" /> Add to cart
        </>
      )}
    </button>
  );
}
