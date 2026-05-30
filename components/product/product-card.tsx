import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/shopify/types';
import { Price } from './price';
import { QuickAdd } from './quick-add';
import { Stars } from '@/components/reviews/stars';
import { discountPercent, pseudoRating } from '@/lib/utils';

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const price = product.priceRange.minVariantPrice;
  const compareAt = product.compareAtPriceRange.minVariantPrice;
  const onSale = Number(compareAt.amount) > Number(price.amount);
  const discount = discountPercent(price.amount, onSale ? compareAt.amount : null);
  const isNew = product.tags.includes('new');
  const isBest = product.tags.includes('best-seller');
  const hasOptions =
    product.options.length > 0 &&
    !(product.options.length === 1 && product.options[0].values.length <= 1);
  const firstVariant = product.variants[0];
  const { rating, count } = pseudoRating(product.handle);
  const secondImage = product.images[1];

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/product/${product.handle}`}
        className="relative block aspect-square overflow-hidden rounded-card bg-sand-50"
      >
        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col items-start gap-1.5">
          {discount && <span className="badge-sale">-{discount}%</span>}
          {isNew && !discount && <span className="badge-new">New</span>}
          {isBest && !isNew && !discount && <span className="badge-best">Best Seller</span>}
        </div>

        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority={priority}
          className="object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {secondImage && (
          <Image
            src={secondImage.url}
            alt={secondImage.altText}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <p className="text-[11px] font-medium uppercase tracking-wide text-ink-muted">
          {product.productType}
        </p>
        <Link href={`/product/${product.handle}`} className="mt-0.5">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink hover:text-fairway-700">
            {product.title}
          </h3>
        </Link>
        <div className="mt-1 flex items-center gap-1.5">
          <Stars rating={rating} />
          <span className="text-xs text-ink-muted">({count})</span>
        </div>
        <div className="mt-1.5">
          <Price price={price} compareAt={onSale ? compareAt : null} />
        </div>

        <div className="mt-3">
          <QuickAdd
            handle={product.handle}
            hasOptions={hasOptions}
            available={product.availableForSale}
            line={{
              variantId: firstVariant?.id ?? product.id,
              productId: product.id,
              handle: product.handle,
              title: product.title,
              variantTitle: firstVariant?.title ?? '',
              image: {
                url: product.featuredImage.url,
                altText: product.featuredImage.altText,
              },
              price,
              options: firstVariant?.selectedOptions ?? [],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
