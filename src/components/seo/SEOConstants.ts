/**
 * SEO Constants and Configuration
 * Centralized SEO-related constants for easy maintenance
 */

export const SEO_CONFIG = {
  // Site Information
  siteName: "Lety's Buko Pie",
  siteUrl: 'https://letysbukopie.com',
  domain: 'letysbukopie.com',

  // Business Information
  business: {
    name: "Lety's Buko Pie",
    type: 'Bakery',
    foundingDate: '1997',
    foundingLocation: 'Los Baños, Laguna',
    priceRange: '$$',
    cuisine: 'Filipino',

    // Contact
    phone: '+63-917-123-4567',
    email: 'hello@letysbukopie.com',

    // Social Media
    social: {
      facebook: 'https://www.facebook.com/letysbukopie',
      instagram: 'https://www.instagram.com/letysbukopie',
      twitter: 'https://twitter.com/letysbukopie'
    }
  },

  // Location
  geo: {
    region: 'PH-LAG',
    placename: 'Los Baños, Laguna',
    country: 'PH',
    postalCode: '4030',
    province: 'Laguna',
    cities: ['Los Baños', 'Calamba']
  },

  // SEO Default Values
  defaults: {
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
    image: '/og-image.jpg',
    twitterHandle: '@letysbukopie'
  },

  // Analytics
  analytics: {
    ga4MeasurementId: 'G-XXXXXXXXXX', // Replace with actual ID
    gtmId: 'GTM-XXXXXX', // Replace with actual GTM ID if using GTM
    enableInDevelopment: false
  },

  // Open Graph Defaults
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: "Lety's Buko Pie",
    defaultImage: '/og-image.jpg',
    defaultImageWidth: 1200,
    defaultImageHeight: 630,
    defaultImageAlt: "Lety's Buko Pie - Authentic Filipino Buko Pie"
  },

  // Twitter Card Defaults
  twitterCard: {
    cardType: 'summary_large_image',
    site: '@letysbukopie',
    creator: '@letysbukopie',
    defaultImage: '/og-image.jpg'
  },

  // Organization Schema
  organization: {
    name: "Lety's Buko Pie",
    url: 'https://letysbukopie.com',
    logo: 'https://letysbukopie.com/logo.jpg',
    description: "Authentic Filipino buko pie and baked goods since 1997. Famous for our delicious buko pie, pineapple pie, and traditional pasalubong treats.",
    foundingDate: '1997',
    areaServed: ['Laguna', 'Los Baños', 'Calamba'],
    address: {
      streetAddress: 'National Road, Barangay Anos',
      addressLocality: 'Los Baños',
      addressRegion: 'Laguna',
      postalCode: '4030',
      addressCountry: 'PH'
    }
  }
} as const;

/**
 * Event categories for Google Analytics
 */
export const EVENT_CATEGORIES = {
  ENGAGEMENT: 'engagement',
  NAVIGATION: 'navigation',
  COMMERCE: 'commerce',
  SEARCH: 'search',
  SOCIAL: 'social',
  ERROR: 'error',
  VIDEO: 'video',
  DOWNLOAD: 'download'
} as const;

/**
 * Common event actions
 */
export const EVENT_ACTIONS = {
  // Engagement
  CLICK: 'click',
  TAP: 'tap',
  SCROLL: 'scroll',
  VIEW: 'view',

  // Commerce
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',

  // Search
  SEARCH: 'search',
  FILTER: 'filter',
  SORT: 'sort',

  // Social
  SHARE: 'share',
  LIKE: 'like',
  FOLLOW: 'follow',

  // Content
  READ_MORE: 'read_more',
  EXPAND: 'expand',
  COLLAPSE: 'collapse'
} as const;

/**
 * Page view tracking configuration
 */
export const PAGE_VIEW_CONFIG = {
  trackInitialPageView: true,
  trackRouteChanges: true,
  respectDoNotTrack: true,
  anonymizeIp: true
} as const;

/**
 * Error tracking configuration
 */
export const ERROR_TRACKING_CONFIG = {
  trackConsoleErrors: true,
  trackUnhandledRejections: true,
  trackNetworkErrors: true,
  includeStackTrace: true
} as const;

/**
 * Performance tracking configuration
 */
export const PERFORMANCE_TRACKING_CONFIG = {
  trackCoreWebVitals: true,
  trackResourceTiming: false,
  trackUserTiming: true,
  sampleRate: 0.1 // 10% sampling
} as const;

/**
 * Structured data types
 */
export const SCHEMA_TYPES = {
  LOCAL_BUSINESS: 'LocalBusiness',
  BAKERY: 'Bakery',
  PRODUCT: 'Product',
  FAQ_PAGE: 'FAQPage',
  ORGANIZATION: 'Organization',
  PLACE: 'Place',
  POSTAL_ADDRESS: 'PostalAddress',
  GEO_COORDINATES: 'GeoCoordinates',
  OPENING_HOURS_SPECIFICATION: 'OpeningHoursSpecification'
} as const;

/**
 * Breadcrumb levels
 */
export const BREADCRUMB_LEVELS = {
  HOME: 1,
  CATEGORY: 2,
  SUBCATEGORY: 3,
  PRODUCT: 4
} as const;

/**
 * Image optimization presets
 */
export const IMAGE_PRESETS = {
  og: {
    width: 1200,
    height: 630,
    quality: 90,
    format: 'jpg'
  },
  twitter: {
    width: 1200,
    height: 600,
    quality: 90,
    format: 'jpg'
  },
  product: {
    width: 800,
    height: 800,
    quality: 85,
    format: 'webp'
  },
  thumbnail: {
    width: 400,
    height: 400,
    quality: 80,
    format: 'webp'
  }
} as const;

/**
 * Sitemap configuration
 */
export const SITEMAP_CONFIG = {
  defaultChangefreq: 'weekly' as const,
  defaultPriority: 0.8,
  includeImages: true,
  gzip: false,
  outputPath: './public/sitemap.xml'
} as const;

/**
 * Robots.txt configuration
 */
export const ROBOTS_CONFIG = {
  allowAll: true,
  disallowPaths: [
    '/admin/',
    '/private/',
    '/api/'
  ],
  allowedBots: [
    'Googlebot',
    'Bingbot',
    'facebookexternalhit',
    'Twitterbot'
  ],
  disallowedBots: [
    'AhrefsBot',
    'SemrushBot',
    'MJ12bot'
  ],
  crawlDelay: 1,
  sitemapUrl: 'https://letysbukopie.com/sitemap.xml'
} as const;
