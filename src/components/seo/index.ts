/**
 * SEO Components Export
 * Centralized export for all SEO-related components
 *
 * Exports:
 * - SEO Head components (page-level meta tags)
 * - Google Analytics components (GA4 integration)
 * - Structured Data components (JSON-LD schemas)
 * - SEO Constants and configuration
 */

// Structured Data Components
export { default as StructuredData } from './StructuredData';
export {
  LocalBusinessSchema,
  ProductsSchema,
  FAQSchema,
  LocationSchema
} from './StructuredData';

// SEO Head Components
export { default as SEOHead } from './SEOHead';

// Google Analytics Components
export {
  default as GoogleAnalytics,
  useGoogleAnalytics
} from './GoogleAnalytics';

// SEO Constants and Configuration
export * from './SEOConstants';
