// src/pages/LocationsPage.tsx - Store Locations Page
import { useState } from 'react';
import { useStoreItems } from '@/hooks/useStoreItems';
import {
  LOCATIONS,
  isStoreOpen,
  formatHours,
  type Location
} from '@/data/locations';
import { IMAGE_MAP, type ImageSet } from '@/lib/images';
import LocationsMap from '@/components/ui/LocationsMap';
import StockBadge from '@/components/ui/StockBadge';
import { MapPin, Clock, ExternalLink, Info, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBanner from '@/components/ui/HeroBanner';
import { SEOHead, LocationSchema, useGoogleAnalytics } from '@/components/seo';
import { PageSection, PageSectionContent, PageSectionGrid, InventoryCTA } from '@/components/layout';
import { getLocationIcon } from '@/lib/locationIcons';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAY_KEYS: (keyof Location['hours'])[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

function LocationInventoryPreview({ location }: { location: Location }) {
  // Filter to only show "Main Products" category
  const { items, loading } = useStoreItems({
    storeName: location.storeId,
    pageNumber: 1,
    pageSize: 5,
    category: 'Main Products',
  });

  if (!location.hasInventoryAPI) {
    return (
      <div className="p-4 mt-4 bg-surface-subtle rounded-lg border border-stroke-default">
        <p className="flex gap-2 items-center text-sm text-fg-muted">
          <Info size={16} />
          Inventory information not available for this location
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 mt-4 bg-surface-subtle rounded-lg border border-stroke-default" role="status" aria-live="polite" aria-busy="true">
        <p className="text-sm text-fg-muted">Loading inventory...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="p-4 mt-4 bg-surface-subtle rounded-lg border border-stroke-default">
        <p className="text-sm text-fg-muted">No main products available</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      {/* Top Items Preview */}
      <div className="p-4 bg-surface-base rounded-lg border border-stroke-default">
        <h5 className="mb-2 text-sm font-bold text-fg-strong">Available Main Products</h5>
        <div className="space-y-2">
          {items.slice(0, 5).map(item => (
            <div key={item.itemId} className="flex justify-between items-center text-sm">
              <span className="flex-1 font-medium text-fg-base truncate">
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
          onClick={(e) => e.stopPropagation()}
          className="block mt-3 text-sm font-medium text-center text-brand hover:text-brand-muted"
        >
          See all products at this location
        </Link>
      </div>

      {/* Special Notes */}
      {location.specialNotes && location.specialNotes.length > 0 && (
        <div className="p-3 bg-status-warning-bg rounded-lg border border-status-warning-border">
          <div className="flex gap-2 items-start">
            <Info size={16} className="text-status-warning-fg shrink-0 mt-0.5" />
            <div className="text-sm text-status-warning-fg-strong">
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
  const { trackLocationClick, trackLocationDirections } = useGoogleAnalytics();

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
    <div className="w-full min-h-screen bg-surface-subtle">
      <SEOHead pageKey="locations" />
      {LOCATIONS.map(loc => (
        <LocationSchema key={loc.id} locationId={loc.id} />
      ))}

      {/* Header */}
      <HeroBanner
        variant="narrow"
        title={<>Visit <span className="text-accent">Our Stores</span> in Los Baños</>}
        icon={<MapPin size={32} aria-hidden="true" />}
      />

      {/* Subheading */}
      <section className="bg-surface-base border-b border-stroke-default">
        <div className="container-width px-4 py-6 sm:px-8 text-center">
          <p className="text-lg text-fg-muted">
            5 locations, same homemade taste
          </p>
        </div>
      </section>

      {/* Map Section */}
      <PageSection variant="white" role="region" ariaLabel="Interactive map of store locations">
        <PageSectionContent>
          <h2 className="mb-8 text-center heading-secondary">Find Us on the Map</h2>
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <LocationsMap
              locations={LOCATIONS}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
            />
          </div>
        </PageSectionContent>
      </PageSection>

      {/* Location Cards */}
      <main id="main-content" tabIndex={-1}>
        <PageSection variant="gradient-alt">
          <PageSectionContent>
            <div className="mb-12">
              <h2 className="heading-secondary">All Branches</h2>
            </div>

            <PageSectionGrid cols={4}>
              {LOCATIONS.map(loc => {
                const now = new Date();
                const todayKey = DAY_KEYS[now.getDay()];
                const isOpen = isStoreOpen(loc);
                const imageData: ImageSet | undefined = IMAGE_MAP[loc.image];
                const isActive = activeLocation === loc.id;
                const LocationIcon = getLocationIcon(loc.icon);

                return (
                  <article
                    key={loc.id}
                    className={`card-elevated overflow-hidden border border-stroke-default transition-all cursor-pointer hover:border-brand-muted hover:-translate-y-0.5
                      ${isActive ? 'ring-4 ring-brand' : ''}`}
                    onClick={() => {
                      handleLocationClick(loc);
                      setActiveLocation(loc.id === activeLocation ? null : loc.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.target !== e.currentTarget) return;
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleLocationClick(loc);
                        setActiveLocation(loc.id === activeLocation ? null : loc.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={`${loc.name} location details`}
                  >
                    {/* Image */}
                    <div className="overflow-hidden relative h-56">
                      {imageData ? (
                        <img
                          src={imageData.default}
                          srcSet={imageData.srcSet}
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                          alt={`${loc.name} storefront`}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex justify-center items-center w-full h-full bg-linear-to-br from-brand to-brand-muted">
                          <LocationIcon size={56} className="text-fg-inverse" aria-hidden="true" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className={`status-chip ${
                          isOpen ? 'border-status-success-border bg-status-success-bg text-status-success-fg' : 'border-status-error-border bg-status-error-bg-muted text-status-error-fg'
                        }`}>
                          {isOpen ? 'Open Now' : 'Closed'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="flex justify-between items-center mb-3 text-xl font-bold text-brand">
                        <span className="flex gap-2 items-center">
                          <LocationIcon size={24} aria-hidden="true" />
                          {loc.name}
                        </span>
                        <button
                          onClick={(e) => handleDirectionsClick(loc, e)}
                          className="transition-colors text-brand hover:text-brand-muted"
                          aria-label={`View ${loc.name} on Google Maps`}
                        >
                          <ExternalLink size={20} />
                        </button>
                      </h3>

                      {/* Address */}
                      <div className="mb-4">
                        <div className="flex gap-2 items-start text-fg-base">
                          <MapPin size={18} className="mt-1 shrink-0 text-brand" aria-hidden="true" />
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
                          <Clock size={18} className="mt-1 shrink-0 text-brand" aria-hidden="true" />
                          <div className="text-sm">
                            <div className="flex gap-2 items-center">
                              <p className="font-bold text-fg-default">
                                Today ({DAYS[now.getDay()]}): {formatHours(loc.hours, todayKey)}
                              </p>
                              <button
                                type="button"
                                className="inline-flex justify-center items-center w-7 h-7 rounded-full text-brand transition-colors hover:bg-brand-muted/15 hover:text-brand-muted focus:outline-none focus:ring-2 focus:ring-brand"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpanded(prev => ({...prev, [loc.id]: !prev[loc.id]}));
                                }}
                                aria-expanded={expanded[loc.id]}
                                aria-controls={`hours-${loc.id}`}
                                aria-label={expanded[loc.id] ? `Hide full hours for ${loc.name}` : `Show full hours for ${loc.name}`}
                              >
                                <ChevronDown
                                  size={16}
                                  className={`transition-transform ${expanded[loc.id] ? 'rotate-180' : ''}`}
                                  aria-hidden="true"
                                />
                              </button>
                            </div>

                            {expanded[loc.id] && (
                              <div
                                className="mt-3 space-y-1 text-fg-muted"
                                id={`hours-${loc.id}`}
                              >
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

                      {/* Inventory Preview */}
                      <LocationInventoryPreview location={loc} />
                    </div>
                  </article>
                );
              })}
            </PageSectionGrid>
          </PageSectionContent>
        </PageSection>

        {/* CTA Section */}
        <PageSection variant="gradient">
          <InventoryCTA />
        </PageSection>
      </main>
    </div>
  );
}
