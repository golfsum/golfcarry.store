import Image from 'next/image';
import Link from 'next/link';
import { Stars } from '@/components/reviews/stars';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-fairway-950">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=2000&q=80"
          alt="Golfer on a lush green fairway at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/20" />
      </div>

      <div className="container-page relative">
        <div className="flex min-h-[78vh] max-w-2xl flex-col justify-center py-20 text-white sm:min-h-[80vh]">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-fairway-300" />
            Free shipping over $75 · 30-day returns
          </span>

          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Gear that helps you{' '}
            <span className="text-fairway-300">play your best round.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg text-white/85">
            Premium golf bags, training aids, accessories, and electronics —
            hand-picked for golfers who care about every shot. Shop smarter, play better.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/collections/all" className="btn-primary btn-lg">
              Shop the Collection
            </Link>
            <Link
              href="/collections/best-sellers"
              className="btn-lg btn border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20"
            >
              Shop Best Sellers
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <Stars rating={4.8} size="md" />
            <p className="text-sm text-white/80">
              <span className="font-semibold text-white">4.8/5</span> from 12,000+ happy golfers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
