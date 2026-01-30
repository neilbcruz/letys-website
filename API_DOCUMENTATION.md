# API Documentation

This document describes the GraphQL API integration and data structures used in the Lety's Buko Pie website.

## Table of Contents

- [Overview](#overview)
- [GraphQL API](#graphql-api)
- [Data Structures](#data-structures)
- [Service Functions](#service-functions)
- [React Hook](#react-hook)
- [Error Handling](#error-handling)
- [Usage Examples](#usage-examples)

## Overview

The website connects to a GraphQL API to fetch real-time product inventory data from store locations. This allows customers to check product availability before visiting a store.

### GraphQL Endpoint

```
https://graphql-server-hotfix-x3nt7antfq-de.a.run.app/
```

### Features

- Get store inventory with pagination
- Filter products by category
- Search products by name
- Real-time stock status
- Price and discount information

## GraphQL API

### Query: getStoreItems

Fetches inventory items from a specific store.

```graphql
query {
  getStoreItems(
    storeName: "letysbukopie-main"
    pageNumber: 1
    pageSize: 50
    category: "Specialties"
    itemName: "Buko Pie"
  )
}
```

### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `storeName` | string | Yes | Store identifier (e.g., "letysbukopie-main") |
| `pageNumber` | number | Yes | Page number for pagination (starts at 1) |
| `pageSize` | number | Yes | Number of items per page |
| `category` | string | No | Filter by product category |
| `itemName` | string | No | Search by product name |

### Response Structure

```typescript
{
  data: {
    getStoreItems: {
      items: StoreItem[]
    }
  }
}
```

## Data Structures

### StoreItem

Represents a product in the store inventory.

```typescript
interface StoreItem {
  name: string;              // Product name
  category: string;          // Product category
  categoryId: string;        // Category identifier
  price: number;             // Current price
  originalPrice: number;     // Original price (before discount)
  minPrice: number;          // Minimum price
  maxPrice: number;          // Maximum price
  discount: number;          // Discount amount
  isParentItem: boolean;     // Whether this is a parent/variant item
  itemId: string;            // Unique item identifier
  discountUnit: string;      // Discount unit (e.g., "PHP", "percent")
  discountName: string;      // Discount name/description
  imagePath: string;         // Image path from server
  color: string | null;      // Product color (if applicable)
  options: string[];         // Product options/variants
  modifiers: string[];       // Product modifiers
  symbol: string;            // Currency symbol
  allowNegativeStock: boolean; // Whether backordering is allowed
  stockDetails: StockDetails; // Stock information
  description: string | null; // Product description
}
```

### StockDetails

Contains stock quantity and threshold information.

```typescript
interface StockDetails {
  qty: number;  // Current quantity in stock
  min: number;  // Minimum stock threshold (for low stock warning)
}
```

### QueryParams

Parameters for querying store items.

```typescript
interface QueryParams {
  storeName: string;    // Store identifier
  pageNumber: number;   // Page number for pagination
  pageSize: number;     // Items per page
  category?: string;    // Optional category filter
  itemName?: string;    // Optional search term
}
```

### GetStoreItemsResponse

Full API response structure.

```typescript
interface GetStoreItemsResponse {
  data: {
    getStoreItems: {
      items: StoreItem[];
    };
  };
}
```

## Service Functions

### getStoreItems

Main function to fetch store items from the GraphQL API.

```typescript
/**
 * Queries the GraphQL API for store items
 * @param params - Query parameters including store name, pagination, and filters
 * @returns Promise<StoreItem[]> - Array of store items
 * @throws Error if the fetch fails
 */
export async function getStoreItems(params: QueryParams): Promise<StoreItem[]>
```

**Example:**

```typescript
import { getStoreItems } from '@/services/graphql';

const items = await getStoreItems({
  storeName: 'letysbukopie-main',
  pageNumber: 1,
  pageSize: 50,
  category: 'Specialties'
});
```

### getItemsByCategory

Convenience function to fetch items by category.

```typescript
/**
 * Gets items for a specific category
 * @param storeName - Store identifier
 * @param category - Category name to filter
 * @param pageSize - Number of items (default: 50)
 * @returns Promise<StoreItem[]> - Filtered store items
 */
export async function getItemsByCategory(
  storeName: string,
  category: string,
  pageSize: number = 50
): Promise<StoreItem[]>
```

**Example:**

```typescript
import { getItemsByCategory } from '@/services/graphql';

const specialtyItems = await getItemsByCategory(
  'letysbukopie-main',
  'Specialties'
);
```

### searchItems

Search for items by product name.

```typescript
/**
 * Searches for items by name
 * @param storeName - Store identifier
 * @param itemName - Product name to search for
 * @param pageSize - Number of items (default: 50)
 * @returns Promise<StoreItem[]> - Matching store items
 */
export async function searchItems(
  storeName: string,
  itemName: string,
  pageSize: number = 50
): Promise<StoreItem[]>
```

**Example:**

```typescript
import { searchItems } from '@/services/graphql';

const results = await searchItems(
  'letysbukopie-main',
  'Buko Pie'
);
```

### getStockStatus

Calculate stock status for display purposes.

```typescript
/**
 * Gets stock status for display
 * @param stockDetails - Stock details object
 * @returns Stock status information with label and styling
 */
export function getStockStatus(stockDetails: StockDetails): {
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  label: string;
  color: string;
}
```

**Return Values:**

| Status | Condition | Label | Color Class |
|--------|-----------|-------|-------------|
| `out-of-stock` | `qty === 0` | "Out of Stock" | `text-red-600 bg-red-100` |
| `low-stock` | `qty <= min` | "Low Stock (X left)" | `text-yellow-700 bg-yellow-100` |
| `in-stock` | `qty > min` | "In Stock (X)" | `text-green-700 bg-green-100` |

**Example:**

```typescript
import { getStockStatus } from '@/services/graphql';

const status = getStockStatus({ qty: 5, min: 10 });
console.log(status);
// { status: 'low-stock', label: 'Low Stock (5 left)', color: 'text-yellow-700 bg-yellow-100' }
```

### formatPrice

Format price value in Philippine Pesos.

```typescript
/**
 * Formats price for display
 * @param price - Price value
 * @returns Formatted price string (e.g., "₱150.00")
 */
export function formatPrice(price: number): string
```

**Example:**

```typescript
import { formatPrice } from '@/services/graphql';

formatPrice(150);      // "₱150.00"
formatPrice(99.5);     // "₱99.50"
```

### getDiscountPercentage

Calculate discount percentage from original and current price.

```typescript
/**
 * Calculates discount percentage
 * @param originalPrice - Original price before discount
 * @param price - Current price after discount
 * @returns Discount percentage (rounded)
 */
export function getDiscountPercentage(originalPrice: number, price: number): number
```

**Example:**

```typescript
import { getDiscountPercentage } from '@/services/graphql';

getDiscountPercentage(200, 150);  // 25
getDiscountPercentage(100, 80);   // 20
```

## React Hook

### useStoreItems

Custom React hook for fetching and managing store items.

```typescript
/**
 * Hook for fetching and managing store items
 * @param params - Query parameters
 * @returns Object containing items, loading state, error, and refetch function
 */
export function useStoreItems(params: QueryParams): UseStoreItemsResult
```

#### Return Type

```typescript
interface UseStoreItemsResult {
  items: StoreItem[];       // Fetched items
  loading: boolean;         // Loading state
  error: Error | null;      // Error object if failed
  refetch: () => Promise<void>; // Function to refetch data
}
```

#### Features

- Automatic refetching when params change
- Filters out unavailable products for specific stores
- Loading and error states
- Manual refetch capability

#### Example

```typescript
import { useStoreItems } from '@/hooks/useStoreItems';

function ProductList() {
  const { items, loading, error, refetch } = useStoreItems({
    storeName: 'letysbukopie-main',
    pageNumber: 1,
    pageSize: 50
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {items.map(item => (
        <ProductCard key={item.itemId} item={item} />
      ))}
    </div>
  );
}
```

## Error Handling

### Error Types

The API service may throw errors for various reasons:

| Error Type | Cause | Handling |
|------------|-------|----------|
| Network Error | No internet connection | Show offline message |
| HTTP Error | Server error (4xx, 5xx) | Show error page |
| Parse Error | Invalid response | Log error, show fallback |
| Timeout | Request took too long | Retry with backoff |

### Error Handling Pattern

```typescript
try {
  const items = await getStoreItems(params);
  // Process items
} catch (error) {
  if (error instanceof TypeError) {
    // Network error
    console.error('Network error:', error);
  } else if (error instanceof Error) {
    // API error
    console.error('API error:', error.message);
  }
  // Show user-friendly error message
}
```

### Best Practices

1. **Always handle errors** in async operations
2. **Show user-friendly messages** for API errors
3. **Log errors** for debugging
4. **Provide retry options** for transient failures
5. **Use loading states** during fetch operations

## Usage Examples

### Example 1: Fetch All Products

```typescript
import { getStoreItems } from '@/services/graphql';

async function loadAllProducts() {
  try {
    const products = await getStoreItems({
      storeName: 'letysbukopie-main',
      pageNumber: 1,
      pageSize: 100
    });

    return products;
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
}
```

### Example 2: Filter by Category

```typescript
import { getItemsByCategory } from '@/services/graphql';

async function loadSpecialties() {
  const specialties = await getItemsByCategory(
    'letysbukopie-main',
    'Specialties',
    50
  );

  return specialties;
}
```

### Example 3: Search Products

```typescript
import { searchItems } from '@/services/graphql';

async function searchProducts(query: string) {
  if (!query.trim()) return [];

  const results = await searchItems(
    'letysbukopie-main',
    query,
    20
  );

  return results;
}
```

### Example 4: Use with React Hook

```typescript
import { useStoreItems } from '@/hooks/useStoreItems';
import { StockBadge } from '@/components/ui';

function AvailabilityPage({ storeId }: { storeId: string }) {
  const { items, loading, error } = useStoreItems({
    storeName: storeId,
    pageNumber: 1,
    pageSize: 50
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <div key={item.itemId} className="p-4 border rounded">
          <h3>{item.name}</h3>
          <p>{formatPrice(item.price)}</p>
          <StockBadge stockDetails={item.stockDetails} />
        </div>
      ))}
    </div>
  );
}
```

### Example 5: Display Stock Status

```typescript
import { getStockStatus, formatPrice } from '@/services/graphql';

function ProductInfo({ item }: { item: StoreItem }) {
  const stockStatus = getStockStatus(item.stockDetails);
  const hasDiscount = item.discount > 0;

  return (
    <div>
      <h2>{item.name}</h2>
      <p className="price">
        {formatPrice(item.price)}
        {hasDiscount && (
          <span className="original-price">
            {formatPrice(item.originalPrice)}
          </span>
        )}
      </p>
      <span className={`badge ${stockStatus.color}`}>
        {stockStatus.label}
      </span>
    </div>
  );
}
```

## Store Identifiers

Available store names for the API:

| Store ID | Name | Location |
|----------|------|----------|
| `letysbukopie-main` | Main Store | Los Baños, Laguna |
| `letysbukopie-shell` | Shell Branch | Los Baños, Laguna |
| `letysbukopie-agapita` | Agapita Branch | Los Baños, Laguna |
| `letysbukopie-pansol` | Pansol Branch | Pansol, Laguna |

## Store-Specific Availability

Some products may not be available at all stores. The `isAvailableInStore` function in `@/data/products` handles this filtering:

```typescript
import { isAvailableInStore } from '@/data/products';

// Frozen Buko Pie is not available at Pansol
isAvailableInStore('letysbukopie-pansol', 'Frozen Buko Pie'); // false
isAvailableInStore('letysbukopie-main', 'Frozen Buko Pie');   // true
```

## Pagination

When dealing with large inventories, use pagination:

```typescript
async function loadAllPages(storeName: string) {
  let allItems: StoreItem[] = [];
  let page = 1;
  const pageSize = 50;
  let hasMore = true;

  while (hasMore) {
    const items = await getStoreItems({
      storeName,
      pageNumber: page,
      pageSize
    });

    allItems = [...allItems, ...items];
    hasMore = items.length === pageSize;
    page++;
  }

  return allItems;
}
```

## Caching Strategy

The `useStoreItems` hook automatically caches data based on query parameters. To force a refresh:

```typescript
const { refetch } = useStoreItems(params);

// Force refetch
await refetch();
```

## Additional Resources

- [GraphQL Documentation](https://graphql.org/)
- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
