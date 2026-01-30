// src/components/ui/LoadingSpinner.tsx
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

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
    <div className="flex flex-col justify-center items-center py-20" role="status">
      <div
        className={cn(
          'inline-block rounded-full border-4 border-gray-300 animate-spin border-t-primary-2',
          sizes[size],
          className
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
      <p className="mt-4 text-gray-600" aria-live="polite">
        {label}
      </p>
    </div>
  );
}