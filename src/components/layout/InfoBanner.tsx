import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Info, AlertTriangle, CheckCircle, Store, Package } from 'lucide-react';

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

/**
 * Pre-configured banners for common use cases
 */
interface StoreInfoBannerProps {
  name: string;
  address: string[];
  hours: string;
  mapLink: string;
  specialNotes?: string[];
  className?: string;
}

export function StoreInfoBanner({
  name,
  address,
  hours,
  mapLink,
  specialNotes,
  className = '',
}: StoreInfoBannerProps) {
  return (
    <>
      <InfoBanner icon={Store} title={name} variant="primary" className={className}>
        <p className="text-sm text-fg-base">
          {address[0]} {address[1]}
        </p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-fg-muted">
          <span className="flex gap-1 items-center">
            <span className="font-medium">Hours:</span> {hours}
          </span>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline rounded text-brand hover:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand"
          >
            Get Directions →
          </a>
        </div>
      </InfoBanner>
      {specialNotes && specialNotes.length > 0 && (
        <InfoBanner variant="warning" className="mt-4">
          <p className="text-sm text-status-warning-fg-strong">
            <span className="font-medium">Note:</span> {specialNotes.join('; ')}
          </p>
        </InfoBanner>
      )}
    </>
  );
}

interface InventorySummaryProps {
  inStock: number;
  lowStock: number;
  outOfStock: number;
  onViewFullInventory?: () => void;
  className?: string;
}

export function InventorySummary({
  inStock,
  lowStock,
  outOfStock,
  onViewFullInventory,
  className = '',
}: InventorySummaryProps) {
  return (
    <InfoBanner icon={Package} title="Main Products Status" variant="primary" className={className}>
      <div className="grid grid-cols-3 gap-2 text-sm text-center">
        <div className="p-2 bg-surface-base rounded">
          <div className="font-bold text-status-success-fg">{inStock}</div>
          <div className="text-fg-muted">In Stock</div>
        </div>
        <div className="p-2 bg-surface-base rounded">
          <div className="font-bold text-status-warning-fg">{lowStock}</div>
          <div className="text-fg-muted">Low Stock</div>
        </div>
        <div className="p-2 bg-surface-base rounded">
          <div className="font-bold text-status-error-fg">{outOfStock}</div>
          <div className="text-fg-muted">Out</div>
        </div>
      </div>
      {onViewFullInventory && (
        <div className="mt-3 text-center">
          <button
            onClick={onViewFullInventory}
            className="text-sm underline text-brand hover:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand"
          >
            View Full Inventory →
          </button>
        </div>
      )}
    </InfoBanner>
  );
}

interface NoteBannerProps {
  children: ReactNode;
  className?: string;
}

export function NoteBanner({ children, className = '' }: NoteBannerProps) {
  return (
    <InfoBanner variant="gray" className={className}>
      <p className="text-sm text-fg-base">
        <span className="font-medium">Note:</span> {children}
      </p>
    </InfoBanner>
  );
}

/**
 * CompactBanner - A smaller, more compact banner variant
 */
interface CompactBannerProps {
  icon?: LucideIcon;
  children: ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'primary' | 'gray';
  className?: string;
}

export function CompactBanner({
  icon: Icon,
  children,
  variant = 'info',
  className = '',
}: CompactBannerProps) {
  const variantStyles = {
    info: 'bg-status-info-bg border-status-info-border text-status-info-fg',
    warning: 'bg-status-warning-bg border-status-warning-border text-status-warning-fg',
    success: 'bg-status-success-bg border-status-success-border text-status-success-fg-strong',
    primary: 'bg-brand-muted/10 border-brand-muted/30 text-brand',
    gray: 'bg-surface-subtle border-stroke-default text-fg-base',
  };

  return (
    <div
      className={`flex gap-2 items-center p-3 text-sm rounded-lg border ${variantStyles[variant]} ${className}`.trim()}
      role="status"
    >
      {Icon && <Icon size={16} className="shrink-0" aria-hidden="true" />}
      <span className="flex-1">{children}</span>
    </div>
  );
}
