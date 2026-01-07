const images = import.meta.glob('../assets/images/webp/*.webp', { eager: true, import: 'default' });

export const IMAGE_MAP: Record<string, string> = {};

for (const path in images) {
    const name = path.split('/').pop()!.replace('.webp', '');
    IMAGE_MAP[name] = images[path] as string;
}

export const IMAGES = {
  BUKO_PIE: IMAGE_MAP['buko_pie-12'],
  BUKO_TREE: IMAGE_MAP['buko-tree'],
  LETY: IMAGE_MAP['lety-1'],
  CASSAVA: IMAGE_MAP['cassava-10'],
  PASALUBONG: IMAGE_MAP['pasalubong-2'],
  MAIN_STORE: IMAGE_MAP['location-main'],
  LETYS_LOGO: IMAGE_MAP['letys-logo'],
  LETYS_LOGO2: IMAGE_MAP['letys-logo2'],
  FACEBOOK: IMAGE_MAP['facebook'],
  GOOGLE: IMAGE_MAP['googlemail'],
  HERO: IMAGE_MAP['letys_buko_pie-2']
} as const;