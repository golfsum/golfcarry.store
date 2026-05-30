import { Breadcrumbs, type Crumb } from './breadcrumbs';

export function PageHero({
  title,
  subtitle,
  crumbs,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <header className="border-b border-ink/10 bg-sand-50">
      <div className="container-page py-10 sm:py-14">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-ink-soft">{subtitle}</p>}
      </div>
    </header>
  );
}
