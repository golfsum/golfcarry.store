import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { ContactForm } from '@/components/contact-form';
import { MailIcon, TruckIcon, RefreshIcon } from '@/components/icons';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with the ${SITE.name} team. We typically reply within 24 hours.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="We’re here to help"
        subtitle="Questions about an order, a product, or your game? Send us a note — real golfers, fast replies."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ]}
      />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem]">
        <div>
          <ContactForm />
        </div>
        <aside className="space-y-4">
          <div className="rounded-card border border-ink/10 bg-sand-50 p-5">
            <MailIcon className="h-6 w-6 text-fairway-700" />
            <h2 className="mt-2 text-sm font-semibold">Email us</h2>
            <a href={`mailto:${SITE.supportEmail}`} className="text-sm text-fairway-700 underline">
              {SITE.supportEmail}
            </a>
            <p className="mt-1 text-xs text-ink-muted">Replies within 24 hours, 7 days a week.</p>
          </div>
          <Link href="/track-order" className="block rounded-card border border-ink/10 p-5 hover:border-ink/30">
            <TruckIcon className="h-6 w-6 text-fairway-700" />
            <h2 className="mt-2 text-sm font-semibold">Track your order</h2>
            <p className="mt-1 text-xs text-ink-soft">Check the status of a recent purchase.</p>
          </Link>
          <Link href="/policies/returns" className="block rounded-card border border-ink/10 p-5 hover:border-ink/30">
            <RefreshIcon className="h-6 w-6 text-fairway-700" />
            <h2 className="mt-2 text-sm font-semibold">Start a return</h2>
            <p className="mt-1 text-xs text-ink-soft">30-day easy returns, prepaid labels.</p>
          </Link>
        </aside>
      </div>
    </>
  );
}
