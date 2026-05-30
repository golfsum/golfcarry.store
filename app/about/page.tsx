import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { TRUST_POINTS } from '@/lib/constants';
import { ICON_MAP } from '@/components/icons';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'GolfCarry.Store is built by golfers, for golfers — curating premium golf gear at fair prices, backed by fast shipping and easy returns.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Built by golfers, for golfers"
        subtitle="Our mission is simple: make it easy for every golfer to find gear they can trust — and enjoy the game a little more."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'About Us', href: '/about' },
        ]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sand-50">
            <Image
              src="https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=1200&q=80"
              alt="Golf course at sunrise"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="prose-policy">
            <h2>Our story</h2>
            <p>
              GolfCarry.Store began with a familiar frustration. Great golf gear was
              either marked up to painful prices at the pro shop, or scattered across
              sketchy websites you couldn’t quite trust. We wanted a better way to
              shop — one built around the golfer, not the markup.
            </p>
            <p>
              So we created a store with a tight, hand-picked catalog. Every bag,
              training aid, accessory, and gadget we list is chosen because it
              genuinely helps you play better or enjoy your round more. We price it
              fairly, ship it fast, and stand behind it with easy 30-day returns.
            </p>
            <p>
              We’re golfers too. We chase birdies, curse three-putts, and believe the
              right gear should make the game more fun — never more complicated.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">
            What we promise you
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((point) => {
              const Icon = ICON_MAP[point.icon as keyof typeof ICON_MAP];
              return (
                <div
                  key={point.title}
                  className="rounded-card border border-ink/10 bg-white p-5 text-center shadow-card"
                >
                  <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-fairway-600/10 text-fairway-700">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-sm font-semibold">{point.title}</h3>
                  <p className="mt-1 text-xs text-ink-soft">{point.body}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 rounded-card bg-fairway-600 px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Ready to upgrade your game?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-white/85">
            Explore our most-loved gear and find your next favorite piece of kit.
          </p>
          <Link href="/collections/best-sellers" className="btn-lg btn mt-6 bg-white text-fairway-700 hover:bg-sand-50">
            Shop Best Sellers
          </Link>
        </div>
      </div>
    </>
  );
}
