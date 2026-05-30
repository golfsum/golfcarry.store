import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { Accordion } from '@/components/accordion';
import { FAQ_GROUPS, ALL_FAQS } from '@/lib/faq';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Answers to common questions about shipping, returns, payment, and products at GolfCarry.Store.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageHero
        title="Frequently asked questions"
        subtitle="Everything you need to know about shopping with us. Can’t find your answer? We’re an email away."
        crumbs={[
          { name: 'Home', href: '/' },
          { name: 'FAQ', href: '/faq' },
        ]}
      />
      <div className="container-page py-12">
        <div className="mx-auto max-w-3xl space-y-12">
          {FAQ_GROUPS.map((group) => (
            <div key={group.heading}>
              <h2 className="mb-3 text-xl font-semibold">{group.heading}</h2>
              <Accordion items={group.items.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />
            </div>
          ))}

          <div className="rounded-card border border-ink/10 bg-sand-50 p-6 text-center">
            <h2 className="text-lg font-semibold">Still have questions?</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Our team is happy to help — reach out and we’ll get back to you within 24 hours.
            </p>
            <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary btn-md">
                Contact us
              </Link>
              <a href={`mailto:${SITE.supportEmail}`} className="btn-secondary btn-md">
                {SITE.supportEmail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
