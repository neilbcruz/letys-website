import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SegmentedControlOption {
  label: string;
  value: string;
  icon?: ReactNode;
  ariaLabel?: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  className?: string;
}

export default function SegmentedControl({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: SegmentedControlProps) {
  return (
    <div
      className={cn(
        'inline-flex flex-wrap justify-center gap-1 rounded-lg border border-stroke-default bg-surface-subtle p-1',
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      {options.map(option => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
              isSelected
                ? 'ui-chip-selected'
                : 'ui-chip hover:text-brand'
            )}
            aria-pressed={isSelected}
            aria-label={option.ariaLabel || option.label}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
