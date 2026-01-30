// src/pages/ProductsPage.tsx - Store Inventory Page
import { useState } from 'react';
import { useStoreItems } from '@/hooks/useStoreItems';
import ProductCardWithStock from '@/components/products/ProductCardWithStock';
import SearchInput from '@/components/ui/SearchInput';
import { Package, Store, RefreshCw } from 'lucide-react';
import { getInventoryLocations, getLocationByStoreId, formatHours } from '@/data/locations';
import PageHeroNarrow from '@/components/layout/PageHeroNarrow';
import { SkeletonGrid } from '@/components/ui';
import { SEOHead, ProductsSchema, useGoogleAnalytics } from '@/components/seo';
import { ErrorState, EmptyState, InfoBanner } from '@/components/layout';

export default function ProductsPage() {
  const STORES = getInventoryLocations();
  const { trackProductClick, trackSearch } = useGoogleAnalytics();

  const [selectedStore, setSelectedStore] = useState<string>(STORES[0]?.storeId || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { items, loading, error, refetch } = useStoreItems({
    storeName: selectedStore,
    pageNumber: 1,
    pageSize: 50,
    category: selectedCategory,
    itemName: searchTerm,
  });

  // Get unique categories from items
  const categories = Array.from(new Set(items.map(item => item.category))).sort();

  // Get current store info
  const currentStore = getLocationByStoreId(selectedStore);

  // Track search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      trackSearch(term, items.length);
    }
  };

  // Track product click
  const handleProductClick = (productName: string, category: string) => {
    trackProductClick(productName, category, 'Store Inventory');
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  // Handle store change
  const handleStoreChange = (storeId: string) => {
    setSelectedStore(storeId);
    clearFilters();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 [scrollbar-gutter:stable]">
      <SEOHead pageKey="products" />
      <ProductsSchema />

      {/* Header */}
      <PageHeroNarrow
        title="Store Inventory"
        subtitle="Browse our current stock across all locations"
        icon={<Package size={32} aria-hidden="true" />}
      />

      {/* Store Selection Tabs */}
      <section className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-md">
        <div className="container-width">
          <div className="flex flex-col gap-4 py-6">
            {/* Store Tabs */}
            <div className="flex flex-wrap gap-3 justify-center">
              {STORES.map((store) => (
                <button
                  key={store.storeId}
                  onClick={() => handleStoreChange(store.storeId)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-base
                    transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary-1
                    min-h-[48px]
                    ${selectedStore === store.storeId
                      ? 'bg-primary-2 text-white shadow-lg scale-105'
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  aria-pressed={selectedStore === store.storeId}
                  aria-label={`View ${store.name} inventory`}
                >
                  <span className="text-2xl" aria-hidden="true">{store.icon}</span>
                  <span>{store.name}</span>
                </button>
              ))}
            </div>

            {/* Store Info Banner */}
            {currentStore && (
              <InfoBanner
                icon={Store}
                title={currentStore.displayName}
                variant="primary"
              >
                <p className="text-sm text-gray-700">
                  {currentStore.address[0]} {currentStore.address[1]}
                </p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex gap-1 items-center">
                    <span className="font-medium">Hours:</span>
                    {formatHours(currentStore.hours)}
                  </span>
                  <a
                    href={currentStore.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline rounded text-primary-2 hover:text-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1"
                  >
                    Get Directions →
                  </a>
                </div>
              </InfoBanner>
            )}

            {currentStore?.specialNotes && currentStore.specialNotes.length > 0 && (
              <InfoBanner variant="warning">
                <p className="text-sm text-amber-800">
                  <span className="font-medium">Note:</span> {currentStore.specialNotes.join('; ')}
                </p>
              </InfoBanner>
            )}

            {/* Filters */}
            <div className="flex flex-col gap-4 md:flex-row">
              {/* Search */}
              <div className="flex-1">
                <SearchInput
                  placeholder="Search products..."
                  onSearch={handleSearch}
                  size="lg"
                  clearable
                  ariaLabel="Search for products"
                />
              </div>

              {/* Category Filter */}
              <div className="md:w-64">
                <label htmlFor="category-filter" className="sr-only">
                  Filter by category
                </label>
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 w-full h-14 text-base bg-white rounded-lg border-2 border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-primary-1 focus:border-transparent"
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Refresh Button */}
              <button
                onClick={refetch}
                disabled={loading}
                className="flex gap-2 justify-center items-center px-6 py-3 text-base btn-primary disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                aria-label="Refresh inventory"
              >
                <RefreshCw size={20} aria-hidden="true" className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main id="main-content" tabIndex={-1}>
        <section className="section-padding">
          <div className="container-width">
            {/* Loading State with Skeleton Grid */}
            {loading && (
              <div role="status" aria-live="polite">
                <div className="mb-6">
                  <p className="text-lg text-center text-gray-600">
                    Loading inventory for {currentStore?.name}...
                  </p>
                </div>
                <SkeletonGrid count={8} />
                <span className="sr-only">Loading products from {currentStore?.name}</span>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <ErrorState
                title="Failed to Load Inventory"
                message={error.message}
                onRetry={refetch}
                retryLabel="Try Again"
              />
            )}

            {/* Products Grid */}
            {!loading && !error && items.length > 0 && (
              <>
                <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-primary-2">
                    {items.length} {items.length === 1 ? 'Product' : 'Products'} Available
                    {selectedCategory && ` in ${selectedCategory}`}
                  </h2>
                  {(selectedCategory || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="px-2 py-1 underline rounded transition text-primary-2 hover:text-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <div
                      key={item.itemId}
                      onClick={() => handleProductClick(item.name, item.category)}
                      className="cursor-pointer"
                    >
                      <ProductCardWithStock item={item} />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Empty State */}
            {!loading && !error && items.length === 0 && (
              <EmptyState
                icon={Package}
                title="No Products Found"
                description={
                  searchTerm || selectedCategory
                    ? 'Try adjusting your filters or search terms.'
                    : `No products available at ${currentStore?.name} at the moment.`
                }
                action={
                  searchTerm || selectedCategory
                    ? { label: 'Clear All Filters', onClick: clearFilters, variant: 'secondary' }
                    : undefined
                }
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
