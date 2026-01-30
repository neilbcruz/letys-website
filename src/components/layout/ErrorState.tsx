import { AlertCircle, AlertTriangle, type LucideIcon } from 'lucide-react';

interface ErrorStateProps {
  icon?: LucideIcon;
  title: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  variant?: 'error' | 'warning';
  className?: string;
}

/**
 * ErrorState - A consistent error state component
 *
 * Variants:
 * - error: Red styling for critical errors
 * - warning: Yellow styling for non-critical errors/warnings
 */
export default function ErrorState({
  icon: Icon = AlertCircle,
  title,
  message,
  onRetry,
  retryLabel = 'Try Again',
  variant = 'error',
  className = '',
}: ErrorStateProps) {
  const variantStyles = {
    error: {
      container: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600',
      titleColor: 'text-red-800',
      messageColor: 'text-red-700',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-800',
      messageColor: 'text-yellow-700',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`mx-auto max-w-2xl ${className}`.trim()}
      role="alert"
      aria-live="polite"
    >
      <div
        className={`p-8 text-center rounded-lg border-2 ${styles.container}`}
      >
        <Icon
          className={`mx-auto mb-4 w-12 h-12 ${styles.iconColor}`}
          aria-hidden="true"
        />
        <h2 className={`mb-2 text-xl font-bold ${styles.titleColor}`}>{title}</h2>
        <p className={`mb-6 ${styles.messageColor}`}>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn-primary" aria-label={retryLabel}>
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Pre-configured error states for common use cases
 */
export function LoadError({
  message = 'Failed to load data. Please check your connection and try again.',
  onRetry,
}: {
  message?: string;
  onRetry: () => void;
}) {
  return (
    <ErrorState
      title="Failed to Load"
      message={message}
      onRetry={onRetry}
      variant="error"
    />
  );
}

export function NetworkError({ onRetry }: { onRetry: () => void }) {
  return (
    <ErrorState
      icon={AlertTriangle}
      title="Connection Error"
      message="Unable to reach the server. Please check your internet connection and try again."
      onRetry={onRetry}
      variant="error"
    />
  );
}

/**
 * InlineErrorState - A smaller inline error banner
 */
interface InlineErrorStateProps {
  message: string;
  onDismiss?: () => void;
  variant?: 'error' | 'warning';
  className?: string;
}

export function InlineErrorState({
  message,
  onDismiss,
  variant = 'error',
  className = '',
}: InlineErrorStateProps) {
  const Icon = variant === 'error' ? AlertCircle : AlertTriangle;
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  };

  return (
    <div
      className={`p-4 mb-6 rounded-lg border-2 ${styles[variant]} ${className}`.trim()}
      role="alert"
      aria-live="polite"
    >
      <div className="flex gap-3 items-start">
        <Icon className="mt-0.5 shrink-0" size={20} aria-hidden="true" />
        <p className="flex-1 text-sm font-medium">{message}</p>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="shrink-0 underline hover:opacity-70"
            aria-label="Dismiss error"
          >
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
