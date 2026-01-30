// src/components/ui/SkeletonCard.tsx
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

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