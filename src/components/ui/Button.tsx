// src/components/ui/Button.tsx - WCAG AA Compliant
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
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
      // Updated colors for WCAG AA compliance
      'bg-[color:var(--color-primary-2)]', // Dark green
      'text-white',
      'hover:bg-[color:var(--color-primary-3)]', // Darker light green
      'hover:text-white',
      'focus:ring-[color:var(--color-primary-1)]',
    ].join(' '),

    secondary: [
      // Updated for better contrast
      'bg-[color:var(--color-primary-1)]', // Darker gold
      'text-white',
      'hover:bg-[color:var(--color-primary-2)]',
      'hover:text-white',
      'focus:ring-[color:var(--color-primary-3)]',
    ].join(' '),

    outline: [
      'bg-transparent',
      'border-2', // Thicker border for visibility
      'border-[color:var(--color-primary-2)]',
      'text-[color:var(--color-primary-2)]',
      'hover:bg-[color:var(--color-primary-2)]',
      'hover:text-white',
      'focus:ring-[color:var(--color-primary-1)]',
    ].join(' '),

    ghost: [
      'bg-transparent',
      'text-[color:var(--color-primary-2)]',
      'hover:bg-[color:var(--color-support-2)]',
      'focus:ring-[color:var(--color-primary-1)]',
    ].join(' '),

    link: [
      'bg-transparent',
      'text-[color:var(--color-primary-2)]',
      'hover:underline',
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
    sm: 'text-sm px-4 py-2.5 min-h-[44px]',
    md: 'text-base px-5 py-3 min-h-[48px]',
    lg: 'text-lg px-7 py-4 min-h-[52px]',
  };

  const isDisabled = disabled || isLoading;

  // Compute accessible label
  const computedAriaLabel = ariaLabel || (
    isLoading ? `Loading: ${children}` : undefined
  );

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
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
        <span className='mr-2' aria-hidden="true">
          {leftIcon}
        </span>
      )}
      {children}
      {!isLoading && rightIcon && (
        <span className='ml-2' aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;