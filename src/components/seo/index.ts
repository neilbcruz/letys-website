/**
 * SEO Components Export
 * Centralized export for all SEO-related components
 *
 * Exports:
 * - SEO Head components (page-level meta tags)
 * - Google Analytics components (GA4 integration)
 * - Structured Data components (JSON-LD schemas)
 * - Event Tracking hooks and components
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
export { default as SEOHead, ProductSEOHead, LocationSEOHead } from './SEOHead';

// Google Analytics Components
export {
  default as GoogleAnalytics,
  GoogleAnalyticsProvider,
  PageViewTracker,
  EventTracker,
  useGoogleAnalytics,
  withProductViewTracking,
  useContactFormTracking
} from './GoogleAnalytics';

// Event Tracking Hooks
export {
  useTrackClick,
  withClickTracking,
  useTrackNavigation,
  useTrackSearch,
  useTrackFilter,
  useTrackSocial,
  useTrackVideo,
  useTrackDownload,
  useTrackError,
  useTrackScrollDepth
} from './EventTracker';

// SEO Constants and Configuration
export * from './SEOConstants';
