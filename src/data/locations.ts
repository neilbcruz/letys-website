// src/data/locations.ts
// Unified location and store data for all branches

import type { LocationIconName } from '@/lib/locationIcons';

export interface Location {
  // Core identification
  id: string;
  name: string;
  displayName: string;
  
  // Physical location
  address: string[];
  coords: { lat: number; lng: number };
  mapLink: string;
  
  // Store details
  storeId: string; // letys-ops store id ('main' | 'shell' | 'pansol')
  image: string;
  icon: LocationIconName;
  color: string; // Theme color for UI
  
  // Operating hours
  hours: Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', [string, string]>;
  
  // Features & inventory
  hasInventoryAPI: boolean; // Whether this store has API access
  specialNotes?: string[]; // e.g., "Frozen Buko Pie not available"
}

export const LOCATIONS: Location[] = [
  {
    id: 'main',
    name: 'Main Store',
    displayName: 'MAIN STORE',
    storeId: 'main',
    
    address: [
      "Lety's Buko Pie, National Road,", 
      "Barangay Anos, Los Baños, Laguna", 
      "(in front of Heaven's Memorial Garden)"
    ],
    coords: { lat: 14.181547, lng: 121.230956 },
    mapLink: "https://goo.gl/maps/6v5HKFPuKa7StZoMA",
    
    image: "location-main",
    icon: "Store",
    color: "brand",
    
    hours: {
      mon: ["06:00","18:00"],
      tue: ["06:00","18:00"],
      wed: ["06:00","18:00"],
      thu: ["06:00","18:00"],
      fri: ["06:00","18:00"],
      sat: ["06:00","18:00"],
      sun: ["06:00","18:00"]
    },
    
    hasInventoryAPI: true,
  },
  {
    id: 'shell',
    name: 'Shell Branch',
    displayName: 'ANOS SHELL BRANCH',
    storeId: 'shell',
    
    address: [
      "56JH+HPC, National Hwy,", 
      "Barangay Anos, Los Baños, Laguna", 
      "(beside Shell Gas Station)"
    ],
    coords: { lat: 14.181495, lng: 121.229211 },
    mapLink: "https://maps.app.goo.gl/sJpTk76p5udHyA6b8",
    
    image: "location-shell",
    icon: "Fuel",
    color: "brand-muted",
    
    hours: {
      mon: ["07:00","16:00"],
      tue: ["07:00","16:00"],
      wed: ["07:00","16:00"],
      thu: ["07:00","16:00"],
      fri: ["07:00","16:00"],
      sat: ["07:00","16:00"],
      sun: ["07:00","16:00"]
    },
    
    hasInventoryAPI: true,
  },
  {
    id: 'agapita',
    name: 'Agapita Branch',
    displayName: 'AGAPITA BRANCH',
    storeId: 'agapita', // no letys-ops store yet — hasInventoryAPI stays false
    
    address: [
      "Lety's Buko Pie, Agapita Plaza,", 
      "Barangay Umali, Los Baños, Laguna", 
      "(near UPLB)"
    ],
    coords: { lat: 14.172584, lng: 121.243385 },
    mapLink: "https://goo.gl/maps/TX86xgAPRUh7VyRm8",
    
    image: "location-agapita",
    icon: "GraduationCap",
    color: "brand-hover",
    
    hours: {
      mon: ["06:00","18:00"],
      tue: ["06:00","18:00"],
      wed: ["06:00","18:00"],
      thu: ["06:00","18:00"],
      fri: ["06:00","18:00"],
      sat: ["06:00","18:00"],
      sun: ["06:00","18:00"]
    },
    
    hasInventoryAPI: false, // Set to true when API is available
  },
  {
    id: 'pansol',
    name: 'Pansol Branch',
    displayName: 'PANSOL BRANCH',
    storeId: 'pansol',
    
    address: [
      "Lety's Buko Pie, Pansol,", 
      "Calamba City, Laguna", 
      "(near Cuyab Resort)"
    ],
    coords: { lat: 14.181741, lng: 121.178139 },
    mapLink: "https://goo.gl/maps/n4piamTpgqPmFqpH6",
    
    image: "location-pansol",
    icon: "MapPin",
    color: "brand-muted",
    
    hours: {
      mon: ["07:30","16:30"],
      tue: ["07:30","16:30"],
      wed: ["07:30","16:30"],
      thu: ["07:30","16:30"],
      fri: ["07:30","16:30"],
      sat: ["07:30","16:30"],
      sun: ["07:30","16:30"]
    },
    
    hasInventoryAPI: true,
    specialNotes: ["Frozen Buko Pie not available at this location"],
  }
];

