import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/page-hero';
import { POLICIES, POLICY_SLUGS } from '@/lib/policies';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POLICY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) return {};
  return {
    title: policy.title,
    description: policy.description,
    alternates: { canonical: `/policies/${slug}` },
  };
}

export default async function PolicyPage({ params }: Params) {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) notFound();

  return (
    <>
      <PageHero
        title={policy.title}
        crumbs={[
          { name: 'Home', href: '/' },
          { name: policy.title, href: `/policies/${slug}` },
        ]}
      />
      <article className="container-page py-12">
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 text-sm text-ink-muted">Last updated: {policy.updated}</p>
          <div className="space-y-8">
            {policy.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="mb-2 text-xl font-semibold">{section.heading}</h2>
                )}
                {section.body.map((p, j) => (
                  <p key={j} className="mb-3 leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
