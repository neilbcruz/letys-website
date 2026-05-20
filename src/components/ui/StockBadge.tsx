// src/components/ui/StockBadge.tsx
import { getStockStatus, type StockDetails } from '@/services/graphql';
import { cn } from '@/lib/utils';

/**
 * Props for the StockBadge component
 *
 * @interface StockBadgeProps
 * @property {StockDetails} stockDetails - Object containing quantity and minimum threshold
 * @property {string} [className] - Optional additional CSS classes
 * @property {boolean} [showQuantity=true] - Whether to show exact quantity in label
 */
interface StockBadgeProps {
  stockDetails: StockDetails;
  className?: string;
  showQuantity?: boolean;
}

/**
 * StockBadge component for displaying product stock status
 *
 * Shows a colored badge indicating whether a product is in stock, low stock,
 * or out of stock. Automatically calculates status based on quantity and
 * minimum threshold values.
 *
 * @component
 * @param {StockBadgeProps} props - Component props
 * @returns {JSX.Element} Styled badge with stock status
 *
 * @example
 * ```typescript
 * <StockBadge stockDetails={{ qty: 15, min: 5 }} />
 * // Renders: Green badge with "In Stock (15)"
 *
 * <StockBadge stockDetails={{ qty: 3, min: 5 }} />
 * // Renders: Yellow badge with "Low Stock (3 left)"
 *
 * <StockBadge stockDetails={{ qty: 0, min: 5 }} />
 * // Renders: Red badge with "Out of Stock"
 *
 * <StockBadge
 *   stockDetails={{ qty: 15, min: 5 }}
 *   showQuantity={false}
 * />
 * // Renders: Green badge with "In Stock" (no quantity)
 * ```
 *
 * @accessibility
 * - Uses role="status" for screen reader announcements
 * - Includes aria-label for context
 * - Color coding provides visual indication with text fallback
 */
export default function StockBadge({
  stockDetails,
  className,
  showQuantity = true,
}: StockBadgeProps) {
  const { label, status } = getStockStatus(stockDetails);

  return (
    <span
      className={cn(
        'stock-badge inline-flex justify-center items-center px-3 py-1 text-sm font-bold rounded-full',
        'min-w-[120px]', // Fixed minimum width to prevent jitter
        'transition-colors duration-200', // Smooth color transitions
        'min-h-[28px]', // WCAG 2.5.5 - Minimum touch target size
        className
      )}
      data-status={status}
      role="status"
      aria-label={`Stock status: ${label}`}
    >
      {showQuantity ? label : label.split('(')[0].trim()}
    </span>
  );
}
