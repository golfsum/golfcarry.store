export const SITE = {
  name: 'GolfCarry.Store',
  shortName: 'GolfCarry',
  tagline: 'Premium golf gear, delivered.',
  description:
    'GolfCarry.Store is your destination for premium golf bags, training aids, accessories, apparel, and electronics — curated to help every golfer play better and enjoy the game more.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://golfcarry.store',
  supportEmail: 'support@golfcarry.store',
  currency: 'USD',
  freeShippingThreshold: 75,
};

// Primary navigation — featured collections. Maps to Shopify collection handles.
export const MAIN_NAV: { title: string; path: string }[] = [
  { title: 'Shop All', path: '/collections/all' },
  { title: 'Best Sellers', path: '/collections/best-sellers' },
  { title: 'New Arrivals', path: '/collections/new-arrivals' },
];

// Mega-menu groups. Add collections here as the catalog grows — pages update
// automatically because product cards populate from Shopify.
export const MEGA_MENU: {
  title: string;
  path: string;
  children: { title: string; path: string }[];
}[] = [
  {
    title: 'Shop',
    path: '/collections/all',
    children: [
      { title: 'Golf Bags', path: '/collections/golf-bags' },
      { title: 'Training Aids', path: '/collections/training-aids' },
      { title: 'Accessories', path: '/collections/golf-accessories' },
      { title: 'Apparel', path: '/collections/golf-apparel' },
      { title: 'Electronics & Gadgets', path: '/collections/golf-electronics' },
      { title: 'Golf Gifts', path: '/collections/golf-gifts' },
    ],
  },
];

export const FEATURED_CATEGORIES: {
  title: string;
  handle: string;
  blurb: string;
}[] = [
  { title: 'Golf Bags', handle: 'golf-bags', blurb: 'Carry, stand & cart bags' },
  { title: 'Training Aids', handle: 'training-aids', blurb: 'Practice smarter' },
  { title: 'Accessories', handle: 'golf-accessories', blurb: 'Round essentials' },
  { title: 'Apparel', handle: 'golf-apparel', blurb: 'Look & play your best' },
  {
    title: 'Electronics & Gadgets',
    handle: 'golf-electronics',
    blurb: 'GPS, rangefinders & more',
  },
];

export const FOOTER_NAV: { heading: string; links: { title: string; path: string }[] }[] = [
  {
    heading: 'Shop',
    links: [
      { title: 'Golf Bags', path: '/collections/golf-bags' },
      { title: 'Training Aids', path: '/collections/training-aids' },
      { title: 'Accessories', path: '/collections/golf-accessories' },
      { title: 'Apparel', path: '/collections/golf-apparel' },
      { title: 'Electronics', path: '/collections/golf-electronics' },
      { title: 'Gifts', path: '/collections/golf-gifts' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { title: 'Track Order', path: '/track-order' },
      { title: 'FAQ', path: '/faq' },
      { title: 'Contact Us', path: '/contact' },
      { title: 'Shipping Policy', path: '/policies/shipping' },
      { title: 'Returns & Refunds', path: '/policies/returns' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { title: 'About Us', path: '/about' },
      { title: 'Best Sellers', path: '/collections/best-sellers' },
      { title: 'New Arrivals', path: '/collections/new-arrivals' },
      { title: 'Privacy Policy', path: '/policies/privacy' },
      { title: 'Terms of Service', path: '/policies/terms' },
    ],
  },
];

export const SORT_OPTIONS: { label: string; value: string }[] = [
  { label: 'Featured', value: 'best-selling' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Alphabetical', value: 'title-asc' },
];

export const TRUST_POINTS = [
  {
    title: 'Fast, Tracked Shipping',
    body: 'Orders ship within 1–2 business days with tracking on every package.',
    icon: 'truck',
  },
  {
    title: 'Secure Checkout',
    body: 'Shop Pay, Apple Pay, Google Pay & all major cards. 256-bit encrypted.',
    icon: 'lock',
  },
  {
    title: 'Quality, Curated Gear',
    body: 'Every product is hand-picked and tested by golfers, for golfers.',
    icon: 'badge',
  },
  {
    title: 'Easy 30-Day Returns',
    body: 'Not the right fit? Send it back within 30 days, hassle-free.',
    icon: 'refresh',
  },
];
