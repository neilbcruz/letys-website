import { IMAGES } from '@/lib/images';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui';

type HeroVariant = 'full' | 'narrow';

interface HeroBannerProps {
  variant?: HeroVariant;
  title?: string;
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
      <div className="w-full h-[var(--height-hero-mobile)] sm:h-[var(--height-hero-tablet)] lg:h-[var(--height-hero-desktop)] relative overflow-hidden flex items-center justify-center">
        <picture className="absolute inset-0 w-full h-full">
          {IMAGES.HERO.srcSet && (
            <source srcSet={IMAGES.HERO.srcSet} sizes="100vw" type="image/webp" />
          )}
          <img
            src={IMAGES.HERO.default}
            alt="Lety's Buko Pie storefront entrance with signage"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </picture>

        {/* Overlay - stronger for better contrast */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, var(--color-overlay-heavy), var(--color-overlay-medium), var(--color-overlay-black))`
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div
            className="inline-block backdrop-blur-sm rounded-xl p-6 sm:p-8"
            style={{ backgroundColor: 'var(--color-overlay-medium)' }}
          >
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 text-fg-inverse">
              Welcome to Lety's Buko Pie
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 font-medium text-fg-inverse">
              Authentic Filipino buko pie made with love since 1976
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <NavLink to="/products">
                <Button size="lg" variant="secondary">View Our Products</Button>
              </NavLink>
              <NavLink to="/locations">
                <Button size="lg" variant="primary">Find a Location</Button>
              </NavLink>
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
            alt={title}
            className="object-cover w-full h-full"
            loading="eager"
          />
        </picture>

        {/* Overlay + Blur for Contrast */}
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ backgroundColor: 'var(--color-overlay-medium)' }}
        ></div>

        {/* Content */}
        <div className="flex relative z-10 flex-col justify-center items-center px-4 h-full text-center container-width">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-fg-inverse/20">{icon}</div>
          </div>

          {/* Title with background for contrast */}
          <div
            className="inline-block backdrop-blur-sm rounded-lg p-4 mb-4"
            style={{ backgroundColor: 'var(--color-overlay-medium)' }}
          >
            <h1 className="text-3xl font-bold text-fg-inverse sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
