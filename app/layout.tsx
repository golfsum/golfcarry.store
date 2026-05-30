import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { CartProvider } from '@/components/cart/cart-context';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { Analytics } from '@/components/analytics';
import { SITE } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Premium Golf Gear & Accessories`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'golf bags',
    'golf training aids',
    'golf accessories',
    'golf apparel',
    'golf rangefinder',
    'golf gps watch',
    'golf gifts',
  ],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} — Premium Golf Gear & Accessories`,
    description: SITE.description,
    url: SITE.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Premium Golf Gear & Accessories`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#2c6233',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.supportEmail,
    paymentAccepted: 'Shop Pay, Apple Pay, Google Pay, Visa, Mastercard, American Express, PayPal',
  };

  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
