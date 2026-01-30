/**
 * SEO utility functions and constants for Lety's Buko Pie website
 *
 * Features:
 * - Environment-aware configuration
 * - Dynamic meta tag generation
 * - Social media optimization
 * - Structured data helpers
 */

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

export interface SocialMeta {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  og?: SocialMeta;
  twitter?: SocialMeta;
}

/**
 * Base URL for the website
 * Uses environment variable or falls back to production URL
 */
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://letysbukopie.com';

/**
 * Social media handles from environment
 */
export const SOCIAL_HANDLES = {
  facebook: import.meta.env.VITE_FACEBOOK_PAGE_ID || 'letysbukopie',
  instagram: import.meta.env.VITE_INSTAGRAM_HANDLE || 'letysbukopie',
  twitter: import.meta.env.VITE_TWITTER_HANDLE || 'letysbukopie'
};

/**
 * Business information from environment
 */
export const BUSINESS_INFO = {
  phone: import.meta.env.VITE_BUSINESS_PHONE || '+63-917-123-4567',
  email: import.meta.env.VITE_BUSINESS_EMAIL || 'hello@letysbukopie.com',
  foundingYear: import.meta.env.VITE_BUSINESS_FOUNDING_YEAR || '1997',
  priceRange: import.meta.env.VITE_BUSINESS_PRICE_RANGE || '$$'
};

/**
 * Default SEO metadata
 */
export const DEFAULT_META = {
  title: "Lety's Buko Pie - The Best Buko Pie in Laguna",
  description: "Experience the authentic taste of Lety's Buko Pie! Freshly baked buko pie, pineapple pie, and Filipino pasalubong treats. Visit our stores in Los Baños and Laguna.",
  keywords: [
    'buko pie',
    'Lety\'s Buko Pie',
    'Laguna buko pie',
    'Los Baños buko pie',
    'Filipino pie',
    'pasalubong',
    'Philippine delicacy',
    'baked goods',
    'pineapple pie',
    'Filipino desserts'
  ],
  og: {
    title: "Lety's Buko Pie - The Best Buko Pie in Laguna",
    description: "Experience the authentic taste of Lety's Buko Pie! Freshly baked buko pie, pineapple pie, and Filipino pasalubong treats.",
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL
  },
  twitter: {
    title: "Lety's Buko Pie - The Best Buko Pie in Laguna",
    description: "Experience the authentic taste of Lety's Buko Pie! Freshly baked buko pie, pineapple pie, and Filipino pasalubong treats.",
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL
  }
};

/**
 * Page-specific SEO metadata
 */
