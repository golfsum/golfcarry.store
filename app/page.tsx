import { Hero } from '@/components/home/hero';
import { FeaturedCategories } from '@/components/home/featured-categories';
import { WhyShop } from '@/components/home/why-shop';
import { ReviewsSection } from '@/components/home/reviews-section';
import { BrandStory } from '@/components/home/brand-story';
import { EmailCapture } from '@/components/home/email-capture';
import { SectionHeading } from '@/components/section-heading';
import { ProductGrid } from '@/components/product/product-card';
import { getCollections, getCollectionProducts } from '@/lib/shopify';

// Revalidate hourly; Shopify webhooks (see /api/revalidate) refresh instantly on edits.
export const revalidate = 3600;

export default async function HomePage() {
  const [collections, bestSellers, newArrivals] = await Promise.all([
    getCollections(),
    getCollectionProducts({ collection: 'best-sellers', first: 8 }),
    getCollectionProducts({ collection: 'new-arrivals', first: 4 }),
  ]);

  return (
    <>
      <Hero />
      <WhyShop />
      <FeaturedCategories collections={collections} />

      {bestSellers.length > 0 && (
        <section className="container-page py-4 sm:py-6">
          <SectionHeading
            eyebrow="Customer favorites"
            title="Best Sellers"
            description="The gear golfers reach for again and again."
            href="/collections/best-sellers"
          />
          <ProductGrid products={bestSellers} />
        </section>
      )}

      <BrandStory />

      {newArrivals.length > 0 && (
        <section className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Just landed"
            title="New Arrivals"
            description="Fresh additions to upgrade your game."
            href="/collections/new-arrivals"
          />
          <ProductGrid products={newArrivals} />
        </section>
      )}

      <ReviewsSection />
      <EmailCapture />
    </>
  );
}
