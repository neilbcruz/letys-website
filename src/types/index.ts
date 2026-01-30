/**
 * Shared TypeScript type definitions for Lety's Buko Pie website
 *
 * This file exports all commonly used types across the application for easy importing.
 * Organized by domain/category for better discoverability.
 *
 * @example
 * ```typescript
 * import { Location, ProductItem, StoreItem } from '@/types';
 * ```
 */

// ==================== Data Types ====================

export type { Location } from '@/data/locations';
export type { ProductItem, ProductCategory } from '@/data/products';
export type { NavItem } from '@/data/navItems';

// ==================== API Types ====================

export type {
  StockDetails,
  StoreItem,
  GetStoreItemsResponse,
  QueryParams,
} from '@/services/graphql';

// ==================== Image Types ====================

export type { ImageSet, ImageKey } from '@/lib/images';

// ==================== Hook Types ====================

// Note: Interface not exported from useStoreItems, defined inline

// ==================== React Component Props ====================

// Note: Component props are defined inline and not exported
// Import types directly from component files if needed

// ==================== Utility Types ====================

/**
 * Make all properties in T optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make specific keys of T required
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Extract the return type of a function
 */
export type ReturnType<T extends (...args: unknown[]) => unknown> = T extends (
  ...args: unknown[]
) => infer R
  ? R
  : never;

/**
 * Create a type that is T or Promise<T>
 */
export type MaybePromise<T> = T | Promise<T>;

/**
 * Extract the promise value type
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

// ==================== Common React Types ====================

/**
 * Standard component props with optional className and children
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  disabled?: boolean;
}

/**
 * Props for components with loading state
 */
export interface LoadableProps {
  isLoading?: boolean;
  loadingText?: string;
}

/**
 * Props for clickable components
 */
export interface ClickableProps {
  onClick?: () => void | Promise<void>;
  onDoubleClick?: () => void | Promise<void>;
}

// ==================== Status Types ====================

/**
 * Generic loading status
 */
export type LoadingStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Stock status as used in the UI
 */
export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

/**
 * Store availability status
 */
export type StoreAvailabilityStatus = 'available' | 'limited' | 'unavailable';

// ==================== SEO & Analytics Types ====================

/**
 * Page metadata for SEO
 */
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

/**
 * Analytics event data
 */
export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// ==================== Form Types ====================

/**
 * Generic form field error
 */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Form validation result
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: FieldError[];
}

/**
 * Generic form state
 */
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

// ==================== Pagination Types ====================

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}
