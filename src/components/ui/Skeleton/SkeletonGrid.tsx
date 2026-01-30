// src/components/ui/SkeletonGrid.tsx
import { SkeletonCard } from './SkeletonCard';

interface SkeletonGridProps {
  count?: number;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export function SkeletonGrid({ 
  count = 8,
  columns = { mobile: 1, tablet: 2, desktop: 4 }
}: SkeletonGridProps) {
  return (
    <div className={`grid gap-8 grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}