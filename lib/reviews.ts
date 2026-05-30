// Sample customer reviews for social proof. When you install a reviews app
// (Judge.me / Loox / Okendo — see README), swap these for the app's widget;
// the layout and schema markup are already wired for real reviews.

export type Review = {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  product?: string;
  photo?: string;
  verified: boolean;
};

const IMG = 'https://images.unsplash.com';

export const featuredReviews: Review[] = [
  {
    id: 'r1',
    name: 'Marcus T.',
    location: 'Scottsdale, AZ',
    rating: 5,
    title: 'Best cart bag I’ve owned',
    body: 'The 14-way top is a game changer — no more digging for the right club. Quality feels way above the price. Shipping was quick too.',
    date: '2026-04-18',
    product: 'TourPro 14-Way Cart Bag',
    photo: `${IMG}/photo-1535131749006-b7f58c99034b?w=600&q=80`,
    verified: true,
  },
  {
    id: 'r2',
    name: 'Jennifer K.',
    location: 'Charlotte, NC',
    rating: 5,
    title: 'Knocked 4 strokes off my putting',
    body: 'I use the alignment mirror every morning for 10 minutes. My setup is finally consistent and I’m draining the short ones. Worth every penny.',
    date: '2026-04-02',
    product: 'Precision Putting Alignment Mirror',
    photo: `${IMG}/photo-1622396636133-ba43f812bc35?w=600&q=80`,
    verified: true,
  },
  {
    id: 'r3',
    name: 'Dave R.',
    location: 'Portland, OR',
    rating: 5,
    title: 'Rangefinder locks instantly',
    body: 'Locks the flag in a split second and the slope mode is spot on. Feels like a $400 unit. Customer service answered my question same day.',
    date: '2026-03-21',
    product: 'ProSight Laser Rangefinder',
    verified: true,
  },
  {
    id: 'r4',
    name: 'Priya S.',
    location: 'Austin, TX',
    rating: 4.5,
    title: 'Love the polo — so comfortable',
    body: 'Breathable, stretchy, and looks sharp at the clubhouse after. Fit runs true to size. Already ordered two more colors.',
    date: '2026-03-09',
    product: 'Fairway Performance Polo',
    photo: `${IMG}/photo-1581655353564-df123a1eb820?w=600&q=80`,
    verified: true,
  },
  {
    id: 'r5',
    name: 'Tom B.',
    location: 'Naperville, IL',
    rating: 5,
    title: 'Perfect gift for my dad',
    body: 'The divot tool gift box arrived beautifully packaged. My dad actually uses it every round now and brags about it to his buddies.',
    date: '2026-02-26',
    product: 'Deluxe Divot Tool & Marker Gift Box',
    verified: true,
  },
  {
    id: 'r6',
    name: 'Alyssa M.',
    location: 'Tampa, FL',
    rating: 5,
    title: 'GPS watch is a must-have',
    body: 'Front/center/back yardages right on my wrist, no phone needed. Battery easily lasts a full round. Setup took two minutes.',
    date: '2026-02-11',
    product: 'FairwayGPS Smart Golf Watch',
    photo: `${IMG}/photo-1579586337278-3befd40fd17a?w=600&q=80`,
    verified: true,
  },
];

export const reviewStats = {
  average: 4.8,
  total: 12473,
  distribution: [
    { stars: 5, percent: 84 },
    { stars: 4, percent: 12 },
    { stars: 3, percent: 3 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ],
};
