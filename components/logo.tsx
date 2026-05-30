import Link from 'next/link';
import clsx from 'clsx';

/**
 * GolfCarry.Store mark: a flagged golf hole inside a soft green disc — clean,
 * scalable, and recognizable at favicon size. Wordmark uses the display serif.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="GolfCarry.Store"
    >
      <circle cx="24" cy="24" r="23" className="fill-fairway-600" />
      {/* flag pole */}
      <path
        d="M19 12v22"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* flag */}
      <path d="M19 12h13l-3.2 4L32 20H19z" className="fill-white" />
      {/* hole / green line */}
      <path
        d="M13 34h22"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* ball */}
      <circle cx="29" cy="31.5" r="2.4" className="fill-sand-200" />
    </svg>
  );
}

export function Logo({
  className,
  textClassName,
  showText = true,
}: {
  className?: string;
  textClassName?: string;
  showText?: boolean;
}) {
  return (
    <Link
      href="/"
      className={clsx('group inline-flex items-center gap-2.5', className)}
      aria-label="GolfCarry.Store home"
    >
      <LogoMark className="h-9 w-9 shrink-0 transition-transform group-hover:scale-105" />
      {showText && (
        <span
          className={clsx(
            'font-display text-xl font-semibold leading-none tracking-tight text-ink',
            textClassName,
          )}
        >
          GolfCarry
          <span className="text-fairway-600">.Store</span>
        </span>
      )}
    </Link>
  );
}
