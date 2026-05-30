import Image from 'next/image';
import { SectionHeading } from '@/components/section-heading';
import { Stars } from '@/components/reviews/stars';
import { featuredReviews, reviewStats } from '@/lib/reviews';
import { CheckIcon } from '@/components/icons';

export function ReviewsSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <SectionHeading
        eyebrow="Loved by golfers"
        title="Don’t just take our word for it"
        description={`Rated ${reviewStats.average}/5 across ${reviewStats.total.toLocaleString()}+ reviews from real customers.`}
        centered
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredReviews.map((review) => (
          <figure
            key={review.id}
            className="flex flex-col rounded-card border border-ink/10 bg-white p-5 shadow-card"
          >
            <div className="flex items-center justify-between">
              <Stars rating={review.rating} size="md" />
              {review.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-fairway-700">
                  <CheckIcon className="h-3.5 w-3.5" /> Verified
                </span>
              )}
            </div>
            <figcaption className="mt-3 font-semibold">{review.title}</figcaption>
            <blockquote className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">
              “{review.body}”
            </blockquote>
            {review.photo && (
              <div className="relative mt-4 h-40 w-full overflow-hidden rounded-lg bg-sand-50">
                <Image
                  src={review.photo}
                  alt={`Customer photo from ${review.name}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 text-xs text-ink-muted">
              <span className="font-medium text-ink">
                {review.name} · {review.location}
              </span>
            </div>
            {review.product && (
              <p className="mt-1 text-[11px] text-ink-muted">on {review.product}</p>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
