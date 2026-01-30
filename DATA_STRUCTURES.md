# Data Structures Documentation

This document provides comprehensive information about data structures, types, and data management in the Lety's Buko Pie website.

## Table of Contents

- [Overview](#overview)
- [Product Data](#product-data)
- [Location Data](#location-data)
- [Navigation Data](#navigation-data)
- [Type Definitions](#type-definitions)
- [Helper Functions](#helper-functions)
- [Data Validation](#data-validation)

## Overview

The application uses centralized data structures to ensure consistency across components. All static data is managed in the `/src/data/` directory, while types are defined in `/src/types/`.

---

## Product Data

**Location:** `/src/data/products.ts`

### ProductItem Interface

```typescript
interface ProductItem {
  name: string;              // Product display name
  image?: string;            // Image key for images.ts
  price?: number | string;   // Optional price
  description?: string;      // Optional description
}
```

### ProductCategory Interface

```typescript
interface ProductCategory {
  id: string;                // Unique category identifier
  title: string;             // Category display title
  subtitle: string;          // Category subtitle
  layout: 'grid' | 'highlight' | 'list';  // Display layout
  heroImage?: string;        // Optional hero image key
  items: ProductItem[];      // Products in category
}
```

### Product Data Structure

```typescript
export const PRODUCT_DATA: ProductCategory[] = [
  {
    id: 'specialty',
    title: 'Specialties',
    subtitle: "Lety's Buko Pie Specialty Pies",
    layout: 'grid',
    items: [
      { name: "Buko Pie", image: "buko_pie-3" },
      { name: "Pineapple Pie", image: "pineapple_pie-3" },
      { name: "Buko Pineapple Pie", image: "bp_pie-1" },
      { name: "Frozen Buko Pie", image: "frozen_pie-1" },
    ]
  },
  {
    id: 'bakedgoods',
    title: 'Baked Goods',
    subtitle: "Lety's Buko Pie Baked Goods",
    layout: 'highlight',
    items: [
      { name: "Cassava Cake", image: "cassava-3" },
      { name: "Banana Bread" },
      { name: "Carrot Cake" },
      // ... more items
    ]
  },
  {
    id: 'pasalubong',
    title: 'Pasalubongs',
    subtitle: "Lety's Buko Pie Pasalubongs",
    layout: 'list',
    heroImage: "pasalubong-2",
    items: [
      { name: "Apas" },
      { name: "Banana Chips" },
      // ... more items
    ]
  }
];
```

### Store Availability Rules

```typescript
export const UNAVAILABLE_BY_STORE: Record<string, string[]> = {
  'letysbukopie-pansol': ['Frozen Buko Pie'],
};
```

**Usage:**
```typescript
import { isAvailableInStore } from '@/data/products';

// Check if product is available at store
const available = isAvailableInStore('letysbukopie-pansol', 'Frozen Buko Pie');
// Returns: false

const available2 = isAvailableInStore('letysbukopie-main', 'Frozen Buko Pie');
// Returns: true
```

### Helper Functions

#### `isAvailableInStore`

Checks if a product is available at a specific store.

```typescript
function isAvailableInStore(
  storeId: string,
  productName: string
): boolean
```

**Example:**
```typescript
const canSellFrozen = isAvailableInStore(
  'letysbukopie-pansol',
  'Frozen Buko Pie'
);
if (!canSellFrozen) {
  // Show "Not available at this location" message
}
```

#### `findProductByName`

Finds a product in PRODUCT_DATA by name.

```typescript
function findProductByName(name: string): ProductItem | undefined
```

**Example:**
```typescript
const product = findProductByName('Buko Pie');
// Returns: { name: "Buko Pie", image: "buko_pie-3" }
```

#### `getInventoryImageFromName`

Gets image data for a product from GraphQL item name.

```typescript
function getInventoryImageFromName(itemName: string): ResponsiveImageData
```

**Example:**
```typescript
const imageData = getInventoryImageFromName('Buko Pie');
// Returns: { default: "...", srcSet: "...", sizes: "..." }
```

---

## Location Data

**Location:** `/src/data/locations.ts`

### Location Interface

```typescript
interface Location {
  // Core identification
  id: string;                  // Internal ID (e.g., 'main')
  name: string;                // Display name (e.g., 'Main Store')
  displayName: string;         // Uppercase display (e.g., 'MAIN STORE')

  // Physical location
  address: string[];           // Address lines
  coords: { lat: number; lng: number };  // GPS coordinates
  mapLink: string;             // Google Maps link

  // Store details
  storeId: string;             // GraphQL store identifier
  image: string;               // Image key
  icon: string;                // Emoji icon
  color: string;               // Tailwind color class

  // Operating hours
  hours: Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun',
             [string, string]>;  // [open, close] in "HH:mm" format

  // Features & inventory
  hasInventoryAPI: boolean;    // Whether API access is available
  specialNotes?: string[];     // Special notes (e.g., product restrictions)
}
```

### Location Data Structure

```typescript
export const LOCATIONS: Location[] = [
  {
    id: 'main',
    name: 'Main Store',
    displayName: 'MAIN STORE',
    storeId: 'letysbukopie-main',

    address: [
      "Lety's Buko Pie, National Road,",
      "Barangay Anos, Los Baños, Laguna",
      "(in front of Heaven's Memorial Garden)"
    ],
    coords: { lat: 14.181547, lng: 121.230956 },
    mapLink: "https://goo.gl/maps/6v5HKFPuKa7StZoMA",

    image: "location-main",
    icon: "🏪",
    color: "primary-2",

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
  // ... more locations
];
```

### Helper Functions

#### `getAllLocations`

Returns all locations.

```typescript
function getAllLocations(): Location[]
```

**Example:**
```typescript
const allLocations = getAllLocations();
// Returns: Location[] array
```

#### `getInventoryLocations`

Returns locations that have inventory API access.

```typescript
function getInventoryLocations(): Location[]
```

**Example:**
```typescript
const apiLocations = getInventoryLocations();
// Filters locations where hasInventoryAPI === true
```

#### `getLocationById`

Finds a location by its internal ID.

```typescript
function getLocationById(id: string): Location | undefined
```

**Example:**
```typescript
const mainStore = getLocationById('main');
// Returns: Main store location object
```

#### `getLocationByStoreId`

Finds a location by GraphQL store ID.

```typescript
function getLocationByStoreId(storeId: string): Location | undefined
```

**Example:**
```typescript
const location = getLocationByStoreId('letysbukopie-main');
// Returns: Location object for main store
```

#### `getStoreDisplayName`

Gets display name for a store ID.

```typescript
function getStoreDisplayName(storeId: string): string
```

**Example:**
```typescript
const name = getStoreDisplayName('letysbukopie-main');
// Returns: "MAIN STORE"
```

#### `formatHours`

Formats operating hours for display.

```typescript
function formatHours(
  hours: Location['hours'],
  day?: keyof Location['hours']
): string
```

**Example:**
```typescript
const hours = formatHours(location.hours);
// Returns: "6:00 AM - 6:00 PM Daily" (if all same)

const mondayHours = formatHours(location.hours, 'mon');
// Returns: "6:00 AM - 6:00 PM"
```

#### `isStoreOpen`

Checks if a store is currently open.

```typescript
function isStoreOpen(location: Location): boolean
```

**Example:**
```typescript
if (isStoreOpen(mainStore)) {
  // Show "Open" badge
} else {
  // Show "Closed" badge with opening time
}
```

#### `getDistance`

Calculates distance between two coordinates in km.

```typescript
function getDistance(
  coord1: { lat: number; lng: number },
  coord2: { lat: number; lng: number }
): number
```

**Example:**
```typescript
const distance = getDistance(
  userCoords,
  store.coords
);
// Returns: distance in kilometers (Haversine formula)
```

#### `findNearestLocation`

Finds the nearest location to given coordinates.

```typescript
function findNearestLocation(
  userCoords: { lat: number; lng: number }
): Location | undefined
```

**Example:**
```typescript
// Get user's location
navigator.geolocation.getCurrentPosition((position) => {
  const nearest = findNearestLocation({
    lat: position.coords.latitude,
    lng: position.coords.longitude
  });
  // Show nearest store
});
```

---

## Navigation Data

**Location:** `/src/data/navItems.ts`

### NavItem Interface

```typescript
interface NavItem {
  label: string;      // Display text
  path: string;       // React Router path
}
```

### Navigation Data Structure

```typescript
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Availability', path: '/availability' },
  { label: 'Locations', path: '/locations' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];
```

**Usage:**
```typescript
import { NAV_ITEMS } from '@/data/navItems';

{NAV_ITEMS.map(item => (
  <NavLink key={item.path} to={item.path}>
    {item.label}
  </NavLink>
))}
```

---

## Type Definitions

**Location:** `/src/types/`

### GraphQL Types

```typescript
// Stock details from API
interface StockDetails {
  qty: number;    // Current quantity
  min: number;    // Minimum threshold
}

// Store item from API
interface StoreItem {
  name: string;
  category: string;
  categoryId: string;
  price: number;
  originalPrice: number;
  minPrice: number;
  maxPrice: number;
  discount: number;
  isParentItem: boolean;
  itemId: string;
  discountUnit: string;
  discountName: string;
  imagePath: string;
  color: string | null;
  options: string[];
  modifiers: string[];
  symbol: string;
  allowNegativeStock: boolean;
  stockDetails: StockDetails;
  description: string | null;
}
```

### API Response Types

```typescript
interface GetStoreItemsResponse {
  data: {
    getStoreItems: {
      items: StoreItem[];
    };
  };
}

interface QueryParams {
  storeName: string;
  pageNumber: number;
  pageSize: number;
  category?: string;
  itemName?: string;
}
```

### Hook Result Types

```typescript
interface UseStoreItemsResult {
  items: StoreItem[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
```

---

## Helper Functions

### Image Management

**Location:** `/src/lib/images.ts`

#### `getResponsiveImage`

Gets responsive image data with srcset.

```typescript
function getResponsiveImage(
  imageKey: string
): {
  default: string;
  srcSet: string;
  sizes: string;
}
```

**Example:**
```typescript
const imageData = getResponsiveImage('buko_pie-3');
// Returns image data for responsive rendering

<img
  src={imageData.default}
  srcSet={imageData.srcSet}
  sizes={imageData.sizes}
  alt="Buko Pie"
/>
```

### Utility Functions

**Location:** `/src/lib/utils.ts`

#### `cn`

Merges Tailwind CSS classes with proper precedence.

```typescript
import { cn } from '@/lib/utils';

const className = cn(
  'base-class',
  isActive && 'active-class',
  customClass
);
```

#### Other Utilities

```typescript
// Format utilities
function formatCurrency(amount: number): string
function formatDate(date: Date): string
function formatPhoneNumber(phone: string): string

// Validation utilities
function isValidEmail(email: string): boolean
function isValidPhoneNumber(phone: string): boolean
```

---

## Data Validation

### Product Data Validation

When adding new products, ensure:

1. **Name matches exactly** between static data and API
2. **Image keys exist** in `/public/assets/images/`
3. **Categories are consistent** with API categories
4. **Layout is appropriate** for content type

**Validation checklist:**
```typescript
// Check product exists in static data
const product = findProductByName(itemName);
if (!product) {
  console.warn(`Product not found: ${itemName}`);
}

// Check image exists
if (product?.image) {
  const imageData = getResponsiveImage(product.image);
  if (!imageData) {
    console.warn(`Image not found: ${product.image}`);
  }
}

// Check store availability
if (!isAvailableInStore(storeId, itemName)) {
  // Handle unavailable product
}
```

### Location Data Validation

When adding new locations, ensure:

1. **Coordinates are accurate** (use Google Maps)
2. **Store IDs match** backend identifiers
3. **Hours format is correct** ("HH:mm")
4. **Address is complete** with landmarks

**Validation example:**
```typescript
// Validate coordinates
if (coords.lat < -90 || coords.lat > 90) {
  throw new Error('Invalid latitude');
}

if (coords.lng < -180 || coords.lng > 180) {
  throw new Error('Invalid longitude');
}

// Validate hours format
const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
if (!timeRegex.test(hours.mon[0])) {
  throw new Error('Invalid time format');
}
```

---

## Best Practices

### Adding New Products

1. **Add to static data:**
   ```typescript
   {
     name: "New Product",
     image: "new-product-1",
     price: 150
   }
   ```

2. **Add image to assets:**
   ```
   /public/assets/images/new-product-1.webp
   /public/assets/images/new-product-1-2x.webp
   ```

3. **Update images.ts** if needed

4. **Test on multiple pages**

### Adding New Locations

1. **Get accurate coordinates** from Google Maps
2. **Create store ID** in backend
3. **Add to LOCATIONS array**
4. **Add location image** to assets
5. **Test maps and availability**

### Data Consistency

- Keep product names **case-sensitive**
- Use **exact matches** for lookups
- Normalize user input before comparison
- Cache expensive computations
- Validate API responses

### Type Safety

- Always import types from their source
- Export types used externally
- Use strict TypeScript settings
- Avoid type assertions
- Document complex types

---

## Data Flow

```
Static Data (products.ts, locations.ts)
         ↓
   Components use data
         ↓
   API fetches dynamic data
         ↓
   Merge and filter data
         ↓
   Display to users
```

### Example Flow: Product Availability

```
1. User selects store
   ↓
2. useStoreItems hook fetches inventory
   ↓
3. API returns all products
   ↓
4. Filter by isAvailableInStore()
   ↓
5. Display available items with stock status
```

---

## Troubleshooting

### Product Not Showing

1. Check name matches exactly
2. Verify image exists
3. Check store availability rules
4. Verify API category matches

### Location Not Working

1. Verify coordinates are correct
2. Check store ID matches backend
3. Ensure hours format is "HH:mm"
4. Test map link works

### Type Errors

1. Import types from correct location
2. Check for null/undefined handling
3. Verify interface properties match
4. Use TypeScript strict mode

---

## Additional Resources

- [GraphQL Service](./API_DOCUMENTATION.md)
- [Component Documentation](./COMPONENTS.md)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
