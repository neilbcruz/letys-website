/**
 * Layout Components Index
 *
 * Export all layout components for convenient importing
 */

export { default as PageHeader } from './PageHeader';
export { default as PageFooter } from './PageFooter';
export { default as ModalMenu } from './ModalMenu';

// New reusable components
export { default as PageSection, PageSectionContent, PageSectionGrid } from './PageSection';
export { default as EmptyState, NoProductsFound, NoSearchResults, NoDataAvailable, EmptyStateCard } from './EmptyState';
export { default as ErrorState, LoadError, NetworkError, InlineErrorState } from './ErrorState';
export { default as CallToAction, ContactCTA, InventoryCTA, ProductsCTA } from './CallToAction';
export {
  default as InfoBanner,
  StoreInfoBanner,
  InventorySummary,
  NoteBanner,
  CompactBanner,
} from './InfoBanner';

// Re-export HeroBanner for convenience (actual implementation in @/components/ui/HeroBanner)
export { default as HeroBanner } from '@/components/ui/HeroBanner';
