import Link from 'next/link';
import { ChevronRight } from './icons';
import { absoluteUrl } from '@/lib/utils';

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-muted">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {items.map((c, i) => (
        <span key={c.href} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {i === items.length - 1 ? (
            <span className="font-medium text-ink-soft">{c.name}</span>
          ) : (
            <Link href={c.href} className="hover:text-fairway-700">
              {c.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
