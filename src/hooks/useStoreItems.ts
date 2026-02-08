// src/hooks/useStoreItems.ts
import { useState, useEffect } from 'react';
import { getStoreItems, type StoreItem, type QueryParams } from '@/services/graphql';
import { isAvailableInStore } from '@/data/products';

/**
 * Result type returned by the useStoreItems hook
 *
 * @interface UseStoreItemsResult
 * @property {StoreItem[]} items - Array of fetched store items
 * @property {boolean} loading - Indicates if data is currently being fetched
 * @property {Error | null} error - Error object if fetch failed, null otherwise
 * @property {() => Promise<void>} refetch - Function to manually refetch data
 */
interface UseStoreItemsResult {
  items: StoreItem[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom React hook for fetching and managing store items from the GraphQL API
 *
 * This hook provides a convenient way to fetch store inventory with automatic
 * loading states, error handling, and refetch capabilities. It automatically
 * filters items based on store-specific availability rules.
 *
 * @param params - Query parameters for fetching store items
 * @param params.storeName - Store identifier (e.g., 'letysbukopie-main')
 * @param params.pageNumber - Page number for pagination
 * @param params.pageSize - Number of items per page
 * @param params.category - Optional category filter
 * @param params.itemName - Optional search term
 * @returns Object containing items, loading state, error, and refetch function
 *
 * @example
 * ```typescript
 * function ProductList({ storeId }: { storeId: string }) {
 *   const { items, loading, error, refetch } = useStoreItems({
 *     storeName: storeId,
 *     pageNumber: 1,
 *     pageSize: 50
 *   });
 *
 *   if (loading) return <SkeletonLoader />;
 *   if (error) return <ErrorMessage error={error} />;
 *
 *   return (
 *     <ul>
 *       {items.map(item => (
 *         <li key={item.itemId}>{item.name}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 *
 * @remarks
 * - Automatically refetches when any parameter changes
 * - Filters items based on store availability rules from @/data/products
 * - Handles errors gracefully with try-catch
 * - Provides manual refetch capability for user-triggered refreshes
 */
export function useStoreItems(params: QueryParams): UseStoreItemsResult {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStoreItems(params);
      const filteredItems = data.filter(item =>
        isAvailableInStore(params.storeName, item.name)
      );
      setItems(filteredItems);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch items'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    params.storeName,
    params.pageNumber,
    params.pageSize,
    params.category,
    params.itemName,
  ]);

  return {
    items,
    loading,
    error,
    refetch: fetchItems,
  };
}
