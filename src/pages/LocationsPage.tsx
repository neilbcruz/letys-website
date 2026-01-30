// src/pages/LocationsPage.tsx - FIXED VERSION WITH ENHANCED SEO & ANALYTICS
import { useState } from 'react';
import { useStoreItems } from '@/hooks/useStoreItems';
import {
  LOCATIONS,
  isStoreOpen,
  formatHours,
  getInventoryLocations,
  type Location
} from '@/data/locations';
import { IMAGE_MAP, type ImageSet } from '@/lib/images';
import LocationsMap from '@/components/ui/LocationsMap';
import StockBadge from '@/components/ui/StockBadge';
import { MapPin, Clock, ExternalLink, Package, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeroNarrow from '@/components/layout/PageHeroNarrow';
import { SEOHead, LocationSchema, useGoogleAnalytics } from '@/components/seo';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_KEYS: (keyof Location['hours'])[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function LocationInventoryPreview({ location }: { location: Location }) {
  // FIXED: Filter to only show "Main Products" category
  const { items, loading } = useStoreItems({
    storeName: location.storeId,
    pageNumber: 1,
    pageSize: 5,
    category: 'Main Products', // Filter to Main Products only
  });

  if (!location.hasInventoryAPI) {
    return (
      <div className="p-4 mt-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="flex gap-2 items-center text-sm text-gray-600">
          <Info size={16} />
          Inventory information not available for this location
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 mt-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">Loading inventory...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="p-4 mt-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">No main products available</p>
      </div>
    );
  }

  // Count stock status
  const inStock = items.filter(item => item.stockDetails.qty > item.stockDetails.min).length;
  const lowStock = items.filter(
    item => item.stockDetails.qty > 0 && item.stockDetails.qty <= item.stockDetails.min
  ).length;
  const outOfStock = items.filter(item => item.stockDetails.qty === 0).length;

  return (
    <div className="mt-4 space-y-3">
      {/* Stock Summary */}
      <div className="p-4 rounded-lg border bg-primary-3/10 border-primary-3/30">
        <div className="flex justify-between items-center mb-3">
          <h4 className="flex gap-2 items-center font-bold text-primary-2">
            <Package size={18} />
            Main Products Status
          </h4>
          <Link
            to="/availability"
            className="text-sm underline text-primary-2 hover:text-primary-1"
          >
            View Full Inventory →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2 text-sm text-center">
          <div className="p-2 bg-white rounded">
            <div className="font-bold text-green-600">{inStock}</div>
            <div className="text-gray-600">In Stock</div>
          </div>
          <div className="p-2 bg-white rounded">
            <div className="font-bold text-yellow-600">{lowStock}</div>
            <div className="text-gray-600">Low Stock</div>
          </div>
          <div className="p-2 bg-white rounded">
            <div className="font-bold text-red-600">{outOfStock}</div>
            <div className="text-gray-600">Out</div>
          </div>
        </div>
      </div>

      {/* Top Items Preview */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <h5 className="mb-2 text-sm font-bold text-gray-800">Available Main Products</h5>
        <div className="space-y-2">
          {items.slice(0, 5).map(item => (
            <div key={item.itemId} className="flex justify-between items-center text-sm">
              <span className="flex-1 font-medium text-gray-700 truncate">
                {item.name}
              </span>
              <StockBadge 
                stockDetails={item.stockDetails} 
                className="text-xs min-w-[100px]"
                showQuantity={false}
              />
            </div>
          ))}
        </div>
        <Link
          to="/availability"
          className="block mt-3 text-sm font-medium text-center text-primary-2 hover:text-primary-1"
        >
          See all products at this location
        </Link>
      </div>

      {/* Special Notes */}
      {location.specialNotes && location.specialNotes.length > 0 && (
        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex gap-2 items-start">
            <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              {location.specialNotes.map((note, idx) => (
                <p key={idx}>{note}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LocationsPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [showInventory, setShowInventory] = useState(true);
  const { trackLocationClick, trackLocationDirections } = useGoogleAnalytics();

  // Check if any locations have inventory
  const hasAnyInventory = getInventoryLocations().length > 0;

  // Track location card click
  const handleLocationClick = (location: Location) => {
    trackLocationClick(location.name, location.id);
  };

  // Track directions click
  const handleDirectionsClick = (location: Location, e: React.MouseEvent) => {
    e.stopPropagation();
    trackLocationDirections(location.name);
    window.open(location.mapLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <SEOHead pageKey="locations" />
      {LOCATIONS.map(loc => (
        <LocationSchema key={loc.id} locationId={loc.id} />
      ))}
      {/* Header */}
      <PageHeroNarrow
        title="Our Locations"
        subtitle="Visit us at any of our convenient branches"
        icon={<MapPin size={32} aria-hidden="true" />}
      />

      {/* Map Section - FIXED: Added z-10 to keep it below header */}
      <section className="relative z-10 bg-white section-padding">
        <div className="container-width">
          <h2 className="mb-8 text-center heading-secondary">Find Us on the Map</h2>
          <div className="overflow-hidden rounded-2xl shadow-xl" role="region" aria-label="Interactive map of store locations">
            <LocationsMap
              locations={LOCATIONS}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
            />
          </div>
        </div>
      </section>

      {/* Inventory Toggle (if available) */}
      {hasAnyInventory && (
        <section className="bg-primary-3/10 border-y border-primary-3/30">
          <div className="py-4 container-width">
            <label className="flex gap-3 justify-center items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showInventory}
                onChange={(e) => setShowInventory(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 cursor-pointer text-primary-2 focus:ring-2 focus:ring-primary-1"
              />
              <span className="flex gap-2 items-center font-medium text-gray-800">
                <Package size={20} className="text-primary-2" />
                Show main products inventory for each location
              </span>
            </label>
          </div>
        </section>
      )}

      {/* Location Cards */}
      <section className="from-white to-gray-50 section-padding bg-linear-to-b">
        <div className="container-width">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-secondary">All Branches</h2>
            <div className="flex gap-4">
              <Link to="/availability" className="px-4 py-2 text-sm btn-primary">
                View Inventory
              </Link>
              <Link to="/availability" className="px-4 py-2 text-sm btn-secondary">
                Compare Stores
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {LOCATIONS.map(loc => {
              const now = new Date();
              const todayKey = DAY_KEYS[now.getDay()];
              const isOpen = isStoreOpen(loc);
              const imageData: ImageSet | undefined = IMAGE_MAP[loc.image];
              const isActive = activeLocation === loc.id;

              return (
                <article
                  key={loc.id}
                  className={`card-elevated overflow-hidden transform hover:scale-105 transition-all
                    ${isActive ? 'ring-4 ring-primary-1' : ''}`}
                  onClick={() => {
                    handleLocationClick(loc);
                    setActiveLocation(loc.id === activeLocation ? null : loc.id);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${loc.name} location details`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLocationClick(loc);
                      setActiveLocation(loc.id === activeLocation ? null : loc.id);
                    }
                  }}
                >
                  {/* Image */}
                  <div className="overflow-hidden relative h-56">
                    {imageData ? (
                      <img
                        src={imageData.default}
                        srcSet={imageData.srcSet}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                        alt={`${loc.name} storefront`}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-full bg-linear-to-br from-primary-2 to-primary-3">
                        <span className="text-6xl">{loc.icon}</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        isOpen ? 'text-white bg-green-500' : 'text-white bg-red-500'
                      }`}>
                        {isOpen ? 'Open Now' : 'Closed'}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="flex justify-between items-center mb-3 text-xl font-bold text-primary-2">
                      <span className="flex gap-2 items-center">
                        <span className="text-2xl">{loc.icon}</span>
                        {loc.name}
                      </span>
                      <button
                        onClick={(e) => handleDirectionsClick(loc, e)}
                        className="transition-colors text-primary-1 hover:text-primary-3"
                        aria-label={`View ${loc.name} on Google Maps`}
                      >
                        <ExternalLink size={20} />
                      </button>
                    </h3>

                    {/* Address */}
                    <div className="mb-4">
                      <div className="flex gap-2 items-start text-gray-700">
                        <MapPin size={18} className="mt-1 shrink-0 text-primary-2" aria-hidden="true" />
                        <address className="text-sm not-italic">
                          {loc.address.map((line, i) => (
                            <span key={i} className="block">{line}</span>
                          ))}
                        </address>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="mb-4">
                      <div className="flex gap-2 items-start">
                        <Clock size={18} className="mt-1 shrink-0 text-primary-2" aria-hidden="true" />
                        <div className="text-sm">
                          <p className="font-bold text-gray-900">
                            Today ({DAYS[now.getDay()]}): {formatHours(loc.hours, todayKey)}
                          </p>
                          
                          {expanded[loc.id] && (
                            <div className="mt-3 space-y-1 text-gray-600">
                              {DAY_KEYS.map((key, i) => (
                                <p key={key} className="flex justify-between">
                                  <span className="font-medium">{DAYS[i]}:</span>
                                  <span>{formatHours(loc.hours, key)}</span>
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      className="mb-4 text-sm font-bold underline rounded text-primary-2 hover:text-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpanded(prev => ({...prev, [loc.id]: !prev[loc.id]}));
                      }}
                      aria-expanded={expanded[loc.id]}
                      aria-controls={`hours-${loc.id}`}
                    >
                      {expanded[loc.id] ? 'Hide full hours' : 'Show full hours'}
                    </button>

                    {/* Inventory Preview */}
                    {showInventory && <LocationInventoryPreview location={loc} />}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-3/20">
        <div className="text-center container-width">
          <h2 className="mb-4 heading-primary">Can't decide which store to visit?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-700">
            Compare inventory across all our locations to find exactly what you're looking for
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/availability" className="text-lg btn-primary">
              Compare All Stores
            </Link>
            <Link to="/availability" className="text-lg btn-secondary">
              Browse Inventory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}