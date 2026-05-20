import type { ReactNode } from 'react';

interface PageSectionProps {
  children: ReactNode;
  variant?: 'default' | 'white' | 'gray' | 'primary-light' | 'gradient' | 'gradient-alt';
  className?: string;
  id?: string;
  role?: string;
  ariaLabel?: string;
}

/**
 * PageSection - A standardized section container component
 *
 * Variants:
 * - default: No background (transparent)
 * - white: White background
 * - gray: surface-subtle background
 * - primary-light: primary-3/10 background with border
 * - gradient: bg-linear-to-br from-brand-muted/20 to-primary-1/10
 * - gradient-alt: from-surface-base to-surface-subtle bg-linear-to-b
 */
export default function PageSection({
  children,
  variant = 'default',
  className = '',
  id,
  role,
  ariaLabel,
}: PageSectionProps) {
  const variantClasses = {
    default: '',
    white: 'bg-surface-base',
    gray: 'bg-surface-subtle',
    'primary-light': 'bg-brand-muted/10 border-y border-brand-muted/30',
    gradient: 'bg-linear-to-br from-brand-muted/20 to-primary-1/10',
    'gradient-alt': 'from-surface-base to-surface-subtle bg-linear-to-b',
  };

  return (
    <section
      id={id}
      className={`section-padding ${variantClasses[variant]} ${className}`.trim()}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </section>
  );
}

/**
 * PageSectionContent - Inner container with consistent padding
 */
export function PageSectionContent({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`container-width ${className}`.trim()}>{children}</div>;
}

/**
 * PageSectionGrid - Standardized grid layout for page content
 */
export function PageSectionGrid({
  children,
  className = '',
  cols = 1,
}: {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
}) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[cols]} gap-8 ${className}`.trim()}>
      {children}
    </div>
  );
}
