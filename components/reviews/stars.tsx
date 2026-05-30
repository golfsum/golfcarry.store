import { StarIcon } from '@/components/icons';

export function Stars({
  rating,
  size = 'sm',
  className = '',
}: {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const px = size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;

  return (
    <span className={`inline-flex items-center ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full;
        const half = i === full && hasHalf;
        return (
          <span key={i} className="relative text-brass">
            <StarIcon filled={false} className={`${px} text-brass/40`} />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? '50%' : '100%' }}
              >
                <StarIcon filled className={px} />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
