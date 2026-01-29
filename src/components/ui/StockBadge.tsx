// src/components/ui/StockBadge.tsx
import { getStockStatus, type StockDetails } from '@/services/graphql';
import { cn } from '@/lib/utils';

interface StockBadgeProps {
  stockDetails: StockDetails;
  className?: string;
  showQuantity?: boolean;
}

export default function StockBadge({
  stockDetails,
  className,
  showQuantity = true,
}: StockBadgeProps) {
  const { label, color } = getStockStatus(stockDetails);

  return (
    <span
      className={cn(
        'inline-flex justify-center items-center px-3 py-1 text-sm font-bold rounded-full',
        'min-w-[120px]', // Fixed minimum width to prevent jitter
        'transition-colors duration-200', // Smooth color transitions
        color,
        className
      )}
      role="status"
      aria-label={`Stock status: ${label}`}
    >
      {showQuantity ? label : label.split('(')[0].trim()}
    </span>
  );
}