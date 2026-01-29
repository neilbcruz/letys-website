import { IMAGES } from "@/lib/images";

interface PageHeroNarrowProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export default function PageHeroNarrow({ title, subtitle, icon }: PageHeroNarrowProps) {
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

        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl text-lg font-medium text-white drop-shadow-md sm:text-xl lg:text-2xl">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
