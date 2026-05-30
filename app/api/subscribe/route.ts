import { NextResponse } from 'next/server';

/**
 * Newsletter signup endpoint. Forwards the email to Klaviyo when
 * NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY is set; otherwise it succeeds as a no-op so
 * the UI works in development. Swap in your provider (Mailchimp, Omnisend, etc.)
 * by editing the forwarding block below.
 */
export async function POST(request: Request) {
  let email = '';
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const klaviyoKey = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY;

  if (klaviyoKey) {
    try {
      await fetch('https://a.klaviyo.com/client/subscriptions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          revision: '2024-10-15',
        },
        body: JSON.stringify({
          data: {
            type: 'subscription',
            attributes: {
              profile: { data: { type: 'profile', attributes: { email } } },
            },
          },
        }),
      });
    } catch {
      // Don't fail the UX on provider hiccups — log server-side in production.
    }
  }

  return NextResponse.json({ ok: true });
}
