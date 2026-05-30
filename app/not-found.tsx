import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-semibold text-fairway-600">404</p>
      <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">This hole&apos;s out of bounds</h1>
      <p className="mt-2 max-w-md text-ink-soft">
        We couldn&apos;t find the page you were looking for. Let&apos;s get you back on the fairway.
      </p>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary btn-lg">
          Back to home
        </Link>
        <Link href="/collections/all" className="btn-secondary btn-lg">
          Shop all products
        </Link>
      </div>
    </div>
  );
}
