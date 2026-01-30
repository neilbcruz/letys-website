import { IMAGES } from '@/lib/images';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui';

export default function PageHero() {
  return (
    <div className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] relative overflow-hidden flex items-center justify-center">
      <picture className="absolute inset-0 w-full h-full">
        {IMAGES.HERO.srcSet && (
          <source srcSet={IMAGES.HERO.srcSet} sizes="100vw" type="image/webp" />
        )}
        <img
          src={IMAGES.HERO.default}
          alt="Hero"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </picture>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 drop-shadow-lg text-white">
          Welcome to Lety's Buko Pie
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 drop-shadow-md font-medium text-white">
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
  );
}