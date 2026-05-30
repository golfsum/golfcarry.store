import Image from 'next/image';
import Link from 'next/link';

export function BrandStory() {
  return (
    <section className="bg-fairway-950 text-white">
      <div className="container-page grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-card lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1535132011086-b8818f016104?w=1200&q=80"
            alt="Golfer lining up a shot on the course"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-fairway-300">
            Our story
          </p>
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Built by golfers, for golfers.
          </h2>
          <div className="mt-5 space-y-4 text-white/80">
            <p>
              GolfCarry.Store started with a simple frustration: great golf gear
              was either overpriced at the pro shop or impossible to trust online.
              We knew there was a better way.
            </p>
            <p>
              So we built a store that puts the golfer first — carefully curating
              every bag, training aid, and gadget we sell, pricing it fairly, and
              backing it with fast shipping and genuinely easy returns. No gimmicks,
              just gear that helps you enjoy the game and shoot lower scores.
            </p>
            <p>
              Whether you&apos;re chasing your first birdie or your club championship,
              we&apos;re here to help you carry your game further.
            </p>
          </div>
          <Link
            href="/about"
            className="btn-lg btn mt-7 bg-white text-fairway-800 hover:bg-sand-50"
          >
            Read our full story
          </Link>
        </div>
      </div>
    </section>
  );
}
