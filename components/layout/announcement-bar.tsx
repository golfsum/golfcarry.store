import { SITE } from '@/lib/constants';

const messages = [
  `Free shipping on orders over $${SITE.freeShippingThreshold}`,
  '30-day easy returns',
  'Secure checkout — Shop Pay · Apple Pay · Google Pay',
  'New arrivals just dropped ⛳',
];

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-white">
      <div className="container-page flex h-9 items-center justify-center overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap sm:animate-none">
          {messages.map((m, i) => (
            <span
              key={i}
              className="mx-6 text-xs font-medium tracking-wide text-white/90"
            >
              {m}
            </span>
          ))}
          {/* duplicate for seamless marquee on mobile */}
          <span aria-hidden className="flex sm:hidden">
            {messages.map((m, i) => (
              <span
                key={`dup-${i}`}
                className="mx-6 text-xs font-medium tracking-wide text-white/90"
              >
                {m}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