export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: "Lety's Buko Pie - The Best Buko Pie in Laguna Since 1997",
    description: "Experience the authentic taste of Lety's Buko Pie! Freshly baked buko pie, pineapple pie, and Filipino pasalubong treats. Visit our stores in Los Baños and Laguna.",
    keywords: [
      'buko pie',
      'Lety\'s Buko Pie',
      'Laguna buko pie',
      'Los Baños buko pie',
      'best buko pie',
      'original buko pie'
    ],
    canonical: SITE_URL,
    og: {
      title: "Lety's Buko Pie - Home of the Authentic Buko Pie",
      description: "Taste the legacy! Lety's Buko Pie has been serving the best buko pie in Laguna since 1997. Visit us today!",
      image: `${SITE_URL}/og-home.jpg`,
      url: SITE_URL
    }
  },
  products: {
    title: "Our Products - Buko Pie, Pineapple Pie & Filipino Delicacies",
    description: "Discover our delicious selection of freshly baked goods including our famous buko pie, pineapple pie, cassava cake, and traditional Filipino pasalubong treats.",
    keywords: [
      'buko pie products',
      'pineapple pie',
      'cassava cake',
      'Filipino baked goods',
      'pasalubong treats',
      'Lety\'s products'
    ],
    canonical: `${SITE_URL}/products`,
    og: {
      title: "Our Products - Fresh from Lety's Buko Pie",
      description: "From our famous buko pie to traditional Filipino delicacies, explore our complete selection of freshly baked treats.",
      image: `${SITE_URL}/og-products.jpg`,
      url: `${SITE_URL}/products`
    }
  },
  availability: {
    title: "Store Inventory & Product Availability - Lety's Buko Pie",
    description: "Check real-time product availability across all Lety's Buko Pie locations. See which products are in stock at our Main Store, Shell Branch, Agapita Branch, and Pansol Branch.",
    keywords: [
      'product availability',
      'store inventory',
      'buko pie stock',
      'in stock',
      'product checker'
    ],
    canonical: `${SITE_URL}/availability`,
    og: {
      title: "Check Product Availability at Lety's Buko Pie",
      description: "See what's available at our stores in real-time. Check stock levels for buko pie, pineapple pie, and more.",
      url: `${SITE_URL}/availability`
    }
  },
  locations: {
    title: "Our Locations - Visit Lety's Buko Pie in Laguna",
    description: "Find Lety's Buko Pie stores near you! Visit our Main Store, Shell Branch, Agapita Branch, or Pansol Branch in Los Baños and Laguna. Open daily from 6AM to 6PM.",
    keywords: [
      'buko pie near me',
      'Lety\'s locations',
      'Los Baños bakery',
      'Laguna bakery',
      'buko pie store',
      'bakery near me'
    ],
    canonical: `${SITE_URL}/locations`,
    og: {
      title: "Visit Lety's Buko Pie - Find a Store Near You",
      description: "Four convenient locations in Los Baños and Laguna. Fresh buko pie daily from 6AM to 6PM.",
      url: `${SITE_URL}/locations`
    }
  },
  faq: {
    title: "Frequently Asked Questions - Lety's Buko Pie",
    description: "Find answers to common questions about Lety's Buko Pie. Learn about our products, store hours, delivery options, bulk orders, and catering services.",
    keywords: [
      'buko pie FAQ',
      'Lety\'s Buko Pie questions',
      'buko pie delivery',
      'bulk order buko pie',
      'catering services'
    ],
    canonical: `${SITE_URL}/faq`,
    og: {
      title: "FAQ - Lety's Buko Pie",
      description: "Got questions about Lety's Buko Pie? Find answers about our products, locations, ordering, and more.",
      url: `${SITE_URL}/faq`
    }
  },
  contact: {
    title: "Contact Us - Lety's Buko Pie",
    description: "Get in touch with Lety's Buko Pie! Send us a message, email us at hello@letysbukopie.com, or chat with us on Facebook Messenger. We'd love to hear from you.",
    keywords: [
      'contact Lety\'s Buko Pie',
      'Lety\'s Buko Pie email',
      'customer service',
      'buko pie inquiry'
    ],
    canonical: `${SITE_URL}/contact`,
    og: {
      title: "Contact Lety's Buko Pie",
      description: "Have questions or feedback? Contact Lety's Buko Pie via email, Facebook Messenger, or visit our stores.",
      url: `${SITE_URL}/contact`
    }
  }
};

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(pageMeta: PageMeta): MetaTag[] {
  const tags: MetaTag[] = [];

  // Basic meta tags
  tags.push({ name: 'title', content: pageMeta.title });
  tags.push({ name: 'description', content: pageMeta.description });

  if (pageMeta.keywords && pageMeta.keywords.length > 0) {
    tags.push({ name: 'keywords', content: pageMeta.keywords.join(', ') });
  }

  // Open Graph tags
  if (pageMeta.og) {
    tags.push({ property: 'og:title', content: pageMeta.og.title });
    tags.push({ property: 'og:description', content: pageMeta.og.description });
    tags.push({ property: 'og:type', content: 'website' });
    if (pageMeta.og.url) {
      tags.push({ property: 'og:url', content: pageMeta.og.url });
    }
    if (pageMeta.og.image) {
      tags.push({ property: 'og:image', content: pageMeta.og.image });
      tags.push({ property: 'og:image:alt', content: pageMeta.og.title });
    }
  }

  // Twitter Card tags
  if (pageMeta.twitter) {
    tags.push({ name: 'twitter:card', content: 'summary_large_image' });
    tags.push({ name: 'twitter:site', content: `@${SOCIAL_HANDLES.twitter}` });
    tags.push({ name: 'twitter:creator', content: `@${SOCIAL_HANDLES.twitter}` });
    tags.push({ name: 'twitter:title', content: pageMeta.twitter.title });
    tags.push({ name: 'twitter:description', content: pageMeta.twitter.description });
    if (pageMeta.twitter.image) {
      tags.push({ name: 'twitter:image', content: pageMeta.twitter.image });
    }
  }

  return tags;
}

/**
 * Get page meta with fallback to defaults
 */
export function getPageMeta(pageKey: string): PageMeta {
  return PAGE_META[pageKey] || DEFAULT_META;
}

/**
 * Format address for structured data
 */
export function formatAddressForSD(address: string[]): string {
  return address.join(', ');
}

/**
 * Convert hours to Schema.org opening hours format
 */
export function formatOpeningHoursForSD(
  hours: Record<string, [string, string]>
): string[] {
  const dayMap: Record<string, string> = {
    mon: 'Mo',
    tue: 'Tu',
    wed: 'We',
    thu: 'Th',
    fri: 'Fr',
    sat: 'Sa',
    sun: 'Su'
  };

  const result: string[] = [];

  // Check if all days have the same hours
  const allHours = Object.entries(hours);
  const firstHours = allHours[0][1];
  const allSame = allHours.every(([, h]) => h[0] === firstHours[0] && h[1] === firstHours[1]);

  if (allSame) {
    result.push(`Mo-Su ${firstHours[0]}-${firstHours[1]}`);
  } else {
    Object.entries(hours).forEach(([day, [open, close]]) => {
      const dayCode = dayMap[day];
      if (dayCode) {
        result.push(`${dayCode} ${open}-${close}`);
      }
    });
  }

  return result;
}
