// src/lib/images.ts
// -----------------

// Auto-import all images
const images = import.meta.glob('@/assets/images/webp/**/*.{webp,png}', { eager: true, import: 'default' });

export interface ImageSet {
  default: string;
  srcSet?: string;
}

export const IMAGE_MAP: Record<string, ImageSet> = {};

// Build the responsive image map
for (const path in images) {
  const filename = path.split('/').pop();
  if (!filename) continue;

  const match = filename.match(/(.+?)(-(\d+)w)?\.(webp|png)$/);
  if (!match) continue;

  const [, baseName, , width] = match;
  const url = images[path] as string;

  if (!IMAGE_MAP[baseName]) IMAGE_MAP[baseName] = { default: url };

  if (width) {
    IMAGE_MAP[baseName].srcSet = IMAGE_MAP[baseName].srcSet
      ? `${IMAGE_MAP[baseName].srcSet}, ${url} ${width}w`
      : `${url} ${width}w`;
  }
}

// Return valid srcSet
export function getResponsiveImage(name: string): ImageSet {
  const img = IMAGE_MAP[name];
  if (!img) {
    console.warn(`Image not found: ${name}. Using fallback.`);
    return { default: '/assets/images/fallback.png' as string }; // fallback image path
  }
  return img;
}

// Predefined images
export const IMAGES = {
  BUKO_PIE: getResponsiveImage('buko_pie-12'),
  BUKO_TREE: getResponsiveImage('buko-tree'),
  LETY: getResponsiveImage('lety-1'),
  CASSAVA: getResponsiveImage('cassava-10'),
  PASALUBONG: getResponsiveImage('pasalubong-2'),
  MAIN_STORE: getResponsiveImage('location-main'),
  LETYS_LOGO: getResponsiveImage('letys-logo'),
  LETYS_LOGO2: getResponsiveImage('letys-logo2'),
  HERO: getResponsiveImage('letys_buko_pie-1'),
  HERO_NARROW: getResponsiveImage('buko-tree'),
} as const;

export type ImageKey = keyof typeof IMAGES;
