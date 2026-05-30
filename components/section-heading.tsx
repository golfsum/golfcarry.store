import Link from 'next/link';

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = 'View all',
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  centered?: boolean;
}) {
  return (
    <div
      className={`mb-8 flex flex-col gap-3 ${
        centered ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between'
      }`}
    >
      <div className={centered ? 'max-w-2xl' : ''}>
        {eyebrow && (
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-fairway-600">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
        {description && (
          <p className="mt-2 max-w-xl text-ink-soft">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-semibold text-fairway-700 hover:text-fairway-800"
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  );
}
