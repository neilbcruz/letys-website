// src/components/ui/SkeletonCard.tsx
import { cn } from '@/lib/utils';

/**
 * Props for SkeletonCard component
 *
 * @interface SkeletonCardProps
 * @property {string} [className] - Optional additional CSS classes
 */
interface SkeletonCardProps {
  className?: string;
}

/**
 * Skeleton loading placeholder for card components
 *
 * Displays an animated placeholder that mimics the structure of a card
 * while content is loading. Provides visual feedback during data fetching.
 *
 * @component
 * @param {SkeletonCardProps} props - Component props
 * @returns {JSX.Element} Animated card skeleton
 *
 * @example
 * ```typescript
 * {loading ? (
 *   <SkeletonCard />
 * ) : (
 *   <ProductCard product={product} />
 * )}
 * ```
 *
 * @accessibility
 * - Uses aria-busy pattern (should be added by parent)
 * - Screen readers will announce loading state
 * - Animation provides visual feedback
 * - Should be replaced with actual content when loaded
 */
export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn('animate-pulse card-elevated', className)}>
      <div className="h-48 bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="w-1/4 h-4 bg-gray-200 rounded" />
        <div className="w-3/4 h-6 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="w-5/6 h-4 bg-gray-200 rounded" />
        <div className="flex gap-2 mt-4">
          <div className="w-24 h-8 bg-gray-200 rounded" />
          <div className="flex-1 h-8 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}