import { SITE } from './constants';

export type PolicySection = { heading?: string; body: string[] };
export type Policy = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: PolicySection[];
};

const updated = 'May 1, 2026';

export const POLICIES: Record<string, Policy> = {
  shipping: {
    slug: 'shipping',
    title: 'Shipping Policy',
    description: `How and when ${SITE.name} ships your order.`,
    updated,
    sections: [
      {
        body: [
          `At ${SITE.name}, we want your gear in your hands as quickly as possible. This policy explains our processing times, shipping methods, and what to expect after you place an order.`,
        ],
      },
      {
        heading: 'Order processing',
        body: [
          'Orders are processed within 1–2 business days (Monday–Friday, excluding holidays). You’ll receive an order confirmation email immediately, and a separate shipping confirmation with tracking once your order leaves our facility.',
        ],
      },
      {
        heading: 'Shipping rates & delivery times',
        body: [
          `Free standard shipping on all US orders over $${SITE.freeShippingThreshold}. Orders below that threshold are charged a flat shipping rate calculated at checkout.`,
          'Standard delivery within the United States typically takes 3–7 business days after processing. Delivery times are estimates and may vary during peak periods or due to carrier delays.',
        ],
      },
      {
        heading: 'International shipping',
        body: [
          'We ship to select international destinations, shown at checkout when available. International orders may be subject to customs duties, taxes, and fees determined by the destination country, which are the responsibility of the recipient.',
        ],
      },
      {
        heading: 'Tracking your order',
        body: [
          'As soon as your order ships, we’ll email you a tracking link. You can also use our Track Order page at any time to check the latest status.',
        ],
      },
      {
        heading: 'Questions?',
        body: [
          `Email us at ${SITE.supportEmail} and we’ll be happy to help with anything shipping-related.`,
        ],
      },
    ],
  },
  returns: {
    slug: 'returns',
    title: 'Return & Refund Policy',
    description: `${SITE.name}'s 30-day easy returns and refund process.`,
    updated,
    sections: [
      {
        body: [
          'We want you to love your gear. If something isn’t right, our 30-day return policy makes it easy to send it back.',
        ],
      },
      {
        heading: '30-day returns',
        body: [
          'You may return most unused items in their original packaging within 30 days of delivery for a full refund of the product price. Items must be in resalable condition — unworn, unwashed, and with any tags or protective materials intact.',
        ],
      },
      {
        heading: 'How to start a return',
        body: [
          `To begin, email ${SITE.supportEmail} with your order number and the item(s) you’d like to return. We’ll reply with a prepaid return label and simple instructions.`,
        ],
      },
      {
        heading: 'Refunds',
        body: [
          'Once we receive and inspect your return, we’ll process your refund to the original payment method within 3–5 business days. Your bank or card issuer may take additional time to post the refund.',
          'Original shipping charges (if any) are non-refundable unless the return is due to our error or a defective product.',
        ],
      },
      {
        heading: 'Damaged or defective items',
        body: [
          `If your item arrives damaged or defective, contact us within 7 days of delivery at ${SITE.supportEmail} with photos, and we’ll arrange a free replacement or full refund right away.`,
        ],
      },
      {
        heading: 'Non-returnable items',
        body: [
          'For hygiene and safety reasons, certain items (such as used gloves or opened consumables) may not be eligible for return. Any such exceptions are noted on the product page.',
        ],
      },
    ],
  },
  privacy: {
    slug: 'privacy',
    title: 'Privacy Policy',
    description: `How ${SITE.name} collects, uses, and protects your information.`,
    updated,
    sections: [
      {
        body: [
          `This Privacy Policy describes how ${SITE.name} ("we", "us") collects, uses, and shares your personal information when you visit or make a purchase from our website.`,
        ],
      },
      {
        heading: 'Information we collect',
        body: [
          'When you visit the site, we automatically collect certain information about your device, including your web browser, IP address, time zone, and some cookies installed on your device.',
          'When you make a purchase, we collect information such as your name, billing and shipping address, payment information, and email address. We refer to this as "Order Information".',
        ],
      },
      {
        heading: 'How we use your information',
        body: [
          'We use Order Information to fulfill orders, process payments, arrange shipping, and provide order confirmations. We use it to communicate with you, screen orders for potential risk or fraud, and — when aligned with your preferences — provide information or advertising relating to our products.',
        ],
      },
      {
        heading: 'Payment processing',
        body: [
          'Payments are processed securely through Shopify’s PCI-DSS compliant checkout. We do not store your full payment card details on our servers.',
        ],
      },
      {
        heading: 'Sharing your information',
        body: [
          'We share your information with service providers who help us run our store (such as our ecommerce platform, payment processors, shipping carriers, and analytics providers) solely to provide their services to us. We may also share information to comply with applicable laws and regulations.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          `Depending on where you live, you may have the right to access, correct, or delete the personal information we hold about you. To exercise these rights, contact us at ${SITE.supportEmail}.`,
        ],
      },
      {
        heading: 'Changes',
        body: [
          'We may update this Privacy Policy from time to time to reflect changes to our practices or for operational, legal, or regulatory reasons.',
        ],
      },
    ],
  },
  terms: {
    slug: 'terms',
    title: 'Terms of Service',
    description: `The terms governing your use of ${SITE.name}.`,
    updated,
    sections: [
      {
        body: [
          `By accessing and using ${SITE.name}, you agree to be bound by these Terms of Service. Please read them carefully.`,
        ],
      },
      {
        heading: 'Use of the site',
        body: [
          'You agree to use the site only for lawful purposes and in a way that does not infringe the rights of, or restrict the use and enjoyment of the site by, any third party. You must be at least the age of majority in your jurisdiction to make a purchase.',
        ],
      },
      {
        heading: 'Products & pricing',
        body: [
          'We strive to display products and prices accurately, but errors may occur. We reserve the right to correct any errors and to change or update information, or to cancel orders, at any time without prior notice. All prices are shown in US dollars unless otherwise stated.',
        ],
      },
      {
        heading: 'Orders',
        body: [
          'We reserve the right to refuse or cancel any order for reasons including product availability, errors in product or pricing information, or suspected fraud. If we cancel an order after payment, we will issue a full refund.',
        ],
      },
      {
        heading: 'Intellectual property',
        body: [
          `All content on this site — including text, graphics, logos, and images — is the property of ${SITE.name} or its content suppliers and is protected by applicable intellectual property laws.`,
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of the site or products purchased through it.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          `Questions about these Terms can be sent to ${SITE.supportEmail}.`,
        ],
      },
    ],
  },
};

export const POLICY_SLUGS = Object.keys(POLICIES);
