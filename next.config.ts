import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Headless commerce: product/CDN images are served from Shopify's CDN.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    // Faster, more cache-friendly fetches against the Storefront API.
    inlineCss: true,
  },
};

export default nextConfig;
