// src/hooks/useStoreItems.ts
import { useState, useEffect } from 'react';
import { getStoreItems, type StoreItem, type QueryParams } from '@/services/graphql';

interface UseStoreItemsResult {
  items: StoreItem[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useStoreItems(params: QueryParams): UseStoreItemsResult {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStoreItems(params);
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch items'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
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