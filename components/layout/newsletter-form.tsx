'use client';

import { useState } from 'react';
import { MailIcon, CheckIcon } from '@/components/icons';

/**
 * Newsletter capture. Posts to /api/subscribe, which forwards to your email
 * provider (Klaviyo/Mailchimp) when configured — see app/api/subscribe/route.ts.
 */
export function NewsletterForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const dark = variant === 'dark';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get('email') as string)?.trim();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'done' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div
        className={`flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium ${
          dark ? 'bg-white/10 text-white' : 'bg-fairway-50 text-fairway-700'
        }`}
      >
        <CheckIcon className="h-5 w-5" />
        You&apos;re in! Check your inbox for your 10% welcome code.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <MailIcon
          className={`pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 ${
            dark ? 'text-white/60' : 'text-ink-muted'
          }`}
        />
        <input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          aria-label="Email address"
          className={`input h-12 rounded-full pl-11 ${
            dark
              ? 'border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white focus:ring-white'
              : ''
          }`}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className={dark ? 'btn-lg btn bg-white text-fairway-700 hover:bg-sand-50' : 'btn-primary btn-lg'}
      >
        {status === 'loading' ? 'Joining…' : 'Get 10% Off'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-300">Something went wrong — please try again.</p>
      )}
    </form>
  );
}
