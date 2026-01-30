// src/pages/ProductsAvailabilityPage.tsx - Store Availability Comparison
import { useState } from 'react';
import { useStoreItems } from '@/hooks/useStoreItems';
import StockBadge from '@/components/ui/StockBadge';
import { formatPrice, type StoreItem } from '@/services/graphql';
import { getInventoryLocations } from '@/data/locations';
import { TrendingUp, Package } from 'lucide-react';
import PageHeroNarrow from '@/components/layout/PageHeroNarrow';
import { LoadingSpinner } from '@/components/ui/';
import { SEOHead, useGoogleAnalytics } from '@/components/seo';
import { InlineErrorState, EmptyState } from '@/components/layout';

export default function ProductsAvailabilityPage() {
  const STORES = getInventoryLocations();
  void useGoogleAnalytics(); // Initialize analytics

  // DEFAULT TO MAIN PRODUCTS
  const [selectedCategory, setSelectedCategory] = useState('Main Products');

  // Fetch items from all stores with inventory
  const storesData = STORES.map(location => ({
    id: location.storeId,
    name: location.name,
    icon: location.icon,
    data: useStoreItems({
      storeName: location.storeId,
      pageNumber: 1,
      pageSize: 100,
      category: selectedCategory, // Uses Main Products by default
    }),
  }));

  // Check if all stores are loading
  const allLoading = storesData.every(s => s.data.loading);

  // Check if any store has errors
  const hasErrors = storesData.some(s => s.data.error);

  // Get all unique product names across all stores
  const allProductNames = new Set<string>();
  storesData.forEach(store => {
    store.data.items.forEach(item => allProductNames.add(item.name));
  });

  const productNames = Array.from(allProductNames).sort();

  // Get all categories from all stores
  const allCategories = new Set<string>();
  storesData.forEach(store => {
    store.data.items.forEach(item => allCategories.add(item.category));
  });
  const categories = Array.from(allCategories).sort();

  // Helper function to find item in store
  const findItemInStore = (storeName: string, productName: string): StoreItem | undefined => {
    const store = storesData.find(s => s.id === storeName);
    return store?.data.items.find(item => item.name === productName);
  };

  // Calculate total stock across all stores for a product
  const getTotalStock = (productName: string): number => {
    return storesData.reduce((total, store) => {
      const item = findItemInStore(store.id, productName);
      return total + (item?.stockDetails.qty || 0);
    }, 0);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <SEOHead pageKey="availability" />
      {/* ProductsSchema commented out - component not found */}

      {/* Header */}
      <PageHeroNarrow
        title="Store Availability"
        subtitle="Compare inventory across all locations"
        icon={<TrendingUp size={32} aria-hidden="true" />}
      />

      {/* Filters */}
      <section className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-md">
        <div className="py-6 container-width">
          <div className="flex gap-4 items-center">
            <label htmlFor="category-filter" className="font-bold text-gray-700 whitespace-nowrap">
              Filter by Category:
            </label>
            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 px-4 max-w-md h-12 text-base bg-white rounded-lg border-2 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent min-h-[48px]"
              aria-label="Filter products by category"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {selectedCategory === 'Main Products' && (
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium">Note:</span> Showing main products only. Select "All Categories" to see everything.
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <main id="main-content" tabIndex={-1}>
        <section className="section-padding">
          <div className="container-width">
            {/* Loading State */}
            {allLoading && (
              <div role="status" aria-live="polite">
                <LoadingSpinner label="Loading inventory from all stores..." />
              </div>
            )}

            {/* Error State */}
            {hasErrors && !allLoading && (
              <InlineErrorState
                message="Some stores failed to load. Displaying available data. Some information may be incomplete."
                variant="warning"
              />
            )}

            {/* Availability Table */}
            {!allLoading && productNames.length > 0 && (
              <div className="overflow-hidden bg-white rounded-2xl shadow-lg">
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto lg:block">
                  <table className="w-full">
                    <thead className="text-white bg-primary-2">
                      <tr>
                        <th scope="col" className="px-6 py-4 w-1/4 text-lg font-bold text-left">
                          Product
                        </th>
                        {storesData.map(store => (
                          <th key={store.id} scope="col" className="px-6 py-4 text-lg font-bold text-center">
                            <div className="flex flex-col gap-2 items-center">
                              <span className="text-2xl" aria-hidden="true">{store.icon}</span>
                              <span>{store.name}</span>
                            </div>
                          </th>
                        ))}
                        <th scope="col" className="px-6 py-4 text-lg font-bold text-center">
                          Total Stock
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {productNames.map((productName, idx) => {
                        const totalStock = getTotalStock(productName);
                        const anyItem = storesData.map(s => findItemInStore(s.id, productName)).find(item => item);

                        return (
                          <tr key={productName} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            {/* Product Name */}
                            <th scope="row" className="px-6 py-4 text-left">
                              <div>
                                <h3 className="mb-1 font-bold text-primary-2">{productName}</h3>
                                {anyItem && (
                                  <>
                                    <p className="text-sm text-gray-600">{anyItem.category}</p>
                                    <p className="mt-1 text-lg font-bold text-secondary-1">
                                      {formatPrice(anyItem.price)}
                                    </p>
                                  </>
                                )}
                              </div>
                            </th>

                            {/* Store Columns */}
                            {storesData.map(store => {
                              const item = findItemInStore(store.id, productName);

                              return (
                                <td key={store.id} className="px-6 py-4 text-center">
                                  {item ? (
                                    <div className="flex flex-col gap-2 items-center">
                                      <StockBadge stockDetails={item.stockDetails} />
                                    </div>
                                  ) : (
                                    <span className="text-sm text-gray-400">Not Available</span>
                                  )}
                                </td>
                              );
                            })}

                            {/* Total Stock */}
                            <td className="px-6 py-4 text-center">
                              <div className="flex gap-2 justify-center items-center">
                                <Package size={20} className="text-primary-2" aria-hidden="true" />
                                <span className="text-xl font-bold text-primary-2">
                                  {totalStock}
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="divide-y divide-gray-200 lg:hidden">
                  {productNames.map((productName) => {
                    const totalStock = getTotalStock(productName);
                    const anyItem = storesData.map(s => findItemInStore(s.id, productName)).find(item => item);

                    return (
                      <article key={productName} className="p-6">
                        {/* Product Header */}
                        <div className="mb-4">
                          <h3 className="mb-1 text-lg font-bold text-primary-2">{productName}</h3>
                          {anyItem && (
                            <>
                              <p className="text-sm text-gray-600">{anyItem.category}</p>
                              <p className="mt-2 text-xl font-bold text-secondary-1">
                                {formatPrice(anyItem.price)}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Store Availability */}
                        <div className="mb-4 space-y-3">
                          {storesData.map(store => {
                            const item = findItemInStore(store.id, productName);

                            return (
                              <div key={store.id} className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                  <span className="text-xl" aria-hidden="true">{store.icon}</span>
                                  <span className="font-medium text-gray-700">{store.name}</span>
                                </div>
                                {item ? (
                                  <StockBadge stockDetails={item.stockDetails} />
                                ) : (
                                  <span className="text-sm text-gray-400">Not Available</span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                          <span className="font-bold text-gray-700">Total Stock:</span>
                          <div className="flex gap-2 items-center">
                            <Package size={20} className="text-primary-2" aria-hidden="true" />
                            <span className="text-xl font-bold text-primary-2">{totalStock}</span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!allLoading && productNames.length === 0 && (
              <EmptyState
                icon={Package}
                title="No Products Found"
                description={
                  selectedCategory
                    ? 'Try selecting a different category.'
                    : 'No inventory data available.'
                }
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
