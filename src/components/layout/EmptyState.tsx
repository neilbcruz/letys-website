import { Package, type LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
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
  secondaryAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`py-20 text-center ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      <Icon className="mx-auto mb-4 w-16 h-16 text-fg-faint" aria-hidden="true" />
      <h2 className="mb-2 text-2xl font-bold text-fg-base">{title}</h2>
      <p className="mb-6 max-w-md mx-auto text-fg-muted">{description}</p>
      <div className="flex flex-col gap-3 items-center justify-center">
        {action && (
          <button
            onClick={action.onClick}
            className={`btn-${action.variant || 'primary'}`}
            aria-label={action.label}
          >
            {action.label}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="text-brand font-semibold hover:text-accent-fg transition-colors underline"
            aria-label={secondaryAction.label}
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}

