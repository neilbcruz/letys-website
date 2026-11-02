import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface InfoBannerProps {
  icon?: LucideIcon;
  title?: string;
  children: ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'primary' | 'gray';
  className?: string;
  ariaLabel?: string;
}

/**
 * InfoBanner - A consistent info banner component with icon
 *
 * Variants:
 * - info: Blue styling for general information
 * - warning: Yellow/amber styling for warnings
 * - success: Green styling for success messages
 * - primary: Primary theme colors
 * - gray: Neutral gray styling
 */
export default function InfoBanner({
  icon: Icon,
  title,
  children,
  variant = 'info',
  className = '',
  ariaLabel,
}: InfoBannerProps) {
  const variantStyles = {
    info: 'bg-status-info-bg border-status-info-border text-status-info-fg',
    warning: 'bg-status-warning-bg border-status-warning-border text-status-warning-fg',
    success: 'bg-status-success-bg border-status-success-border text-status-success-fg-strong',
    primary: 'bg-brand-muted/10 border-brand-muted/30 text-brand',
    gray: 'bg-surface-subtle border-stroke-default text-fg-base',
  };

  const iconMap: Record<string, LucideIcon> = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    primary: Info,
    gray: Info,
  };

  const BannerIcon = Icon || iconMap[variant];

  return (
    <div
      className={`flex gap-4 items-start p-4 rounded-lg border ${variantStyles[variant]} ${className}`.trim()}
      role="alert"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <BannerIcon className="mt-1 shrink-0" size={24} aria-hidden="true" />
      <div className="flex-1">
        {title && <h3 className="mb-1 text-lg font-bold">{title}</h3>}
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}

