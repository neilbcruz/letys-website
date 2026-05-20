import type { LucideIcon } from 'lucide-react';

interface CTAButton {
  label: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
}

interface CallToActionProps {
  title: string;
  description?: string;
  buttons: CTAButton[];
  icon?: LucideIcon;
  iconSize?: number;
  align?: 'center' | 'left' | 'right';
  className?: string;
  variant?: 'default' | 'compact';
}

/**
 * CallToAction - A standardized CTA section component
 *
 * Features:
 * - Flexible alignment (center, left, right)
 * - Optional icon
 * - Single or multiple buttons
 * - Two layout variants
 */
export default function CallToAction({
  title,
  description,
  buttons,
  icon: Icon,
  iconSize = 48,
  align = 'center',
  className = '',
  variant = 'default',
}: CallToActionProps) {
  const alignClasses = {
    center: 'text-center',
    left: 'text-left',
    right: 'text-right',
  };

  const buttonAlignClasses = {
    center: 'justify-center',
    left: 'justify-start',
    right: 'justify-end',
  };

  const baseClasses = variant === 'default'
    ? `container-width ${alignClasses[align]}`
    : alignClasses[align];

  return (
    <div className={`${baseClasses} ${className}`.trim()}>
      {variant === 'default' ? (
        // Full-width CTA
        <>
          {Icon && (
            <div className="mb-6">
              <Icon className="mx-auto text-brand" size={iconSize} aria-hidden="true" />
            </div>
          )}
          <h2 className="mb-4 heading-primary">{title}</h2>
          {description && <p className="mx-auto mb-8 max-w-2xl text-xl text-fg-base">{description}</p>}
          <div className={`flex flex-col gap-4 sm:flex-row ${buttonAlignClasses[align]}`}>
            {buttons.map((btn, index) => (
              <CTAButton key={index} {...btn} />
            ))}
          </div>
        </>
      ) : (
        // Compact CTA
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 heading-secondary">{title}</h2>
          {description && <p className="mb-6 text-lg text-fg-muted">{description}</p>}
          <div className={`flex flex-col gap-3 sm:flex-row ${buttonAlignClasses[align]}`}>
            {buttons.map((btn, index) => (
              <CTAButton key={index} {...btn} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * CTAButton - Internal button renderer for CTA
 */
function CTAButton({ label, onClick, href, variant = 'primary' }: CTAButton) {
  const baseClasses = `text-lg btn-${variant}`;

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {label}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses} aria-label={label}>
      {label}
    </button>
  );
}

/**
 * Pre-configured CTAs for common use cases
 */
export function ContactCTA({ className = '' }: { className?: string }) {
  return (
    <CallToAction
      title="Still have questions?"
      description="Our team is here to help! Send us a message and we'll get back to you as soon as possible."
      buttons={[
        { label: 'Email Us', href: 'mailto:hello@letysbukopie.com', variant: 'primary' },
        { label: 'Visit Our Stores', href: '/locations', variant: 'secondary' },
      ]}
      className={className}
    />
  );
}

export function InventoryCTA({ className = '' }: { className?: string }) {
  return (
    <CallToAction
      title="Can't decide which store to visit?"
      description="Compare inventory across all our locations to find exactly what you're looking for"
      buttons={[
        { label: 'Compare All Stores', href: '/availability', variant: 'primary' },
        { label: 'Browse Inventory', href: '/products', variant: 'secondary' },
      ]}
      className={className}
    />
  );
}

export function ProductsCTA({ className = '' }: { className?: string }) {
  return (
    <CallToAction
      title="Explore Our Products"
      description="Discover our delicious selection of buko pies and other treats"
      buttons={[
        { label: 'View All Products', href: '/products', variant: 'primary' },
        { label: 'Check Availability', href: '/availability', variant: 'secondary' },
      ]}
      className={className}
    />
  );
}
