import { NewsletterForm } from '@/components/layout/newsletter-form';

export function EmailCapture() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-card bg-fairway-600 px-6 py-12 text-white sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fairway-100">
            Members save more
          </p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Get 10% off your first order
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/85">
            Join 30,000+ golfers getting early access to new arrivals, exclusive
            deals, and tips to lower your scores. Your welcome code lands instantly.
          </p>
          <div className="mt-7 flex justify-center">
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
