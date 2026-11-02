import { IMAGES } from '@/lib/images';
import { getLocationById, getStoreStatus } from '@/data/locations';
import { NavLink } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui';

type HeroVariant = 'full' | 'narrow';

interface HeroBannerProps {
  variant?: HeroVariant;
  title?: React.ReactNode;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function HeroBanner({
  variant = 'full',
  title,
  icon,
}: HeroBannerProps) {
  const mainStatus = variant === 'full' ? getStoreStatus(getLocationById('main')!) : null;
  // Full-width variant (from PageHero.tsx)
  if (variant === 'full') {
    return (
      <div className="w-full min-h-[var(--height-hero-mobile)] sm:min-h-[var(--height-hero-tablet)] lg:min-h-[var(--height-hero-desktop)] relative overflow-hidden flex items-center pt-[var(--header-h)]">
        <picture className="absolute inset-0 w-full h-full">
          {IMAGES.HERO.srcSet && (
            <source srcSet={IMAGES.HERO.srcSet} sizes="100vw" type="image/webp" />
          )}
          <img
            src={IMAGES.HERO.default}
            alt="Lety's Buko Pie storefront entrance with signage"
            className="w-full h-full object-cover object-[center_60%] dark-hero-image"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Overlay: vertical base + left scrim behind text column + top band
            behind transparent header (WCAG AA over the photo, both themes) */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to bottom, var(--color-overlay-light), color-mix(in srgb, var(--color-overlay-medium) 45%, transparent), var(--color-overlay-heavy))',
              'linear-gradient(to right, var(--color-overlay-black) 0%, color-mix(in srgb, var(--color-overlay-heavy) 80%, transparent) 38%, color-mix(in srgb, var(--color-overlay-medium) 40%, transparent) 58%, transparent 75%)',
              'linear-gradient(to bottom, color-mix(in srgb, var(--color-overlay-black) 80%, transparent) 0%, transparent 16%)',
            ].join(', ')
          }}
        ></div>

        {/* Mobile veil: text block spans full width and sits in the vertical
            gradient's weakest band; restore AA until the desktop scrim takes over */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.62) 50%, rgba(0,0,0,0.30) 100%)'
          }}
        ></div>

        {/* Content - 3 column grid */}
        <div className="relative z-10 w-full px-8 sm:px-12 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full items-center">
            {/* Left column - Text content */}
            <div className="lg:col-span-1 text-left">
              <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-8 text-fg-emphasis leading-[1.1] text-balance"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.4)' }}>
                The <span
                  className="text-accent font-semibold text-4xl sm:text-5xl lg:text-6xl whitespace-nowrap"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.4)' }}
                >Buko Pie</span> That Brings You Home
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl mb-12 font-medium text-fg-emphasis leading-snug text-pretty"
                 style={{ textShadow: '0 2px 12px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.4)' }}>
                The Same Homemade Taste,{' '}
                <span className="whitespace-nowrap">Baked Fresh Daily Since 1976</span>
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-start items-center">
                <Button href="/locations" size="lg" variant="primary" className="w-full sm:w-auto whitespace-nowrap group">
                  <MapPin className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  Find a Location
                </Button>
                <Button href="/products" size="lg" variant="outline" className="border-fg-inverse bg-surface-base/90 text-brand hover:bg-surface-base hover:text-brand w-full sm:w-auto whitespace-nowrap group">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  See Our Pies
                </Button>
              </div>

              {mainStatus && (
                <div className="mt-6 flex flex-col items-start gap-3">
                  <NavLink
                    to="/availability"
                    className={`status-chip inline-flex items-center ${
                      mainStatus.isOpen
                        ? 'border-status-success-border bg-status-success-bg text-status-success-fg'
                        : 'border-status-error-border bg-status-error-bg-muted text-status-error-fg'
                    }`}
                  >
                    {mainStatus.label}
                    <span className="sr-only"> — see today's availability</span>
                  </NavLink>
                  <NavLink
                    to="/locations"
                    className="text-sm font-semibold text-fg-emphasis underline decoration-fg-emphasis/50 underline-offset-4 hover:decoration-fg-emphasis transition-colors"
                    style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
                  >
                    4 branches across Laguna — hours &amp; directions
                  </NavLink>
                </div>
              )}
            </div>

            {/* Right columns - signature pie over the storefront backdrop */}
            <div className="hidden lg:block lg:col-span-2">
              <picture>
                {IMAGES.BUKO_PIE.srcSet && (
                  <source srcSet={IMAGES.BUKO_PIE.srcSet} sizes="(min-width: 1024px) 50vw" type="image/webp" />
                )}
                <img
                  src={IMAGES.BUKO_PIE.default}
                  alt="Lety's signature Buko Pie — whole pie with golden crust"
                  className="mx-auto aspect-square h-[min(70vh,560px)] w-auto object-cover rounded-2xl shadow-2xl ring-1 ring-fg-emphasis/15"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Narrow variant (from PageHeroNarrow.tsx)
  if (variant === 'narrow') {
    if (!title || !icon) {
      return null;
    }

    return (
      <div className="overflow-hidden relative w-full bg-surface-subtle h-[var(--height-hero-narrow)] sm:h-[var(--height-hero-narrow)] lg:h-[var(--height-hero-narrow)]">
        {/* Background Image */}
        <picture className="absolute inset-0 w-full h-full">
          {IMAGES.HERO_NARROW.srcSet && (
            <source srcSet={IMAGES.HERO_NARROW.srcSet} sizes="100vw" type="image/webp" />
          )}
          <img
            src={IMAGES.HERO_NARROW.default}
            alt=""
            className="object-cover w-full h-full dark-hero-image"
            loading="eager"
            fetchPriority="high"
          />
        </picture>

        {/* Overlay for Contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, var(--color-overlay-heavy), color-mix(in srgb, var(--color-overlay-medium) 55%, transparent))'
          }}
        ></div>

        {/* Content */}
        <div className="flex relative z-10 flex-col justify-center items-center px-4 h-full text-center container-width">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-surface-base/20 text-fg-emphasis">{icon}</div>
          </div>

          {/* Title */}
          <div className="drop-shadow-lg">
            <h1 className="text-3xl font-bold text-fg-emphasis sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
