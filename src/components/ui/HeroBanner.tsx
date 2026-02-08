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
  subtitle,
  icon,
}: HeroBannerProps) {
  // Full-width variant (from PageHero.tsx)
  if (variant === 'full') {
    return (
      <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] relative overflow-hidden flex items-center justify-center">
        <picture className="absolute inset-0 w-full h-full">
          {IMAGES.HERO.srcSet && (
            <source srcSet={IMAGES.HERO.srcSet} sizes="100vw" type="image/webp" />
          )}
          <img
            src={IMAGES.HERO.default}
            alt="Lety's Buko Pie storefront with招牌sign and entrance"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </picture>

        {/* Overlay - stronger for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-block bg-black/50 backdrop-blur-sm rounded-xl p-6 sm:p-8">
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 text-white">
              Welcome to Lety's Buko Pie
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 font-medium text-white">
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
    if (!title || !subtitle || !icon) {
      console.warn('HeroBanner narrow variant requires title, subtitle, and icon props');
      return null;
    }

    return (
      <div className="overflow-hidden relative w-full bg-gray-50 h-[220px] sm:h-[260px] lg:h-[300px]">
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
        <div className="absolute inset-0 backdrop-blur-sm bg-black/50"></div>

        {/* Content */}
        <div className="flex relative z-10 flex-col justify-center items-center px-4 h-full text-center container-width">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-white/20">{icon}</div>
          </div>

          {/* Title with background for contrast */}
          <div className="inline-block bg-black/50 backdrop-blur-sm rounded-lg p-4 mb-4">
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </div>

          {/* Subtitle with background for contrast */}
          <div className="inline-block bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 max-w-3xl">
            <p className="text-lg font-medium text-white sm:text-xl lg:text-2xl">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
