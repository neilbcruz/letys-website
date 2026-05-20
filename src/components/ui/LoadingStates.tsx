// src/components/ui/LoadingStates.tsx
import { cn } from '@/lib/utils';

// ============================================================================
// Base Skeleton Component
// ============================================================================

interface BaseSkeletonProps {
  className?: string;
  ariaLabel?: string;
}

/**
 * Base skeleton component that provides shared animation and styling
 *
 * @component
 * @param {BaseSkeletonProps} props - Component props
 * @returns {JSX.Element} Animated skeleton element
 */
function BaseSkeleton({ className, ariaLabel }: BaseSkeletonProps) {
  return (
    <div
      className={cn('bg-surface-emphasis rounded animate-pulse', className)}
      aria-hidden="true"
      aria-label={ariaLabel}
    />
  );
}

// ============================================================================
// Loading Card
// ============================================================================

/**
 * Props for LoadingCard component
 *
 * @interface LoadingCardProps
 * @property {string} [className] - Optional additional CSS classes
 */
interface LoadingCardProps {
  className?: string;
}

/**
 * Loading placeholder for card components
 *
 * Displays an animated placeholder that mimics the structure of a card
 * while content is loading. Provides visual feedback during data fetching.
 *
 * @component
 * @param {LoadingCardProps} props - Component props
 * @returns {JSX.Element} Animated card skeleton
 *
 * @example
 * ```typescript
 * {loading ? (
 *   <LoadingCard />
 * ) : (
 *   <ProductCard product={product} />
 * )}
 * ```
 *
 * @accessibility
 * - Use aria-busy pattern in parent container
 * - Screen readers will announce loading state
 * - Animation provides visual feedback
 * - Should be replaced with actual content when loaded
 */
