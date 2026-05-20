import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Card container component
 *
 * @remarks
 * The Card component provides a consistent container for content with
 * optional hover effects for interactive elements.
 *
 * @example
 * ```tsx
 * <Card hoverable>
 *   <CardHeader>
 *     <h2>Card Title</h2>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 * </Card>
 * ```
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Content to display inside the card */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether the card should have hover elevation effect */
  hoverable?: boolean;
}

const Card = ({
  children,
  className,
  hoverable = false,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        'bg-surface-base rounded-lg border border-stroke-default shadow-xs overflow-hidden',
        hoverable && 'transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-brand-muted hover:shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const CardHeader = ({ children, className, ...props }: CardHeaderProps) => {
  return (
    <div
      className={cn(
        'p-[var(--space-4)] md:p-[var(--space-6)] border-b border-stroke-default',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const CardContent = ({ children, className, ...props }: CardContentProps) => {
  return (
    <div
      className={cn('p-[var(--space-4)] md:p-[var(--space-6)]', className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const CardFooter = ({ children, className, ...props }: CardFooterProps) => {
  return (
    <div
      className={cn(
        'p-[var(--space-4)] md:p-[var(--space-6)] border-t border-stroke-default bg-surface-subtle',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const CardImage = ({ className, ...props }: CardImageProps) => {
  return (
    <div className='relative w-full h-48 overflow-hidden'>
      <img
        className={cn('w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-[1.03]', className)}
        {...props}
        alt={props.alt || 'Card image'}
      />
    </div>
  );
};

export { Card, CardHeader, CardContent, CardFooter, CardImage };
