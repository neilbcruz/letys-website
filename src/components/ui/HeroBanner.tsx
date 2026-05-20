import { IMAGES } from '@/lib/images';
import { NavLink } from 'react-router-dom';
import { ShoppingBag, MapPin } from 'lucide-react';
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
  // Full-width variant (from PageHero.tsx)
  if (variant === 'full') {
    return (
      <div className="w-full h-[var(--height-hero-mobile)] sm:h-[var(--height-hero-tablet)] lg:h-[var(--height-hero-desktop)] relative overflow-hidden flex items-center">
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

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-overlay-light), color-mix(in srgb, var(--color-overlay-medium) 45%, transparent), var(--color-overlay-heavy))'
          }}
        ></div>

        {/* Content - 3 column grid */}
        <div className="relative z-10 w-full px-8 sm:px-12 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full items-center">
            {/* Left column - Text content */}
            <div className="lg:col-span-1 text-left">
              <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-8 text-fg-emphasis leading-[1.1] text-balance">
                The <span
                  className="text-accent font-semibold text-4xl sm:text-5xl lg:text-6xl whitespace-nowrap"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.65), 0 1px 3px rgba(0,0,0,0.4)' }}
                >Buko Pie</span> That Brings You Home
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl mb-12 font-medium text-fg-emphasis leading-snug text-pretty">
                The Same Homemade Taste,{' '}
                <span className="whitespace-nowrap">Baked Fresh Daily Since 1976</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
                <NavLink to="/products" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="border-fg-inverse bg-surface-base/90 text-brand hover:bg-surface-base hover:text-brand w-full group">
                    <ShoppingBag className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                    Shop Our Products
                  </Button>
                </NavLink>
                <NavLink to="/locations" className="w-full sm:w-auto">
                  <Button size="lg" variant="primary" className="w-full group">
                    <MapPin className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    Find a Location
                  </Button>
                </NavLink>
              </div>
            </div>

            {/* Right columns - Empty space to showcase pie */}
            <div className="hidden lg:block lg:col-span-2"></div>
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
