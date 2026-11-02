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
export { default as EmptyState } from './EmptyState';
export { default as ErrorState, InlineErrorState } from './ErrorState';
export { default as CallToAction, ContactCTA, InventoryCTA } from './CallToAction';
export { default as InfoBanner } from './InfoBanner';

// Re-export HeroBanner for convenience (actual implementation in @/components/ui/HeroBanner)
export { default as HeroBanner } from '@/components/ui/HeroBanner';
