import {
  Fuel,
  GraduationCap,
  MapPin,
  Store,
  type LucideIcon,
} from 'lucide-react';

export const locationIconMap = {
  Fuel,
  GraduationCap,
  MapPin,
  Store,
} satisfies Record<string, LucideIcon>;

export type LocationIconName = keyof typeof locationIconMap;

export function getLocationIcon(iconName: LocationIconName): LucideIcon {
  return locationIconMap[iconName];
}
