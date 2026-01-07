const images = import.meta.glob('../assets/images/webp/*.webp', { eager: true, import: 'default' });

export const IMAGE_MAP: Record<string, string> = {};

for (const path in images) {
    const name = path.split('/').pop()!.replace('.webp', '');
    IMAGE_MAP[name] = images[path] as string;
}
