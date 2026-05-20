// src/components/ui/Button.tsx - WCAG AA Compliant
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Icon Sizing Pattern:
 * Match icon size to text line-height for alignment
 * - text-base (16px, ~26px leading) → w-6 h-6
 * - text-lg (18px, ~29px leading) → w-7 h-7
 * - text-xl (20px, ~32px leading) → w-8 h-8
 */

/**
 * Props for the Button component
 *
 * @remarks
 * Extends standard HTML button attributes for full customization while
 * maintaining accessibility and consistency.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Submit
 * </Button>
 * ```
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content to display inside the button */
  children: ReactNode;
  /** Visual style variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  /** Size of the button (affects padding and text size) */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button should take full width of its container */
  fullWidth?: boolean;
  /** Shows loading state with spinner and disables interaction */
  isLoading?: boolean;
  /** Icon to display on the left side of the button text */
  leftIcon?: ReactNode;
  /** Icon to display on the right side of the button text */
  rightIcon?: ReactNode;
  /** Custom aria-label for accessibility (overrides default) */
  ariaLabel?: string;
}

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ariaLabel,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: [
      'bg-brand',
      'text-fg-inverse',
      'hover:bg-brand-muted',
      'hover:text-fg-inverse',
      'active:scale-95',
      'focus:ring-brand',
    ].join(' '),

    secondary: [
      'border-2',
      'border-brand',
      'bg-surface-base',
      'text-brand',
      'hover:bg-support-2',
      'hover:text-brand',
      'active:scale-95',
      'focus:ring-brand',
    ].join(' '),

    outline: [
      'bg-transparent',
      'border-2',
      'border-brand',
      'text-brand',
      'hover:bg-brand',
      'hover:text-fg-inverse',
      'active:scale-95',
      'focus:ring-brand',
    ].join(' '),

    ghost: [
      'bg-transparent',
      'text-brand',
      'hover:bg-support-2',
      'active:scale-95',
      'focus:ring-brand',
    ].join(' '),

    link: [
      'bg-transparent',
      'text-brand',
      'hover:underline',
      'active:scale-95',
      'underline-offset-4',
      'decoration-2',
      'p-0',
      'h-auto',
      'min-h-0',
      'focus:ring-2',
    ].join(' '),
  };

  // Updated sizes to meet WCAG 2.5.5 (Target Size - 44x44px minimum)
  const sizes = {
    sm: 'text-sm px-6 py-2 min-h-[44px] min-w-[44px]', // Ensure both dimensions
    md: 'text-base px-8 py-3 min-h-[48px] min-w-[48px]',
    lg: 'text-lg px-10 py-4 min-h-[52px] min-w-[52px]',
  };

  const isDisabled = disabled || isLoading;

  // Compute accessible label
  const computedAriaLabel = ariaLabel || (
    isLoading ? `Loading: ${children}` : undefined
  );

  return (
    <button
      className={cn(
        'group inline-flex items-center justify-center rounded-md font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none',
        'focus:outline-hidden focus:ring-4 focus:ring-offset-2',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        variant !== 'link' && 'shadow-sm',
        className
      )}
      disabled={isDisabled}
      aria-label={computedAriaLabel}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <>
          <svg
            className='mr-2 -ml-1 w-4 h-4 text-current animate-spin'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            aria-hidden="true"
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
          <span className="sr-only">Loading</span>
        </>
      )}
      {!isLoading && leftIcon && (
        <span className='mr-2 transition-transform duration-200 ease-out group-hover:-translate-x-0.5 motion-reduce:transition-none' aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {children}
      {!isLoading && rightIcon && (
        <span className='ml-2 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none' aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