// Helper functions

/**
 * Get all locations
 */
export function getAllLocations(): Location[] {
  return LOCATIONS;
}

/**
 * Get locations with inventory API access
 */
export function getInventoryLocations(): Location[] {
  return LOCATIONS.filter(loc => loc.hasInventoryAPI);
}

/**
 * Get location by ID
 */
export function getLocationById(id: string): Location | undefined {
  return LOCATIONS.find(loc => loc.id === id);
}

/**
 * Get location by store ID (letys-ops store identifier)
 */
export function getLocationByStoreId(storeId: string): Location | undefined {
  return LOCATIONS.find(loc => loc.storeId === storeId);
}

/**
 * Get store display name by store ID
 */
export function getStoreDisplayName(storeId: string): string {
  const location = getLocationByStoreId(storeId);
  return location?.displayName || storeId;
}

/**
 * Format hours for display
 */
export function formatHours(hours: Location['hours'], day?: keyof Location['hours']): string {
  if (day) {
    const [open, close] = hours[day] ?? ['00:00', '00:00'];
    return formatTimeRange(open, close);
  }

  // Check if all days have same hours
  const allHours = Object.values(hours);
  const firstHours = allHours[0]?.join('-');
  const allSame = allHours.every(h => h?.join('-') === firstHours);

  if (allSame && firstHours) {
    return `${formatTimeRange(hours.mon[0] ?? '00:00', hours.mon[1] ?? '00:00')} Daily`;
  }

  return 'See schedule for details';
}

/**
 * Format a single 24h "HH:MM" time as a 12-hour clock (e.g., "06:00" -> "6:00 AM")
 */
export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
}

/**
 * Format time range (e.g., "06:00" - "18:00" -> "6:00 AM - 6:00 PM")
 */
function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} - ${formatTime(end)}`;
}

/**
 * Parse a 24h "HH:MM" time to minutes since midnight
 */
function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

/** Day keys indexed by Date.getDay() (Sunday-first) */
const DAY_KEYS: (keyof Location['hours'])[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

/**
 * Check if store is currently open
 */
export function isStoreOpen(location: Location): boolean {
  return getStoreStatus(location).isOpen;
}

/**
 * Current open/closed status of a store with a label for the next transition
 * (e.g., "Open Now · Closes 6:00 PM" or "Closed · Opens 7:00 AM tomorrow")
 */
export interface StoreStatus {
  isOpen: boolean;
  label: string;
}

/**
 * Get a store's current status with a label showing when it next opens or closes
 */
export function getStoreStatus(location: Location): StoreStatus {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const [openStr, closeStr] = location.hours[DAY_KEYS[now.getDay()]];
  const openMinutes = parseTimeToMinutes(openStr);
  const closeMinutes = parseTimeToMinutes(closeStr);

  if (nowMinutes >= openMinutes && nowMinutes <= closeMinutes) {
    return { isOpen: true, label: `Open Now · Closes ${formatTime(closeStr)}` };
  }

  if (nowMinutes < openMinutes) {
    return { isOpen: false, label: `Closed · Opens ${formatTime(openStr)}` };
  }

  // Past closing time — the next opening is tomorrow's
  const [nextOpenStr] = location.hours[DAY_KEYS[(now.getDay() + 1) % 7]];
  return { isOpen: false, label: `Closed · Opens ${formatTime(nextOpenStr)} tomorrow` };
}


/**
 * Get distance between two coordinates (in km)
 * Uses Haversine formula
 */
export function getDistance(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Find nearest location to given coordinates
 */
export function findNearestLocation(
  userCoords: { lat: number; lng: number }
): Location | undefined {
  if (LOCATIONS.length === 0) return undefined;
  
  return LOCATIONS.reduce((nearest, location) => {
    const distToCurrent = getDistance(userCoords, location.coords);
    const distToNearest = getDistance(userCoords, nearest.coords);
    return distToCurrent < distToNearest ? location : nearest;
  });
}
