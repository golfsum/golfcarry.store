import type { Collection, Product } from './types';

// ---------------------------------------------------------------------------
// Sample catalog used as a graceful fallback when Shopify env vars are absent
// (local dev before credentials are wired, or preview builds). Once
// SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN are set, the live
// Storefront API takes over automatically — no code changes needed.
// ---------------------------------------------------------------------------

const CURRENCY = 'USD';
const IMG = 'https://images.unsplash.com';

function money(amount: number) {
  return { amount: amount.toFixed(2), currencyCode: CURRENCY };
}

function image(url: string, alt: string) {
  return { url, altText: alt, width: 1200, height: 1200 };
}

type Seed = {
  handle: string;
  title: string;
  price: number;
  compareAt?: number;
  type: string;
  collections: string[];
  tags: string[];
  blurb: string;
  description: string;
  specs: string;
  images: string[];
  options?: { name: string; values: string[] }[];
  available?: boolean;
};

const seeds: Seed[] = [
  {
    handle: 'tour-pro-cart-bag',
    title: 'TourPro 14-Way Cart Bag',
    price: 199.0,
    compareAt: 269.0,
    type: 'Golf Bags',
    collections: ['golf-bags', 'best-sellers'],
    tags: ['best-seller', 'golf-bags', 'cart-bag'],
    blurb:
      'Glide through 18 holes with a 14-way organized top that keeps every club exactly where you reach for it.',
    description:
      'Stop fighting tangled clubs on the back nine. The TourPro 14-Way Cart Bag gives every iron, wood, and wedge its own full-length divider, so you grab the right club the first time and keep your rhythm. Seven pockets — including a velour-lined valuables pocket and an insulated cooler sleeve — mean your phone, rangefinder, and a cold drink ride safely with you. Built to lock cleanly onto any push or riding cart, it stays put through every bumpy fairway.',
    specs:
      'Top: 14-way full-length dividers | Pockets: 7 (insulated cooler, velour valuables, 2 apparel) | Strap: Cart-strap pass-through + rain hood | Weight: 5.4 lbs | Material: Water-resistant 1680D polyester',
    images: [
      `${IMG}/photo-1535131749006-b7f58c99034b?w=1200&q=80`,
      `${IMG}/photo-1591491640784-3232eb1f7e0e?w=1200&q=80`,
    ],
    options: [{ name: 'Color', values: ['Fairway Green', 'Black', 'Charcoal'] }],
  },
  {
    handle: 'featherlite-stand-bag',
    title: 'FeatherLite Carry Stand Bag',
    price: 149.0,
    compareAt: 189.0,
    type: 'Golf Bags',
    collections: ['golf-bags', 'best-sellers', 'new-arrivals'],
    tags: ['best-seller', 'new', 'golf-bags', 'stand-bag'],
    blurb:
      'Just 3.9 lbs on a dual-strap harness — walk all 18 and barely feel the load.',
    description:
      'Walking the course should feel effortless, not like punishment. At 3.9 pounds with a balanced dual-strap harness, the FeatherLite disappears on your back so you can focus on your swing, not your shoulders. The auto-deploy stand legs plant firmly on any lie, and the rain hood tucks away until the weather turns.',
    specs:
      'Weight: 3.9 lbs | Top: 4-way | Pockets: 6 | Stand: Auto-deploy anti-slip legs | Strap: Dual ergonomic harness | Included: Rain hood',
    images: [
      `${IMG}/photo-1593111774240-d529f12cf4bb?w=1200&q=80`,
      `${IMG}/photo-1592919505780-303950717480?w=1200&q=80`,
    ],
    options: [{ name: 'Color', values: ['Black/Green', 'Navy', 'Stone'] }],
  },
  {
    handle: 'putting-alignment-mirror',
    title: 'Precision Putting Alignment Mirror',
    price: 39.0,
    compareAt: 59.0,
    type: 'Training Aids',
    collections: ['training-aids', 'best-sellers'],
    tags: ['best-seller', 'training-aids', 'putting'],
    blurb:
      'See your eye line, shoulders, and putter face in one glance — drain more putts inside 10 feet.',
    description:
      'Most missed putts start before the stroke — with your eyes and shoulders out of line. This alignment mirror shows you instantly when your setup is square, then trains the feel until it becomes automatic. The included gate pegs force a true face angle through impact. Ten minutes a day on the practice green turns three-putts into tap-ins.',
    specs:
      'Size: 12.5" x 8.5" | Material: Shatterproof acrylic mirror | Includes: 4 alignment gate tees, carry pouch | Use: Indoor & outdoor practice greens',
    images: [
      `${IMG}/photo-1622396636133-ba43f812bc35?w=1200&q=80`,
      `${IMG}/photo-1530028828-25e8270793c5?w=1200&q=80`,
    ],
  },
  {
    handle: 'swing-tempo-trainer',
    title: 'SwingTempo Weighted Trainer',
    price: 79.0,
    compareAt: 99.0,
    type: 'Training Aids',
    collections: ['training-aids', 'new-arrivals'],
    tags: ['new', 'training-aids', 'swing'],
    blurb:
      'Build a smoother, more powerful swing with the weighted club pros use to groove tempo.',
    description:
      'Power comes from rhythm, not muscle. The SwingTempo trainer is weighted to exaggerate the feel of a properly sequenced swing, so your body learns the correct transition and release without you thinking about it. Take 20 swings before a round to warm up and lock in tempo from the first tee.',
    specs:
      'Length: 40" | Weight: 27 oz | Flex: Tempo-tuned | Grip: Tour rubber | Use: Warm-up, tempo & strength training',
    images: [
      `${IMG}/photo-1587174486073-ae5e5cff23aa?w=1200&q=80`,
      `${IMG}/photo-1535132011086-b8818f016104?w=1200&q=80`,
    ],
  },
  {
    handle: 'pro-laser-rangefinder',
    title: 'ProSight Laser Rangefinder',
    price: 179.0,
    compareAt: 249.0,
    type: 'Electronics & Gadgets',
    collections: ['golf-electronics', 'best-sellers'],
    tags: ['best-seller', 'golf-electronics', 'rangefinder'],
    blurb:
      'Lock the flag in under a second with slope-adjusted yardages you can actually trust.',
    description:
      'Hesitation costs strokes. The ProSight locks onto the pin in under a second and pulses to confirm the lock, so you commit to the right club with confidence. Slope mode factors in elevation for true playing distance during practice, then switches off for tournament-legal rounds. Accurate to within one yard out to 800.',
    specs:
      'Range: 5–800 yds | Accuracy: ±1 yd | Magnification: 6x | Slope: On/off switchable | Battery: CR2 (included) | Water resistance: IPX4 | Includes: Magnetic case',
    images: [
      `${IMG}/photo-1535132011086-b8818f016104?w=1200&q=80`,
      `${IMG}/photo-1606166187734-a4cb74079037?w=1200&q=80`,
    ],
  },
  {
    handle: 'gps-golf-watch',
    title: 'FairwayGPS Smart Golf Watch',
    price: 229.0,
    compareAt: 299.0,
    type: 'Electronics & Gadgets',
    collections: ['golf-electronics', 'new-arrivals', 'best-sellers'],
    tags: ['new', 'best-seller', 'golf-electronics', 'gps'],
    blurb:
      '40,000+ preloaded courses and front/center/back yardages right on your wrist.',
    description:
      'Glance, swing, go. The FairwayGPS shows front, center, and back yardages plus hazard distances the moment you reach your ball — no phone, no waiting. Auto course recognition and shot tracking quietly record your round so you can see where you actually lose strokes. A full round on a single charge.',
    specs:
      'Courses: 40,000+ preloaded | Battery: 15 hrs GPS mode | Display: Sunlight-readable color touchscreen | Tracking: Auto shot detection | Water rating: 5 ATM | Sync: iOS & Android app',
    images: [
      `${IMG}/photo-1579586337278-3befd40fd17a?w=1200&q=80`,
      `${IMG}/photo-1508685096489-7aacd43bd3b1?w=1200&q=80`,
    ],
    options: [{ name: 'Band', values: ['Black', 'Green', 'White'] }],
  },
  {
    handle: 'performance-polo',
    title: 'Fairway Performance Polo',
    price: 49.0,
    compareAt: 65.0,
    type: 'Apparel',
    collections: ['golf-apparel', 'best-sellers'],
    tags: ['best-seller', 'golf-apparel', 'polo'],
    blurb:
      'Moisture-wicking, four-way stretch fabric that keeps you cool and swinging free.',
    description:
      'Look sharp on the first tee and stay comfortable through the 18th. This performance polo moves with your swing thanks to four-way stretch, while moisture-wicking fabric pulls sweat away so you stay dry and focused in the afternoon heat. A clean, tailored cut takes you from the course to the clubhouse without missing a beat.',
    specs:
      'Fabric: 92% polyester / 8% spandex | Features: Moisture-wicking, UPF 30, anti-odor | Fit: Tailored | Care: Machine wash cold',
    images: [
      `${IMG}/photo-1581655353564-df123a1eb820?w=1200&q=80`,
      `${IMG}/photo-1576566588028-4147f3842f27?w=1200&q=80`,
    ],
    options: [
      { name: 'Size', values: ['S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Color', values: ['White', 'Fairway Green', 'Navy'] },
    ],
  },
  {
    handle: 'all-weather-golf-glove',
    title: 'All-Weather Cabretta Golf Glove',
    price: 19.0,
    compareAt: 27.0,
    type: 'Accessories',
    collections: ['golf-accessories', 'best-sellers'],
    tags: ['best-seller', 'golf-accessories', 'glove'],
    blurb:
      'Premium cabretta leather grip that holds firm whether it’s dry, humid, or pouring.',
    description:
      'A slipping grip ruins good swings. This glove uses premium cabretta leather on the palm for a soft, tacky hold, with breathable mesh across the knuckles so your hand stays cool and connected to the club from the first hole to the last. Reinforced thumb and a secure closure mean it keeps its fit round after round.',
    specs:
      'Palm: Premium cabretta leather | Back: Breathable stretch mesh | Closure: Secure tab | Fit: Tour | Hand: Worn on left (right-handed golfer)',
    images: [
      `${IMG}/photo-1593766787879-e8c78e09cbbf?w=1200&q=80`,
      `${IMG}/photo-1535131749006-b7f58c99034b?w=1200&q=80`,
    ],
    options: [
      { name: 'Size', values: ['S', 'M', 'M/L', 'L', 'XL'] },
      { name: 'Hand', values: ['Left', 'Right'] },
    ],
  },
  {
    handle: 'tour-distance-golf-balls',
    title: 'Tour Distance Golf Balls (Dozen)',
    price: 29.0,
    compareAt: 42.0,
    type: 'Accessories',
    collections: ['golf-accessories', 'best-sellers'],
    tags: ['best-seller', 'golf-accessories', 'balls'],
    blurb:
      'Soft urethane cover for greenside spin, low-compression core for extra carry off the tee.',
    description:
      'Get tour-level performance without the tour-level price. A soft urethane cover bites and checks on approach shots, while the low-compression core launches high and long off the driver — so you gain distance without giving up control around the green. Consistent flight on every strike.',
    specs:
      'Construction: 3-piece | Cover: Soft urethane | Compression: 75 (mid-low) | Dimples: 338 | Quantity: 12 balls',
    images: [
      `${IMG}/photo-1591491653056-4313818a0186?w=1200&q=80`,
      `${IMG}/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80`,
    ],
  },
  {
    handle: 'magnetic-towel-set',
    title: 'Magnetic Microfiber Towel & Brush Set',
    price: 24.0,
    compareAt: 34.0,
    type: 'Accessories',
    collections: ['golf-accessories', 'golf-gifts', 'new-arrivals'],
    tags: ['new', 'golf-accessories', 'gift'],
    blurb:
      'A waffle-weave towel that snaps to your cart bar and a brush that clears every groove.',
    description:
      'Clean grooves mean more spin and better contact. This set pairs a plush waffle-weave microfiber towel — with a strong magnetic clasp that locks onto any cart rail or club — with a dual-sided brush and groove pick to clear mud and grass in seconds. No more digging through your bag for a towel that’s fallen to the bottom.',
    specs:
      'Towel: 16" x 16" waffle microfiber, magnetic clasp | Brush: Nylon + brass bristles, groove pick, retractable clip | Color options available',
    images: [
      `${IMG}/photo-1606166187734-a4cb74079037?w=1200&q=80`,
      `${IMG}/photo-1593766787879-e8c78e09cbbf?w=1200&q=80`,
    ],
    options: [{ name: 'Color', values: ['Green', 'Black', 'Grey'] }],
  },
  {
    handle: 'premium-leather-headcover-set',
    title: 'Premium Leather Headcover Set',
    price: 59.0,
    compareAt: 89.0,
    type: 'Accessories',
    collections: ['golf-accessories', 'golf-gifts'],
    tags: ['golf-accessories', 'gift', 'headcover'],
    blurb:
      'Protect your driver and woods in style with synthetic-leather covers built to last.',
    description:
      'Your clubs are an investment — dress them like one. This set of synthetic-leather headcovers shields your driver, fairway woods, and hybrid from dings and scratches in the bag, with numbered tags so you always grab the right one. A soft fleece lining keeps crowns scratch-free.',
    specs:
      'Set: Driver + 3W + 5W + Hybrid | Material: Durable synthetic leather, fleece lining | Numbered tags | Universal fit',
    images: [
      `${IMG}/photo-1592919505780-303950717480?w=1200&q=80`,
      `${IMG}/photo-1535131749006-b7f58c99034b?w=1200&q=80`,
    ],
  },
  {
    handle: 'impact-hitting-net',
    title: 'Backyard Impact Practice Net',
    price: 129.0,
    compareAt: 179.0,
    type: 'Training Aids',
    collections: ['training-aids', 'new-arrivals'],
    tags: ['new', 'training-aids', 'net'],
    blurb:
      'Pop-up driving net that lets you groove your swing at home in under two minutes.',
    description:
      'The fastest way to lower scores is more reps — and this net brings them to your backyard. A heavy-duty multi-layer net safely catches full driver swings, while the pop-up frame sets up in under two minutes and folds flat into the included carry bag. Pair it with a mat and a foam ball indoors, or real balls outside.',
    specs:
      'Size: 10ft x 7ft x 6ft | Net: 3-layer impact mesh | Frame: Fiberglass pop-up | Setup: <2 min | Includes: Carry bag, ground stakes',
    images: [
      `${IMG}/photo-1530028828-25e8270793c5?w=1200&q=80`,
      `${IMG}/photo-1587174486073-ae5e5cff23aa?w=1200&q=80`,
    ],
  },
  {
    handle: 'insulated-cart-cooler',
    title: 'Insulated 6-Can Cart Cooler Bag',
    price: 34.0,
    compareAt: 49.0,
    type: 'Accessories',
    collections: ['golf-accessories', 'golf-gifts'],
    tags: ['golf-accessories', 'gift', 'cooler'],
    blurb:
      'Keep six drinks cold for the full round and clip it right to your bag or cart.',
    description:
      'Hydration shouldn’t cost you a warm drink at the turn. This leak-proof, fully insulated cooler keeps six cans frosty for hours and clips securely to your push cart or golf bag. The slim profile slides into a bag pocket when empty.',
    specs:
      'Capacity: 6 cans | Insulation: Double-wall foam, leak-proof liner | Attachment: Carabiner + strap | Material: Water-resistant exterior',
    images: [
      `${IMG}/photo-1571902943202-507ec2618e8f?w=1200&q=80`,
      `${IMG}/photo-1606166187734-a4cb74079037?w=1200&q=80`,
    ],
    options: [{ name: 'Color', values: ['Green', 'Black'] }],
  },
  {
    handle: 'weatherproof-rain-jacket',
    title: 'StormShield Waterproof Golf Jacket',
    price: 89.0,
    compareAt: 129.0,
    type: 'Apparel',
    collections: ['golf-apparel', 'new-arrivals'],
    tags: ['new', 'golf-apparel', 'jacket'],
    blurb:
      'Fully waterproof yet whisper-quiet, with stretch panels that never restrict your swing.',
    description:
      'Bad weather is no excuse to skip a round. The StormShield seals out rain and wind with fully taped seams, yet its quiet, lightweight fabric and underarm stretch panels let you swing freely without the crinkle and drag of a stiff rain shell. Packs down small enough to live in your bag for the day it’s needed.',
    specs:
      'Waterproof rating: 10,000mm | Seams: Fully taped | Stretch: Underarm + back panels | Hood: Adjustable, removable | Packable',
    images: [
      `${IMG}/photo-1551488831-00ddcb6c6bd3?w=1200&q=80`,
      `${IMG}/photo-1576566588028-4147f3842f27?w=1200&q=80`,
    ],
    options: [
      { name: 'Size', values: ['S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Color', values: ['Black', 'Fairway Green'] },
    ],
  },
  {
    handle: 'divot-repair-tool-gift-box',
    title: 'Deluxe Divot Tool & Marker Gift Box',
    price: 27.0,
    compareAt: 39.0,
    type: 'Accessories',
    collections: ['golf-gifts', 'golf-accessories', 'best-sellers'],
    tags: ['best-seller', 'gift', 'golf-accessories'],
    blurb:
      'A presentation-boxed switchblade divot tool and magnetic ball markers — the easy gift for any golfer.',
    description:
      'Stuck on what to get the golfer in your life? This is the easy win. A satisfying switchblade-style divot tool, two magnetic ball markers, and a hat clip arrive in a clean presentation box ready to gift — practical enough that they’ll actually use it every round.',
    specs:
      'Includes: Switchblade divot tool, 2 magnetic markers, hat clip | Material: Zinc alloy | Packaging: Magnetic-close gift box',
    images: [
      `${IMG}/photo-1622396481328-9b1b78cdd9fd?w=1200&q=80`,
      `${IMG}/photo-1591491653056-4313818a0186?w=1200&q=80`,
    ],
  },
  {
    handle: 'pressure-putting-mat',
    title: 'Pro Practice Putting Mat',
    price: 69.0,
    compareAt: 99.0,
    type: 'Training Aids',
    collections: ['training-aids', 'golf-gifts'],
    tags: ['training-aids', 'gift', 'putting'],
    blurb:
      'A true-roll mat with auto-return and distance markers to drill putts at home all year.',
    description:
      'Winter, rain, or a busy week — your putting never has to take a break. This 9-foot mat rolls true like a real green, with alignment guides and distance markers to dial in pace and line, plus an auto-return ramp that sends made putts back to you so you stay in rhythm.',
    specs:
      'Length: 9 ft | Surface: True-roll turf | Features: Auto ball return, alignment guides, 2 cup sizes | Rolls up for storage',
    images: [
      `${IMG}/photo-1622396636133-ba43f812bc35?w=1200&q=80`,
      `${IMG}/photo-1530028828-25e8270793c5?w=1200&q=80`,
    ],
  },
];

const collectionMeta: Record<string, { title: string; description: string; image: string }> = {
  'golf-bags': {
    title: 'Golf Bags',
    description:
      'Cart bags, stand bags, and carry bags engineered to keep your clubs organized and your round effortless.',
    image: `${IMG}/photo-1535131749006-b7f58c99034b?w=1600&q=80`,
  },
  'training-aids': {
    title: 'Golf Training Aids',
    description:
      'Swing trainers, putting mats, alignment tools, and nets that turn practice into lower scores.',
    image: `${IMG}/photo-1587174486073-ae5e5cff23aa?w=1600&q=80`,
  },
  'golf-accessories': {
    title: 'Golf Accessories',
    description:
      'Gloves, balls, towels, headcovers, and the everyday gear that makes every round better.',
    image: `${IMG}/photo-1593766787879-e8c78e09cbbf?w=1600&q=80`,
  },
  'golf-apparel': {
    title: 'Golf Apparel',
    description:
      'Performance polos, jackets, and layers built to move with your swing and look sharp at the clubhouse.',
    image: `${IMG}/photo-1581655353564-df123a1eb820?w=1600&q=80`,
  },
  'golf-electronics': {
    title: 'Golf Electronics',
    description:
      'Rangefinders, GPS watches, and gadgets that give you the numbers to play your most confident golf.',
    image: `${IMG}/photo-1579586337278-3befd40fd17a?w=1600&q=80`,
  },
  'golf-gifts': {
    title: 'Golf Gifts',
    description:
      'Thoughtful, ready-to-give gifts for the golfer who has everything — from gift boxes to gadgets.',
    image: `${IMG}/photo-1622396481328-9b1b78cdd9fd?w=1600&q=80`,
  },
  'best-sellers': {
    title: 'Best Sellers',
    description:
      'The gear golfers buy again and again — our most loved products, ranked by you.',
    image: `${IMG}/photo-1535132011086-b8818f016104?w=1600&q=80`,
  },
  'new-arrivals': {
    title: 'New Arrivals',
    description:
      'Fresh drops and the latest additions to the GolfCarry.Store lineup.',
    image: `${IMG}/photo-1593111774240-d529f12cf4bb?w=1600&q=80`,
  },
};

function buildProduct(seed: Seed): Product {
  const options = seed.options ?? [];
  const price = money(seed.price);
  const compareAt = seed.compareAt ? money(seed.compareAt) : null;
  const available = seed.available ?? true;

  // Build a small variant matrix from the options (capped for the sample set).
  const optionValueLists = options.map((o) => o.values.slice(0, 3));
  const combos: { name: string; value: string }[][] = optionValueLists.length
    ? optionValueLists.reduce<{ name: string; value: string }[][]>(
        (acc, values, idx) => {
          const name = options[idx].name;
          const next: { name: string; value: string }[][] = [];
          for (const combo of acc) {
            for (const value of values) {
              next.push([...combo, { name, value }]);
            }
          }
          return next;
        },
        [[]],
      )
    : [[]];

  const variants = combos.map((selectedOptions, i) => ({
    id: `gid://shopify/ProductVariant/${seed.handle}-${i}`,
    title: selectedOptions.map((o) => o.value).join(' / ') || 'Default Title',
    availableForSale: available,
    selectedOptions,
    price,
    compareAtPrice: compareAt,
  }));

  const images = seed.images.map((url) => image(url, seed.title));

  const descriptionHtml = `
    <p>${seed.description}</p>
    <h3>What golfers love</h3>
    <ul>
      <li>${seed.blurb}</li>
      <li>Premium build quality at a fair, dropship-direct price.</li>
      <li>Backed by our 30-day easy returns and responsive support.</li>
    </ul>
    <h3>Specifications</h3>
    <p>${seed.specs}</p>
  `.trim();

  return {
    id: `gid://shopify/Product/${seed.handle}`,
    handle: seed.handle,
    availableForSale: available,
    title: seed.title,
    description: seed.description,
    descriptionHtml,
    options: options.map((o, i) => ({
      id: `gid://shopify/ProductOption/${seed.handle}-${i}`,
      name: o.name,
      values: o.values,
    })),
    priceRange: { maxVariantPrice: price, minVariantPrice: price },
    compareAtPriceRange: {
      maxVariantPrice: compareAt ?? price,
      minVariantPrice: compareAt ?? price,
    },
    variants,
    featuredImage: images[0],
    images,
    seo: {
      title: `${seed.title} | GolfCarry.Store`,
      description: seed.blurb,
    },
    tags: seed.tags,
    vendor: 'GolfCarry.Store',
    productType: seed.type,
    updatedAt: '2026-01-01T00:00:00Z',
  };
}

export const sampleProducts: Product[] = seeds.map(buildProduct);

const seedByHandle = new Map(seeds.map((s) => [s.handle, s]));

export function sampleCollectionsForProduct(handle: string): string[] {
  return seedByHandle.get(handle)?.collections ?? [];
}

export const sampleCollections: Collection[] = Object.entries(collectionMeta).map(
  ([handle, meta]) => ({
    handle,
    title: meta.title,
    description: meta.description,
    seo: { title: `${meta.title} | GolfCarry.Store`, description: meta.description },
    image: image(meta.image, meta.title),
    updatedAt: '2026-01-01T00:00:00Z',
    path: `/collections/${handle}`,
  }),
);

export function sampleProductsForCollection(handle: string): Product[] {
  if (handle === 'all') return sampleProducts;
  return sampleProducts.filter((p) =>
    sampleCollectionsForProduct(p.handle).includes(handle),
  );
}
