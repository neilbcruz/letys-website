// src/pages/ProductsPage.tsx - Store Inventory Page
import { useState } from 'react';
import { useStoreItems } from '@/hooks/useStoreItems';
import ProductCardWithStock from '@/components/products/ProductCardWithStock';
import { SearchInput, SegmentedControl } from '@/components/ui';
import { Package, Store, RefreshCw } from 'lucide-react';
import { getInventoryLocations, getLocationByStoreId, formatHours } from '@/data/locations';
import HeroBanner from '@/components/ui/HeroBanner';
import { LoadingGrid } from '@/components/ui/LoadingStates';
import { SEOHead, ProductsSchema, useGoogleAnalytics } from '@/components/seo';
import { ErrorState, EmptyState, InfoBanner } from '@/components/layout';
import { getLocationIcon } from '@/lib/locationIcons';

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
    <div className="w-full min-h-screen bg-surface-subtle [scrollbar-gutter:stable]">
      <SEOHead pageKey="products" />
      <ProductsSchema />

      {/* Header */}
      <HeroBanner
        variant="narrow"
        title={<>Shop Our <span className="text-accent">Products</span></>}
        icon={<Package size={32} aria-hidden="true" />}
      />

      {/* Subheading */}
      <section className="bg-surface-base border-b border-stroke-default">
        <div className="container-width px-4 py-6 sm:px-8 text-center">
          <p className="text-lg text-fg-muted">
            Fresh baked goods, specialty pies, and pasalubong favorites
          </p>
        </div>
      </section>

      {/* Store Selection Tabs */}
      <section className="sticky top-[84px] z-30 bg-surface-base border-b border-stroke-default shadow-md">
        <div className="container-width">
          <div className="flex flex-col gap-4 py-6">
            {/* Store Tabs */}
            <div className="flex justify-center">
              <SegmentedControl
                ariaLabel="Choose inventory location"
                value={selectedStore}
                onChange={handleStoreChange}
                options={STORES.map(store => {
                  const StoreIcon = getLocationIcon(store.icon);

                  return {
                    label: store.name,
                    value: store.storeId,
                    ariaLabel: `View ${store.name} inventory`,
                    icon: <StoreIcon size={20} aria-hidden="true" />,
                  };
                })}
              />
            </div>

            {/* Store Info Banner */}
            {currentStore && (
              <InfoBanner
                icon={Store}
                title={currentStore.displayName}
                variant="primary"
              >
                <p className="text-sm text-fg-base">
                  {currentStore.address[0]} {currentStore.address[1]}
                </p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-fg-muted">
                  <span className="flex gap-1 items-center">
                    <span className="font-medium">Hours:</span>
                    {formatHours(currentStore.hours)}
                  </span>
                  <a
                    href={currentStore.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline rounded text-brand hover:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    Get Directions →
                  </a>
                </div>
              </InfoBanner>
            )}

            {currentStore?.specialNotes && currentStore.specialNotes.length > 0 && (
              <InfoBanner variant="warning">
                <p className="text-sm text-status-warning-fg-strong">
                  <span className="font-medium">Note:</span> {currentStore.specialNotes.join('; ')}
                </p>
              </InfoBanner>
            )}

            {/* Filters */}
            <div className="flex flex-col gap-4">
              {/* Category Pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand ${
                    selectedCategory === ''
                      ? 'ui-chip-selected'
                      : 'ui-chip'
                  }`}
                  aria-label="All categories"
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand ${
                      selectedCategory === category
                        ? 'ui-chip-selected'
                        : 'ui-chip'
                    }`}
                    aria-label={`Filter by ${category}`}
                    aria-pressed={selectedCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <SearchInput
                    placeholder="Search products..."
                    onSearch={handleSearch}
                    size="lg"
                    clearable
                    ariaLabel="Search for products"
                  />
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
        </div>
      </section>

      {/* Content Section */}
      <main id="main-content" tabIndex={-1}>
        <section className="section-padding">
          <div className="container-width">
            {/* Loading State with Skeleton Grid */}
            {loading && (
              <div role="status" aria-live="polite" aria-busy="true">
                <div className="mb-6">
                  <p className="text-lg text-center text-fg-muted">
                    Loading inventory for {currentStore?.name}...
                  </p>
                </div>
                <LoadingGrid count={8} />
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
                  <h2 className="text-2xl font-bold text-brand">
                    {items.length} {items.length === 1 ? 'Product' : 'Products'} Available
                    {selectedCategory && ` in ${selectedCategory}`}
                  </h2>
                  {(selectedCategory || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="px-2 py-1 underline rounded transition text-brand hover:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <div
                      key={item.itemId}
                      onClick={() => handleProductClick(item.name, item.category)}
                      className="rounded-lg"
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
                secondaryAction={
                  !searchTerm && !selectedCategory
                    ? { label: 'Check Other Stores', onClick: () => window.location.href = '/availability' }
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
