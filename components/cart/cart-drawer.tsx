'use client';

import { useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './cart-context';
import { createCheckoutAction } from './actions';
import { CloseIcon, MinusIcon, PlusIcon, LockIcon, BagIcon } from '@/components/icons';
import { formatPrice } from '@/lib/utils';
import { SITE } from '@/lib/constants';

export function CartDrawer() {
  const { lines, isOpen, closeCart, updateQuantity, removeItem, subtotal, totalQuantity } =
    useCart();
  const [isPending, startTransition] = useTransition();
  const [notice, setNotice] = useState<string | null>(null);

  // Lock body scroll while open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  const subtotalAmount = Number(subtotal.amount);
  const remainingForFreeShip = Math.max(0, SITE.freeShippingThreshold - subtotalAmount);
  const freeShipProgress = Math.min(100, (subtotalAmount / SITE.freeShippingThreshold) * 100);

  function checkout() {
    setNotice(null);
    startTransition(async () => {
      const payload = lines.map((l) => ({
        merchandiseId: l.variantId,
        quantity: l.quantity,
      }));
      const { url, configured } = await createCheckoutAction(payload);
      if (configured && url) {
        window.location.href = url;
      } else {
        setNotice(
          'Checkout activates automatically once your Shopify Storefront API token is connected. See README → "Connect Shopify".',
        );
      }
    });
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="font-display text-lg font-semibold">
            Your Cart{' '}
            <span className="text-ink-muted">({totalQuantity})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="tap rounded-full p-1.5 hover:bg-sand-50"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <BagIcon className="h-12 w-12 text-ink-muted" />
            <p className="text-ink-soft">Your cart is empty.</p>
            <button onClick={closeCart} className="btn-primary btn-md">
              Continue shopping
            </button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-ink/10 px-5 py-3">
              {remainingForFreeShip > 0 ? (
                <p className="text-xs text-ink-soft">
                  You&apos;re{' '}
                  <span className="font-semibold text-fairway-700">
                    {formatPrice({
                      amount: remainingForFreeShip.toFixed(2),
                      currencyCode: subtotal.currencyCode,
                    })}
                  </span>{' '}
                  away from free shipping.
                </p>
              ) : (
                <p className="text-xs font-semibold text-fairway-700">
                  🎉 You&apos;ve unlocked free shipping!
                </p>
              )}
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand-100">
                <div
                  className="h-full rounded-full bg-fairway-600 transition-all"
                  style={{ width: `${freeShipProgress}%` }}
                />
              </div>
            </div>

            {/* Line items */}
            <ul className="flex-1 divide-y divide-ink/10 overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={line.variantId} className="flex gap-3 py-4">
                  <Link
                    href={`/product/${line.handle}`}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-ink/10 bg-sand-50"
                  >
                    <Image
                      src={line.image.url}
                      alt={line.image.altText}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <Link
                      href={`/product/${line.handle}`}
                      onClick={closeCart}
                      className="line-clamp-2 text-sm font-semibold hover:text-fairway-700"
                    >
                      {line.title}
                    </Link>
                    {line.variantTitle && line.variantTitle !== 'Default Title' && (
                      <span className="mt-0.5 text-xs text-ink-muted">
                        {line.variantTitle}
                      </span>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-ink/15">
                        <button
                          onClick={() =>
                            updateQuantity(line.variantId, line.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="tap flex h-8 w-8 items-center justify-center rounded-l-full hover:bg-sand-50"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(line.variantId, line.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="tap flex h-8 w-8 items-center justify-center rounded-r-full hover:bg-sand-50"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatPrice({
                          amount: (Number(line.price.amount) * line.quantity).toFixed(2),
                          currencyCode: line.price.currencyCode,
                        })}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(line.variantId)}
                    aria-label={`Remove ${line.title}`}
                    className="self-start text-ink-muted hover:text-ink"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <footer className="border-t border-ink/10 px-5 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-soft">Subtotal</span>
                <span className="font-display text-lg font-semibold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                Shipping & taxes calculated at checkout.
              </p>
              {notice && (
                <p className="mt-3 rounded-lg bg-sand-50 px-3 py-2 text-xs text-ink-soft">
                  {notice}
                </p>
              )}
              <button
                onClick={checkout}
                disabled={isPending}
                className="btn-primary btn-lg mt-3 w-full"
              >
                <LockIcon className="h-4 w-4" />
                {isPending ? 'Preparing checkout…' : 'Secure Checkout'}
              </button>
              <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-ink-muted">
                <PaymentBadges />
              </div>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

function PaymentBadges() {
  return (
    <div className="flex items-center gap-1.5">
      {['Shop Pay', 'Apple Pay', 'G Pay', 'Visa', 'Amex'].map((m) => (
        <span
          key={m}
          className="rounded border border-ink/10 bg-white px-1.5 py-0.5 text-[10px] font-medium text-ink-soft"
        >
          {m}
        </span>
      ))}
    </div>
  );
}
