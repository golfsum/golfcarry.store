'use client';

import { useCart } from './cart-context';
import { BagIcon } from '@/components/icons';

export function CartButton() {
  const { openCart, totalQuantity } = useCart();
  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart, ${totalQuantity} item${totalQuantity === 1 ? '' : 's'}`}
      className="tap relative flex items-center justify-center rounded-full p-2 text-ink hover:bg-sand-50"
    >
      <BagIcon className="h-6 w-6" />
      {totalQuantity > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-fairway-600 px-1 text-[11px] font-bold text-white">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}
