import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Gallery } from '@/components/product/gallery';
import { ProductActions } from '@/components/product/product-actions';
import { TrustBadges } from '@/components/product/trust-badges';
import { Accordion } from '@/components/accordion';
import { ProductReviews } from '@/components/reviews/product-reviews';
import { RecentlyViewed } from '@/components/product/recently-viewed';
import { ProductGrid } from '@/components/product/product-card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SectionHeading } from '@/components/section-heading';
import {
  getProduct,
  getProductRecommendations,
  getProducts,
} from '@/lib/shopify';
import { pseudoRating } from '@/lib/utils';
import { SITE } from '@/lib/constants';

export const revalidate = 3600;

type Params = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  const products = await getProducts({ first: 100 });
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description,
    alternates: { canonical: `/product/${handle}` },
    openGraph: {
      type: 'website',
      title: product.title,
      description: product.description,
      images: product.featuredImage
        ? [{ url: product.featuredImage.url, width: 1200, height: 1200 }]
        : undefined,
    },
  };
}

const PRODUCT_FAQS = [
  {
    q: 'How long does shipping take?',
    a: 'Orders are processed within 1–2 business days and typically arrive in 3–7 business days within the US. You’ll receive tracking by email as soon as your order ships.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer 30-day easy returns on unused items in original packaging. Start a return from our Returns & Refunds page and we’ll send you a prepaid label.',
  },
  {
    q: 'Is checkout secure?',
    a: 'Absolutely. Checkout is fully encrypted and supports Shop Pay, Apple Pay, Google Pay, and all major credit cards.',
  },
];

export default async function ProductPage({ params }: Params) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const recommendations = await getProductRecommendations(product.id);
  const { rating, count } = pseudoRating(product.handle);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images.map((i) => i.url),
    sku: product.handle,
    brand: { '@type': 'Brand', name: product.vendor || SITE.name },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: count,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE.url}/product/${product.handle}`,
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      price: product.priceRange.minVariantPrice.amount,
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="container-page py-6 sm:py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: product.productType, href: '/collections/all' },
            { name: product.title, href: `/product/${product.handle}` },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Gallery images={product.images} title={product.title} />
          <div>
            <ProductActions product={product} />
          </div>
        </div>

        {/* Trust badges */}
        <div className="mt-12">
          <TrustBadges />
        </div>

        {/* Details */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Product details</h2>
            <div
              className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:text-lg prose-li:my-0.5"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Shipping, returns &amp; FAQ</h2>
            <Accordion
              items={[
                {
                  title: 'Shipping information',
                  defaultOpen: true,
                  content: (
                    <p>
                      Orders ship within 1–2 business days with tracking on every
                      package. Standard delivery is 3–7 business days in the US.
                      Free shipping on orders over ${SITE.freeShippingThreshold}.
                    </p>
                  ),
                },
                {
                  title: 'Returns & refunds',
                  content: (
                    <p>
                      Not the right fit? Return unused items in original packaging
                      within 30 days for a full refund. We’ll email you a prepaid
                      label — no hassle.
                    </p>
                  ),
                },
                {
                  title: 'Frequently asked questions',
                  content: (
                    <ul className="space-y-3">
                      {PRODUCT_FAQS.map((f) => (
                        <li key={f.q}>
                          <p className="font-semibold text-ink">{f.q}</p>
                          <p>{f.a}</p>
                        </li>
                      ))}
                    </ul>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <ProductReviews handle={product.handle} title={product.title} />

      {recommendations.length > 0 && (
        <section className="container-page py-14">
          <SectionHeading title="You may also like" />
          <ProductGrid products={recommendations.slice(0, 4)} />
        </section>
      )}

      <RecentlyViewed
        current={{
          handle: product.handle,
          title: product.title,
          image: product.featuredImage.url,
          price: product.priceRange.minVariantPrice,
          productType: product.productType,
        }}
      />
    </>
  );
}
