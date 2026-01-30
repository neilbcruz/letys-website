// src/components/ui/SearchInput.tsx - UPDATED WITH ARIA IMPROVEMENTS
import { SearchIcon, XIcon } from 'lucide-react';
import type {
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { useState, useId } from 'react';
import { cn } from '@/lib/utils';

interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  onSearch?: (value: string) => void;
  className?: string;
  placeholder?: string;
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  clearable?: boolean;
  ariaLabel?: string;
}

const SearchInput = ({
  onSearch,
  className,
  placeholder = 'Search...',
  icon = <SearchIcon className='w-5 h-5 text-gray-800' aria-hidden="true" />,
  size = 'md',
  clearable = true,
  ariaLabel,
  ...props
}: SearchInputProps) => {
  const [value, setValue] = useState('');
  const inputId = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setValue('');
    if (onSearch) {
      onSearch('');
    }
  };

  const sizes = {
    sm: 'h-9 text-sm',
    md: 'h-11 text-base',
    lg: 'h-14 text-lg',
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative w-full', className)}>
      {/* Hidden label for screen readers */}
      <label htmlFor={inputId} className="sr-only">
        {ariaLabel || placeholder}
      </label>
      
      <div className='relative'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          {icon}
        </div>
        <input
          id={inputId}
          type='text'
          className={cn(
            'w-full rounded-lg border border-gray-300 focus:border-primary-1 focus:ring-2 focus:ring-primary-1/20',
            'bg-white text-gray-900 placeholder-gray-500',
            'transition-all duration-200 ease-in-out',
            sizes[size],
            'pl-10',
            clearable && value ? 'pr-10' : 'pr-4'
          )}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          aria-label={ariaLabel}
          {...props}
        />
        {clearable && value && (
          <button
            type='button'
            className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-800 hover:text-gray-700 min-w-[44px] min-h-[44px]'
            onClick={handleClear}
            aria-label="Clear search"
          >
            <XIcon className='w-5 h-5' aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchInput;