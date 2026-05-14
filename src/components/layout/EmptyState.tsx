import { Package, Search, XCircle, type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  className?: string;
}

/**
 * EmptyState - A consistent empty state component
 *
 * Predefined icons available: Package, Search, XCircle, or pass your own
 */
export default function EmptyState({
  icon: Icon = Package,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`py-20 text-center ${className}`.trim()}>
      <Icon className="mx-auto mb-4 w-16 h-16 text-fg-faint" aria-hidden="true" />
      <h2 className="mb-2 text-2xl font-bold text-fg-base">{title}</h2>
      <p className="mb-6 max-w-md mx-auto text-fg-muted">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className={`btn-${action.variant || 'primary'}`}
          aria-label={action.label}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

/**
 * Pre-configured empty states for common use cases
 */
export function NoProductsFound({
  onClearFilters,
  hasFilters = false,
}: {
  onClearFilters?: () => void;
  hasFilters?: boolean;
}) {
  return (
    <EmptyState
      icon={Package}
      title="No Products Found"
      description={
        hasFilters
          ? 'Try adjusting your filters or search terms.'
          : 'No products available at the moment.'
      }
      action={
        hasFilters && onClearFilters
          ? { label: 'Clear All Filters', onClick: onClearFilters, variant: 'secondary' }
          : undefined
      }
    />
  );
}

export function NoSearchResults({ onClear }: { onClear: () => void }) {
  return (
    <EmptyState
      icon={Search}
      title="No Results Found"
      description="Try adjusting your search terms or filters."
      action={{ label: 'Clear Search', onClick: onClear, variant: 'secondary' }}
    />
  );
}

export function NoDataAvailable({ message }: { message?: string }) {
  return (
    <EmptyState
      icon={XCircle}
      title="No Data Available"
      description={message || 'No data is currently available for this section.'}
    />
  );
}

/**
 * EmptyStateCard - A card-style empty state for smaller areas
 */
interface EmptyStateCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function EmptyStateCard({
  icon: Icon = Package,
  title,
  description,
  className = '',
}: EmptyStateCardProps) {
  return (
    <div className={`p-8 text-center bg-surface-subtle rounded-lg border border-stroke-default ${className}`.trim()}>
      <Icon className="mx-auto mb-3 w-12 h-12 text-fg-faint" aria-hidden="true" />
      <h3 className="mb-2 text-lg font-bold text-fg-base">{title}</h3>
      <p className="text-sm text-fg-muted">{description}</p>
    </div>
  );
}
