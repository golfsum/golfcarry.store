'use client';

import { useState } from 'react';
import { CheckIcon } from '@/components/icons';
import { SITE } from '@/lib/constants';

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // No mail backend is bundled. Open the visitor's mail client as a reliable
    // fallback; wire this to your provider (Formspree, Resend, Shopify contact)
    // by POSTing to an /api/contact route instead — see README.
    const subject = encodeURIComponent(`Support request from ${data.get('name')}`);
    const body = encodeURIComponent(
      `${data.get('message')}\n\nFrom: ${data.get('name')} <${data.get('email')}>\nOrder #: ${data.get('order') || 'n/a'}`,
    );
    window.location.href = `mailto:${SITE.supportEmail}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex items-center gap-2 rounded-card bg-fairway-50 px-4 py-4 text-sm font-medium text-fairway-700">
        <CheckIcon className="h-5 w-5" />
        Thanks! Your email client is opening. We typically reply within 24 hours.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Name</span>
          <input name="name" required className="input" placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email</span>
          <input name="email" type="email" required className="input" placeholder="you@email.com" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">
          Order number <span className="text-ink-muted">(optional)</span>
        </span>
        <input name="order" className="input" placeholder="#1234" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">How can we help?</span>
        <textarea
          name="message"
          required
          rows={5}
          className="input h-auto py-3"
          placeholder="Tell us what you need…"
        />
      </label>
      <button type="submit" className="btn-primary btn-lg w-full sm:w-auto">
        Send message
      </button>
    </form>
  );
}
