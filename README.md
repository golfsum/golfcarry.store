# GolfCarry.Store

A premium, conversion-focused **headless golf ecommerce storefront** built with
**Next.js (App Router) + Tailwind CSS**, powered by the **Shopify Storefront API**,
and deployed on **Vercel**.

The storefront is fully functional out of the box using built-in sample golf
products. The moment you add your Shopify credentials, it switches to your live
catalog and Shopify's secure hosted checkout (Shop Pay, Apple Pay, Google Pay,
cards) — **no code changes required**.

---

## Why this architecture?

> A standard Shopify theme runs on Shopify's servers and **cannot be hosted on
> Vercel**. To honor "host on Vercel," this project is a **headless** storefront:
> Next.js renders the store on Vercel and reads products/collections from Shopify
> via the Storefront API, then hands off to Shopify's hosted checkout for payment.
> This is the well-established "Vercel Commerce" pattern — you get full design
> control and fast Core Web Vitals, while Shopify handles PCI-compliant payments,
> taxes, and order management.

---

## Quick start (local)

```bash
npm install
cp .env.example .env.local   # then fill in values (works empty too, with sample data)
npm run dev                  # http://localhost:3000
```

`npm run build` → production build · `npm start` → run the build · `npm run typecheck` → TS check.

---

## Connect Shopify (go live with real products)

1. **Shopify admin → Settings → Apps and sales channels → Develop apps → Create an app.**
2. Open the app → **API credentials → Configure Storefront API scopes**. Enable at least:
   `unauthenticated_read_product_listings`, `unauthenticated_read_product_inventory`,
   `unauthenticated_read_product_tags`, `unauthenticated_read_collection_listings`,
   `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts`.
3. **Install the app**, then copy the **Storefront API access token**.
4. Fill these in `.env.local` (and in Vercel → Project → Settings → Environment Variables):

   ```bash
   SHOPIFY_STORE_DOMAIN="your-store.myshopify.com"
   SHOPIFY_STOREFRONT_ACCESS_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
   SHOPIFY_API_VERSION="2025-01"
   NEXT_PUBLIC_SITE_URL="https://golfcarry.store"
   ```

5. Restart `npm run dev`. The store now reads your live catalog. `isShopifyConfigured()`
   in [`lib/shopify/index.ts`](lib/shopify/index.ts) flips automatically when both the
   domain and token are present.

### Collection handles the UI expects

The featured categories, mega-menu, and homepage rails reference these collection
**handles**. Create them in Shopify (Products → Collections) so they populate:

`golf-bags` · `training-aids` · `golf-accessories` · `golf-apparel` ·
`golf-electronics` · `golf-gifts` · `best-sellers` · `new-arrivals`

Tag products with `best-seller` and `new` to drive the homepage badges. Add or
rename categories in [`lib/constants.ts`](lib/constants.ts) — pages update
automatically; **no redesign needed** as the catalog grows to hundreds/thousands of SKUs.

### Instant cache refresh on edits (optional but recommended)

Pages revalidate hourly by default. To refresh **instantly** when you edit products
or collections, set `SHOPIFY_REVALIDATION_SECRET` and add Shopify webhooks
(Settings → Notifications → Webhooks) for `Product update` and `Collection update`
pointing to:

```
https://<your-domain>/api/revalidate?secret=YOUR_SECRET
```

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **New Project → import the repo**. Framework preset auto-detects Next.js.
3. Add the environment variables from above under **Settings → Environment Variables**.
4. Deploy. Add your custom domain `golfcarry.store` under **Settings → Domains**.

Checkout, payments, taxes, and order emails all happen on Shopify's hosted checkout —
the storefront simply redirects there with the customer's cart.

---

## Apps & Integrations

All integrations are wired at the code level and gated behind env vars, so the store
stays clean until you connect each one. (You install/manage the paid apps in your own
Shopify/provider accounts.)

| Need | Recommended | How it's wired here |
|------|-------------|---------------------|
| **Reviews** | Judge.me, Loox, or Okendo | Review UI + `aggregateRating` schema already in place ([`components/reviews/`](components/reviews/)). Replace the sample reviews with the app's widget; SEO markup is ready. |
| **Email marketing** | Klaviyo (or Mailchimp/Omnisend) | Newsletter posts to [`app/api/subscribe/route.ts`](app/api/subscribe/route.ts) — forwards to Klaviyo when `NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY` is set. |
| **Cart / checkout abandonment recovery** | Shopify built-in + Klaviyo flows | Checkouts are created via the Storefront API, so Shopify's **Abandoned checkout** automation and Klaviyo abandoned-cart flows fire natively once email is captured at checkout. |
| **Upsells / cross-sell** | ReConvert / Zipify OCU (post-purchase) | Product pages already show **related** + **recently viewed**. Post-purchase upsells live on Shopify's checkout/thank-you page via these apps. |
| **Analytics** | GA4 + Shopify Analytics | Set `NEXT_PUBLIC_GA4_ID` — loaded in [`components/analytics.tsx`](components/analytics.tsx). |
| **Conversion tracking** | Meta Pixel / Google Ads | Set `NEXT_PUBLIC_META_PIXEL_ID`. For purchase events, also enable Shopify's native pixel/Conversions API. |

---

## What's included

- **Homepage** — hero (dual CTAs), featured categories, best sellers, "why shop with us"
  trust bar, customer reviews with photos, brand story, newsletter capture.
- **Collections** — filtering (category, price, availability, on-sale), sorting,
  quick add-to-cart, product badges, responsive grid, mobile filter drawer.
  Templates auto-generate for every Shopify collection.
- **Product pages** — image gallery with hover-zoom + lightbox, variant selector,
  Add to Cart **and** Buy It Now above the fold, benefit-focused copy, specs,
  shipping/returns/FAQ accordions, trust badges, reviews, related + recently viewed.
- **Cart** — slide-over drawer, optimistic updates, free-shipping progress bar,
  localStorage persistence, secure Shopify checkout handoff.
- **Trust pages** — About, Contact, FAQ (with schema), Track Order, plus Shipping,
  Returns, Privacy, and Terms policies.
- **SEO & performance** — per-page metadata, Open Graph, JSON-LD
  (Organization, Product + AggregateRating, Breadcrumb, FAQ, CollectionPage),
  `sitemap.xml`, `robots.txt`, `next/image` optimization, mobile-first responsive
  design, ~105 kB shared First-Load JS.

## Project structure

```
app/                 Routes (home, collections, product, search, policies, info, api)
components/          UI: layout, home sections, product, cart, reviews, shared
lib/
  shopify/           Storefront API client, GraphQL queries/mutations, types, sample data
  constants.ts       Brand config, navigation, featured categories  ← edit to extend
  policies.ts        Policy page content
  faq.ts             FAQ content
  reviews.ts         Sample reviews (swap for a reviews app)
tailwind.config.ts   Design tokens (fairway green, sand, ink, brass)
```

## Brand & design

- **Palette:** clean white + near-black ink, **deep "fairway" green** accent,
  warm sand neutral, brass detail. Tokens in [`tailwind.config.ts`](tailwind.config.ts).
- **Type:** Inter (UI) + Fraunces (display serif) via `next/font`.
- **Logo:** flagged golf-hole mark — see [`components/logo.tsx`](components/logo.tsx)
  and the favicon at [`app/icon.svg`](app/icon.svg).

### A note on sample images

Sample products use Unsplash URLs (allow-listed in `next.config.ts`). When you
connect Shopify, product imagery comes from `cdn.shopify.com` (already allow-listed).
Add other image hosts to `images.remotePatterns` if needed.