export function LoadingCard({ className }: LoadingCardProps) {
  return (
    <div className={cn('animate-pulse card-elevated', className)}>
      <div className="h-48 bg-surface-emphasis" />
      <div className="p-6 space-y-3">
        <BaseSkeleton className="w-1/4 h-4" />
        <BaseSkeleton className="w-3/4 h-6" />
        <BaseSkeleton className="h-4" />
        <BaseSkeleton className="w-5/6 h-4" />
        <div className="flex gap-2 mt-4">
          <BaseSkeleton className="w-24 h-8" />
          <BaseSkeleton className="flex-1 h-8" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Loading Grid
// ============================================================================

/**
 * Props for LoadingGrid component
 *
 * @interface LoadingGridProps
 * @property {number} [count] - Number of skeleton cards to display
 * @property {object} [columns] - Responsive column configuration
 */
interface LoadingGridProps {
  count?: number;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

/**
 * Loading placeholder for grid layouts
 *
 * Displays multiple loading cards in a responsive grid layout.
 * Useful for product grids, image galleries, or card-based layouts.
 *
 * @component
 * @param {LoadingGridProps} props - Component props
 * @returns {JSX.Element} Grid of animated card skeletons
 *
 * @example
 * ```typescript
 * {loading ? (
 *   <LoadingGrid count={8} />
 * ) : (
 *   <ProductGrid products={products} />
 * )}
 * ```
 */
export function LoadingGrid({
  count = 8,
  columns = { mobile: 1, tablet: 2, desktop: 4 }
}: LoadingGridProps) {
  return (
    <div
      className={cn(
        'grid gap-8',
        `grid-cols-${columns.mobile}`,
        `sm:grid-cols-${columns.tablet}`,
        `lg:grid-cols-${columns.desktop}`
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
      <span className="sr-only">Loading content...</span>
    </div>
  );
}

// ============================================================================
// Loading Text
// ============================================================================

/**
 * Props for LoadingText component
 *
 * @interface LoadingTextProps
 * @property {number} [lines] - Number of skeleton lines to display
 * @property {string} [className] - Optional additional CSS classes
 */
interface LoadingTextProps {
  lines?: number;
  className?: string;
}

/**
 * Loading placeholder for text content
 *
 * Displays animated skeleton lines that mimic text while content is loading.
 * The last line is shorter by default to create a more natural appearance.
 *
 * @component
 * @param {LoadingTextProps} props - Component props
 * @returns {JSX.Element} Animated text skeleton
 *
 * @example
 * ```typescript
 * {loading ? (
 *   <LoadingText lines={4} />
 * ) : (
 *   <p>{text}</p>
 * )}
 * ```
 */
export function LoadingText({ lines = 3, className }: LoadingTextProps) {
  return (
    <div className={cn('space-y-3', className)} role="status" aria-live="polite" aria-busy="true">
      {Array.from({ length: lines }).map((_, i) => (
        <BaseSkeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
      <span className="sr-only">Loading text...</span>
    </div>
  );
}

// ============================================================================
// Loading Table
// ============================================================================

/**
 * Props for LoadingTable component
 *
 * @interface LoadingTableProps
 * @property {number} [rows] - Number of skeleton rows to display
 * @property {number} [columns] - Number of skeleton columns to display
 */
interface LoadingTableProps {
  rows?: number;
  columns?: number;
}

/**
 * Loading placeholder for table content
 *
 * Displays an animated skeleton table with header and rows.
 * Useful for data tables, lists, or tabular information.
 *
 * @component
 * @param {LoadingTableProps} props - Component props
 * @returns {JSX.Element} Animated table skeleton
 *
 * @example
 * ```typescript
 * {loading ? (
 *   <LoadingTable rows={5} columns={4} />
 * ) : (
 *   <DataTable data={data} />
 * )}
 * ```
 */
export function LoadingTable({ rows = 5, columns = 4 }: LoadingTableProps) {
  return (
    <div
      className="overflow-hidden bg-surface-base rounded-lg shadow"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Header */}
      <div className="px-6 py-4 bg-surface-muted">
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, i) => (
            <BaseSkeleton key={i} className="h-6" />
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-stroke-default">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
              {Array.from({ length: columns }).map((_, colIndex) => (
                <BaseSkeleton key={colIndex} className="h-4" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Loading table data...</span>
    </div>
  );
}

// ============================================================================
// Loading Spinner
// ============================================================================

/**
 * Props for LoadingSpinner component
 *
 * @interface LoadingSpinnerProps
 * @property {'sm' | 'md' | 'lg'} [size] - Size of the spinner
 * @property {string} [className] - Optional additional CSS classes
 * @property {string} [label] - Accessibility label for the spinner
 */
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

/**
 * Classic loading spinner with accessibility support
 *
 * Displays an animated spinning circle with a loading message.
 * Provides visual and screen reader feedback during loading operations.
 *
 * @component
 * @param {LoadingSpinnerProps} props - Component props
 * @returns {JSX.Element} Animated loading spinner
 *
 * @example
 * ```typescript
 * {loading && (
 *   <LoadingSpinner size="lg" label="Loading products..." />
 * )}
 * ```
 *
 * @accessibility
 * - Uses role="status" for proper screen reader announcement
 * - Includes sr-only text for screen reader users
 * - aria-live region for dynamic content announcement
 * - Visual loading message for sighted users
 */
export function LoadingSpinner({
  size = 'md',
  className,
  label = 'Loading...'
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div
      className="flex flex-col justify-center items-center py-20"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={cn(
          'inline-block rounded-full border-4 border-stroke-emphasis animate-spin border-t-brand',
          sizes[size],
          className
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
      <p className="mt-4 text-fg-muted" aria-live="polite">
        {label}
      </p>
    </div>
  );
}

// ============================================================================
// Legacy Exports (for backward compatibility)
// ============================================================================

/**
 * @deprecated Use LoadingCard instead
 */
export const SkeletonCard = LoadingCard;

/**
 * @deprecated Use LoadingGrid instead
 */
export const SkeletonGrid = LoadingGrid;

/**
 * @deprecated Use LoadingText instead
 */
export const SkeletonText = LoadingText;

/**
 * @deprecated Use LoadingTable instead
 */
export const SkeletonTable = LoadingTable;
