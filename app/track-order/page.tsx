import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { TrackOrderForm } from '@/components/track-order-form';

export const metadata: Metadata = {
  title: 'Track Your Order',
  description: 'Check the status of your GolfCarry.Store order.',
  alternates: { canonical: '/track-order' },
};

export default function TrackOrderPage() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '');
  return (
    <>
      <PageHero
        title="Track your order"
        subtitle="Enter your order number and email to see the latest status and tracking."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'Track Order', href: '/track-order' },
        ]}
      />
      <div className="container-page py-12">
        <div className="mx-auto max-w-md">
          <TrackOrderForm storeDomain={storeDomain} />
          <p className="mt-4 text-center text-xs text-ink-muted">
            Tip: your shipping confirmation email also contains a live tracking link.
          </p>
        </div>
      </div>
    </>
  );
}
