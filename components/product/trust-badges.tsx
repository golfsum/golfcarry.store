import { TruckIcon, RefreshIcon, LockIcon, BadgeIcon } from '@/components/icons';

const badges = [
  { icon: TruckIcon, label: 'Fast Shipping', sub: '1–2 day handling' },
  { icon: LockIcon, label: 'Secure Checkout', sub: '256-bit SSL' },
  { icon: RefreshIcon, label: '30-Day Returns', sub: 'Hassle-free' },
  { icon: BadgeIcon, label: 'Quality Promise', sub: 'Golfer-tested' },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex flex-col items-center gap-1.5 rounded-card border border-ink/10 bg-white p-3 text-center"
        >
          <b.icon className="h-6 w-6 text-fairway-700" />
          <span className="text-xs font-semibold leading-tight">{b.label}</span>
          <span className="text-[11px] text-ink-muted">{b.sub}</span>
        </div>
      ))}
    </div>
  );
}
