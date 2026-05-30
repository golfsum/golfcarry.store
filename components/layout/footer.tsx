import Link from 'next/link';
import { Logo } from '@/components/logo';
import { NewsletterForm } from './newsletter-form';
import { FOOTER_NAV, SITE } from '@/lib/constants';

const PAYMENTS = ['Shop Pay', 'Apple Pay', 'Google Pay', 'Visa', 'Mastercard', 'Amex', 'PayPal'];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink/10 bg-sand-50">
      {/* Newsletter band */}
      <div className="border-b border-ink/10">
        <div className="container-page grid gap-6 py-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Join the GolfCarry Club</h2>
            <p className="mt-2 max-w-md text-ink-soft">
              Get <span className="font-semibold text-fairway-700">10% off your first order</span>,
              plus early access to new arrivals and members-only deals.
            </p>
          </div>
          <div className="md:justify-self-end">
            <NewsletterForm />
            <p className="mt-2 text-xs text-ink-muted">
              No spam. Unsubscribe anytime. By signing up you agree to our{' '}
              <Link href="/policies/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-ink-soft">
            Premium golf gear, curated for golfers who care about their game.
            Fast shipping, secure checkout, and easy 30-day returns.
          </p>
          <p className="mt-4 text-sm text-ink-muted">
            Questions?{' '}
            <a href={`mailto:${SITE.supportEmail}`} className="underline">
              {SITE.supportEmail}
            </a>
          </p>
        </div>
        {FOOTER_NAV.map((col) => (
          <div key={col.heading}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              {col.heading}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-ink-soft hover:text-fairway-700"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="rounded border border-ink/10 bg-white px-2 py-1 text-[10px] font-medium text-ink-soft"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
