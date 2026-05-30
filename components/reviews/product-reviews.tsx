import { Stars } from './stars';
import { CheckIcon } from '@/components/icons';
import { featuredReviews } from '@/lib/reviews';
import { pseudoRating } from '@/lib/utils';

/**
 * Product review block. Uses sample reviews for now; once you install a reviews
 * app (Judge.me / Loox / Okendo), drop its widget in place of this component —
 * the Product JSON-LD on the page already exposes aggregateRating for SEO.
 */
export function ProductReviews({ handle, title }: { handle: string; title: string }) {
  const { rating, count } = pseudoRating(handle);
  // Deterministically pick a few sample reviews for this product.
  const seed = handle.length;
  const reviews = [0, 1, 2].map((i) => featuredReviews[(seed + i) % featuredReviews.length]);

  const distribution = [
    { stars: 5, percent: 86 },
    { stars: 4, percent: 10 },
    { stars: 3, percent: 3 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ];

  return (
    <section id="reviews" className="container-page scroll-mt-24 border-t border-ink/10 py-14">
      <h2 className="text-2xl font-semibold sm:text-3xl">Customer Reviews</h2>

      <div className="mt-6 grid gap-8 lg:grid-cols-[20rem_1fr]">
        {/* Summary */}
        <div className="rounded-card border border-ink/10 bg-sand-50 p-6">
          <div className="flex items-end gap-3">
            <span className="font-display text-5xl font-semibold">{rating}</span>
            <div className="pb-1">
              <Stars rating={rating} size="md" />
              <p className="mt-1 text-xs text-ink-muted">{count} verified reviews</p>
            </div>
          </div>
          <div className="mt-5 space-y-1.5">
            {distribution.map((d) => (
              <div key={d.stars} className="flex items-center gap-2 text-xs">
                <span className="w-8 text-ink-muted">{d.stars}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-brass"
                    style={{ width: `${d.percent}%` }}
                  />
                </div>
                <span className="w-8 text-right text-ink-muted">{d.percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Individual reviews */}
        <div className="divide-y divide-ink/10">
          {reviews.map((r, i) => (
            <article key={`${r.id}-${i}`} className="py-5 first:pt-0">
              <div className="flex items-center justify-between">
                <Stars rating={r.rating} size="sm" />
                <span className="text-xs text-ink-muted">
                  {new Date(r.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">“{r.body}”</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted">
                <span className="font-medium text-ink">{r.name}</span>
                {r.verified && (
                  <span className="inline-flex items-center gap-0.5 text-fairway-700">
                    <CheckIcon className="h-3 w-3" /> Verified buyer
                  </span>
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
