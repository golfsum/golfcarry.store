export const FAQ_GROUPS: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: 'Shipping & Delivery',
    items: [
      {
        q: 'How long will my order take to arrive?',
        a: 'Orders are processed within 1–2 business days. Standard shipping then takes 3–7 business days within the US. You’ll get a tracking link by email the moment your order ships.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes — shipping is free on all US orders over $75. Orders under $75 have a flat shipping rate shown at checkout.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'We currently ship within the United States, with select international destinations available at checkout. International delivery times and duties vary by country.',
      },
      {
        q: 'How do I track my order?',
        a: 'Use the tracking link in your shipping confirmation email, or visit our Track Order page and enter your order number and email.',
      },
    ],
  },
  {
    heading: 'Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer 30-day easy returns. If an item is unused and in its original packaging, you can return it within 30 days of delivery for a full refund.',
      },
      {
        q: 'How do I start a return?',
        a: 'Head to our Returns & Refunds page or email our support team with your order number. We’ll send you a prepaid return label and instructions.',
      },
      {
        q: 'When will I get my refund?',
        a: 'Once we receive your returned item, refunds are processed within 3–5 business days to your original payment method.',
      },
    ],
  },
  {
    heading: 'Orders & Payment',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Shop Pay, Apple Pay, Google Pay, PayPal, and all major credit and debit cards. Checkout is fully encrypted and secure.',
      },
      {
        q: 'Can I change or cancel my order?',
        a: 'Contact us as soon as possible. If your order hasn’t shipped yet, we’ll do our best to update or cancel it.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes. All payments are processed through Shopify’s PCI-compliant, 256-bit encrypted checkout. We never see or store your card details.',
      },
    ],
  },
  {
    heading: 'Products',
    items: [
      {
        q: 'Are your products authentic and high quality?',
        a: 'Every product in our catalog is hand-picked and tested by golfers. We stand behind the quality of everything we sell with our 30-day guarantee.',
      },
      {
        q: 'How do I choose the right size or option?',
        a: 'Each product page lists available sizes and options along with detailed specifications. If you’re unsure, reach out and we’ll help you choose.',
      },
    ],
  },
];

export const ALL_FAQS = FAQ_GROUPS.flatMap((g) => g.items);
