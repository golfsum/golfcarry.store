import clsx from 'clsx';
import type { Money } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils';

export function Price({
  price,
  compareAt,
  className,
  size = 'md',
}: {
  price: Money;
  compareAt?: Money | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const onSale = compareAt && Number(compareAt.amount) > Number(price.amount);
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-2xl',
  } as const;

  return (
    <span className={clsx('flex items-baseline gap-2', className)}>
      <span className={clsx('font-semibold text-ink', sizes[size])}>
        {formatPrice(price)}
      </span>
      {onSale && (
        <span
          className={clsx(
            'text-ink-muted line-through',
            size === 'lg' ? 'text-base' : 'text-xs',
          )}
        >
          {formatPrice(compareAt)}
        </span>
      )}
    </span>
  );
}
