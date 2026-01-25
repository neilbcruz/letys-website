import { IMAGES } from "@/lib/images";

export default function PageHero() {
  return (
    <div className="w-full h-40 tablet:h-60 desktop:h-80 relative overflow-hidden flex items-center px-4 tablet:px-8 desktop:px-40">
      <picture className="absolute inset-0 w-full h-full">
        {IMAGES.HERO.srcSet && (
          <source srcSet={IMAGES.HERO.srcSet} sizes="100vw" type="image/webp" />
        )}
        <img
          src={IMAGES.HERO.default}
          alt="Hero"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content goes here
      <div className="relative z-10 text-white font-bold text-2xl">
        Welcome to Lety's Buko Pie
      </div> */}
    </div>
  );
}
