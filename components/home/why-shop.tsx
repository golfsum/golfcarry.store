import { TRUST_POINTS } from '@/lib/constants';
import { ICON_MAP } from '@/components/icons';

export function WhyShop() {
  return (
    <section className="border-y border-ink/10 bg-sand-50">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {TRUST_POINTS.map((point) => {
            const Icon = ICON_MAP[point.icon as keyof typeof ICON_MAP];
            return (
              <div key={point.title} className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                <span className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fairway-600/10 text-fairway-700 sm:mb-0 sm:mr-4">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{point.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-soft">{point.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
