# Components Documentation

This document provides comprehensive documentation for all React components in the Lety's Buko Pie website.

## Table of Contents

- [Component Categories](#component-categories)
- [UI Components](#ui-components)
- [Accessibility Components](#accessibility-components)
- [Layout Components](#layout-components)
- [SEO Components](#seo-components)
- [Home Page Components](#home-page-components)
- [Component Guidelines](#component-guidelines)

## Component Categories

### UI Components (`/src/components/ui/`)

Reusable UI primitives that can be used across the application.

### Accessibility Components (`/src/components/accessibility/`)

Components dedicated to enhancing accessibility and meeting WCAG standards.

### Layout Components (`/src/components/layout/`)

Structural components that define the page layout.

### SEO Components (`/src/components/seo/`)

Components for managing meta tags, structured data, and analytics.

### Home Page Components (`/src/components/home/`)

Components specific to the home page.

---

## UI Components

### StockBadge

**Location:** `/src/components/ui/StockBadge.tsx`

Displays product stock status with color-coded badges.

**Props:**
```typescript
interface StockBadgeProps {
  stockDetails: StockDetails;  // { qty: number; min: number }
  className?: string;
  showQuantity?: boolean;      // Default: true
}
```

**Usage:**
```tsx
import StockBadge from '@/components/ui/StockBadge';

<StockBadge stockDetails={{ qty: 15, min: 5 }} />
// Shows: "In Stock (15)" in green

<StockBadge stockDetails={{ qty: 3, min: 5 }} />
// Shows: "Low Stock (3 left)" in yellow

<StockBadge stockDetails={{ qty: 0, min: 5 }} />
// Shows: "Out of Stock" in red
```

**Accessibility:**
- Role="status" for screen reader announcements
- Aria-label provides context
- Color + text ensures information is conveyed without color alone

**Status Colors:**
- In Stock: `text-green-700 bg-green-100`
- Low Stock: `text-yellow-700 bg-yellow-100`
- Out of Stock: `text-red-600 bg-red-100`

---

### SearchInput

**Location:** `/src/components/ui/SearchInput.tsx`

Accessible search input with clear button.

**Props:**
```typescript
interface SearchInputProps {
  onSearch?: (value: string) => void;
  className?: string;
  placeholder?: string;        // Default: "Search..."
  icon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';   // Default: "md"
  clearable?: boolean;         // Default: true
  ariaLabel?: string;
}
```

**Usage:**
```tsx
import SearchInput from '@/components/ui/SearchInput';

<SearchInput
  placeholder="Search products..."
  onSearch={handleSearch}
  size="lg"
/>

<SearchInput
  ariaLabel="Search inventory"
  clearable={false}
  size="sm"
/>
```

**Features:**
- Auto-generates unique IDs for label association
- Clear button appears when text is entered
- Form submission handling
- Full keyboard navigation
- Touch-friendly clear button (44x44px minimum)

**Accessibility:**
- Hidden label for screen readers (`sr-only`)
- Proper ARIA labels on all interactive elements
- Icons marked with `aria-hidden`
- Semantic form structure

---

### SelectPicker

**Location:** `/src/components/ui/SelectPicker.tsx`

Accessible select dropdown built on Radix UI.

**Props:**
```typescript
interface SelectPickerProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}
```

**Usage:**
```tsx
import SelectPicker from '@/components/ui/SelectPicker';

<SelectPicker
  value={selectedStore}
  onChange={setSelectedStore}
  options={[
    { value: 'main', label: 'Main Store' },
    { value: 'shell', label: 'Shell Branch' },
  ]}
  placeholder="Select a store"
/>
```

**Accessibility:**
- Full keyboard navigation
- ARIA attributes managed by Radix UI
- Focus trap when open
- Screen reader announcements

---

### ScrollArea

**Location:** `/src/components/ui/ScrollArea.tsx`

Custom-styled scrollable container using Radix UI.

**Props:**
```typescript
interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
import ScrollArea from '@/components/ui/ScrollArea';

<ScrollArea className="h-96">
  <div>
    {/* Long content that scrolls */}
  </div>
</ScrollArea>
```

**Features:**
- Custom styled scrollbars
- Cross-browser consistency
- Smooth scrolling behavior

---

### LocationsMap

**Location:** `/src/components/ui/LocationsMap.tsx`

Interactive map showing store locations using Leaflet.

**Props:**
```typescript
interface LocationsMapProps {
  locations: Location[];
  selectedLocation?: Location;
  onLocationSelect?: (location: Location) => void;
  center?: [number, number];
  zoom?: number;
}
```

**Usage:**
```tsx
import LocationsMap from '@/components/ui/LocationsMap';
import { LOCATIONS } from '@/data/locations';

<LocationsMap
  locations={LOCATIONS}
  selectedLocation={selectedStore}
  onLocationSelect={handleStoreSelect}
  center={[14.1815, 121.2309]}
  zoom={12}
/>
```

**Features:**
- Custom color markers for each location
- Click to select location
- Responsive map sizing
- Popup with location info

**Accessibility:**
- Keyboard navigation on map
- Screen reader support via Leaflet
- Focus management on markers

---

### Skeleton Components

**Location:** `/src/components/ui/Skeleton/`

Loading placeholder components for various UI patterns.

#### SkeletonCard

```tsx
import { SkeletonCard } from '@/components/ui/Skeleton';

<SkeletonCard />
```

Card-shaped skeleton with image, title, and text placeholders.

#### SkeletonGrid

```tsx
import { SkeletonGrid } from '@/components/ui/Skeleton';

<SkeletonGrid count={6} />
```

Grid of card skeletons for product listings.

#### SkeletonTable

```tsx
import { SkeletonTable } from '@/components/ui/Skeleton';

<SkeletonTable rows={10} columns={5} />
```

Table-shaped skeleton for data tables.

#### SkeletonText

```tsx
import { SkeletonText } from '@/components/ui/Skeleton';

<SkeletonText lines={3} />
```

Text line skeletons for content loading.

#### LoadingSpinner

```tsx
import { LoadingSpinner } from '@/components/ui/Skeleton';

<LoadingSpinner size="lg" />
```

Circular loading spinner with size variants.

**Accessibility:**
- All skeletons use `aria-busy="true"`
- Announces loading state to screen readers
- Removed from accessibility tree when content loads

---

## Accessibility Components

### SkipLinks

**Location:** `/src/components/accessibility/SkipLinks.tsx`

Provides skip-to links for keyboard navigation.

**Usage:**
```tsx
import { SkipLinks } from '@/components/accessibility';

// Place at top of app
<SkipLinks />

// Ensure corresponding IDs exist:
<main id="main-content">
<nav id="navigation">
<footer id="footer">
```

**Features:**
- Links hidden until focused
- Tab through to see links
- Jumps to main content areas
- Required for WCAG 2.1 AA

**Accessibility:**
- Uses `.sr-only` CSS pattern
- `focus:not-sr-only` makes visible on focus
- Proper heading structure maintained

---

### VisuallyHidden

**Location:** `/src/components/accessibility/VisuallyHidden.tsx`

Hides content visually but keeps it available to screen readers.

**Usage:**
```tsx
import VisuallyHidden from '@/components/accessibility/VisuallyHidden';

<button>
  <VisuallyHidden>Close dialog</VisuallyHidden>
  <XIcon aria-hidden="true" />
</button>
```

**Use Cases:**
- Providing labels for icon-only buttons
- Adding context for screen readers
- Hidden form labels
- Additional instructions

---

### Announcement

**Location:** `/src/components/accessibility/Announcement.tsx`

Live region for announcing dynamic content changes.

**Usage:**
```tsx
import Announcement from '@/components/accessibility/Announcement';

<Announcement message="Products loaded successfully" />
```

**Props:**
```typescript
interface AnnouncementProps {
  message: string;
  politeness?: 'polite' | 'assertive';
}
```

**Features:**
- `aria-live` for screen reader announcements
- `polite`: waits for user to be idle
- `assertive`: interrupts immediately

---

### FocusTrap

**Location:** `/src/components/accessibility/FocusTrap.tsx`

Traps focus within a component (modals, dialogs).

**Usage:**
```tsx
import FocusTrap from '@/components/accessibility/FocusTrap';

<FocusTrap isActive={isOpen}>
  <Modal>
    {/* Focus cannot leave this while active */}
  </Modal>
</FocusTrap>
```

**Features:**
- Tab cycles within trapped area
- Shift+Tab cycles backwards
- Escape key can exit (configure)
- Restores focus on unmount

---

## Layout Components

### PageHeader

**Location:** `/src/components/layout/PageHeader.tsx`

Main site header with logo and navigation.

**Features:**
- Sticky positioning
- Responsive design (hamburger menu on mobile)
- Active link highlighting
- Skip to main content link
- Accessible navigation

**Usage:**
```tsx
import PageHeader from '@/components/layout/PageHeader';

<PageHeader />
```

**Accessibility:**
- `aria-label` on navigation
- Skip link for keyboard users
- Current page indication
- Semantic HTML structure

---

### PageFooter

**Location:** `/src/components/layout/PageFooter.tsx`

Site footer with links and information.

**Usage:**
```tsx
import PageFooter from '@/components/layout/PageFooter';

<PageFooter />
```

**Features:**
- Social media links
- Contact information
- Copyright notice
- Navigation links
- Accessible heading structure

---

### ModalMenu

**Location:** `/src/components/layout/ModalMenu.tsx`

Mobile navigation menu with smooth animations.

**Usage:**
```tsx
import ModalMenu from '@/components/layout/ModalMenu';

<ModalMenu
  isOpen={isMenuOpen}
  closeModal={() => setIsMenuOpen(false)}
/>
```

**Accessibility:**
- Focus trap when open
- Esc key closes menu
- Body scroll locked when open
- ARIA attributes for dialog

---

### Hamburger

**Location:** `/src/components/layout/Hamburger.tsx`

Animated hamburger menu icon.

**Usage:**
```tsx
import Hamburger from '@/components/layout/Hamburger';

<Hamburger />
```

**Features:**
- Smooth animation to X
- Accessible button
- ARIA labels

---

### PageHero

**Location:** `/src/components/layout/PageHeroNarrow.tsx`

Hero section component for page headers.

**Usage:**
```tsx
import PageHeroNarrow from '@/components/layout/PageHeroNarrow';

<PageHeroNarrow
  title="Our Products"
  subtitle="Fresh from the oven"
  image="hero-products"
/>
```

---

## SEO Components

### SEOHead

**Location:** `/src/components/seo/SEOHead.tsx`

Manages meta tags and Open Graph tags.

**Usage:**
```tsx
import SEOHead from '@/components/seo/SEOHead';

<SEOHead
  pageKey="products"
  customMeta={{
    title: "Custom Title",
    description: "Custom description"
  }}
/>
```

**Features:**
- Dynamic meta tags
- Open Graph for social sharing
- Twitter Card support
- Canonical URLs
- Structured data

---

### ProductSEOHead

**Location:** `/src/components/seo/SEOHead.tsx`

Specialized SEO for product pages.

**Usage:**
```tsx
import { ProductSEOHead } from '@/components/seo/SEOHead';

<ProductSEOHead
  productName="Buko Pie"
  productDescription="Our signature pie"
  productImage="/images/buko-pie.jpg"
  category="Specialties"
/>
```

**Features:**
- Product schema markup
- Rich snippets support
- Price and availability
- Brand information

---

### LocationSEOHead

**Location:** `/src/components/seo/SEOHead.tsx`

Specialized SEO for location pages.

**Usage:**
```tsx
import { LocationSEOHead } from '@/components/seo/SEOHead';

<LocationSEOHead
  locationName="Main Store"
  address={["National Road", "Los Baños, Laguna"]}
  coords={{ lat: 14.1815, lng: 121.2309 }}
/>
```

**Features:**
- Local business schema
- Geo meta tags
- Maps integration
- Address formatting

---

### GoogleAnalytics

**Location:** `/src/components/seo/GoogleAnalytics.tsx`

Google Analytics 4 integration.

**Usage:**
```tsx
import GoogleAnalytics from '@/components/seo/GoogleAnalytics';

<GoogleAnalytics />
```

**Features:**
- GA4 measurement
- Page view tracking
- Environment-aware (dev/prod)
- Privacy compliant

---

## Home Page Components

### PageHero

**Location:** `/src/components/home/PageHero.tsx`

Hero section with video background.

**Features:**
- Full-screen hero
- Video background
- Call-to-action buttons
- Responsive design

---

### PageBody

**Location:** `/src/components/home/PageBody.tsx`

Main content sections for home page.

**Features:**
- Featured products
- Category highlights
- Store information
- Testimonials

---

### BodyVideo

**Location:** `/src/components/home/BodyVideo.tsx`

Video background component.

**Usage:**
```tsx
import BodyVideo from '@/components/home/BodyVideo';

<BodyVideo videoSrc="/videos/hero.mp4" />
```

**Features:**
- Autoplay video
- Fallback image
- Performance optimized
- Mobile support

---

### GoogleMaps

**Location:** `/src/components/home/GoogleMaps.tsx`

Google Maps integration for locations.

**Usage:**
```tsx
import GoogleMaps from '@/components/home/GoogleMaps';

<GoogleMaps locations={LOCATIONS} />
```

**Features:**
- Multiple markers
- Custom icons
- Info windows
- Directions link

---

## Component Guidelines

### Creating New Components

1. **Choose the right location:**
   - `/src/components/ui/` - Reusable UI components
   - `/src/components/layout/` - Layout components
   - `/src/components/accessibility/` - A11y components
   - `/src/components/[page]/` - Page-specific components

2. **Follow the component template:**
   ```tsx
   // 1. Imports
   import { useState } from 'react';
   import { cn } from '@/lib/utils';

   // 2. Types/Interfaces
   interface MyComponentProps {
     title: string;
     onClick?: () => void;
   }

   // 3. Component with JSDoc
   /**
    * Brief description
    *
    * @component
    * @param props - Component props
    * @returns Rendered component
    *
    * @example
    * ```tsx
    * <MyComponent title="Hello" />
    * ```
    */
   export function MyComponent({ title, onClick }: MyComponentProps) {
     // 4. Hooks
     const [isOpen, setIsOpen] = useState(false);

     // 5. Event handlers
     const handleClick = () => {
       setIsOpen(true);
       onClick?.();
     };

     // 6. Render
     return (
       <div onClick={handleClick}>
         {title}
       </div>
     );
   }
   ```

3. **Add TypeScript types:**
   - Always type props
   - Use interfaces for object shapes
   - Export types if used externally
   - Avoid `any` type

4. **Ensure accessibility:**
   - Use semantic HTML
   - Add ARIA attributes
   - Support keyboard navigation
   - Test with screen reader

5. **Write tests:**
   - Unit tests for logic
   - Integration tests for interactions
   - Accessibility tests

### Component Naming

- **PascalCase** for component files: `ProductCard.tsx`
- **camelCase** for utilities: `formatPrice.ts`
- **kebab-case** for CSS classes
- **UPPER_SNAKE_CASE** for constants

### File Organization

```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.test.tsx  # Tests
├── index.ts                # Exports
└── types.ts                # Shared types (if complex)
```

### Performance Guidelines

1. **Use React.memo** for components that re-render unnecessarily
2. **Use useCallback** for event handlers passed to children
3. **Use useMemo** for expensive computations
4. **Lazy load** heavy components
5. **Code split** by route

### Testing Checklist

- [ ] Component renders without errors
- [ ] Props are validated
- [ ] Event handlers work
- [ ] Loading states display
- [ ] Error states display
- [ ] Keyboard navigation works
- [ ] Screen reader announces properly
- [ ] Focus management is correct
- [ ] Responsive design works

### Accessibility Checklist

- [ ] Semantic HTML elements used
- [ ] ARIA labels provided
- [ ] Keyboard navigation supported
- [ ] Focus indicators visible
- [ ] Color contrast sufficient (4.5:1)
- [ ] Forms have labels
- [ ] Images have alt text
- [ ] Live regions for dynamic content
- [ ] Skip links provided
- [ ] No keyboard traps

---

## Additional Resources

- [React Documentation](https://react.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
