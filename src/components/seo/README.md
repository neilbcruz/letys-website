# SEO Components

This directory contains all SEO-related components and utilities for the Lety's Buko Pie website.

## Components

### SEOHead

Main component for managing meta tags and Open Graph tags.

**Usage:**
```tsx
import { SEOHead } from '@/components/seo';

<SEOHead pageKey="home" />
```

**Props:**
- `pageKey`: string - The page identifier (home, products, locations, etc.)
- `customMeta?: Partial<PageMeta>` - Optional custom metadata to override defaults

### ProductSEOHead

SEO component for individual product pages.

**Usage:**
```tsx
import { ProductSEOHead } from '@/components/seo';

<ProductSEOHead
  productName="Buko Pie"
  productDescription="Authentic Filipino buko pie made with young coconut"
  productImage="/images/buko-pie.jpg"
  category="Specialties"
/>
```

### LocationSEOHead

SEO component for location pages with geolocation support.

**Usage:**
```tsx
import { LocationSEOHead } from '@/components/seo';

<LocationSEOHead
  locationName="Main Store"
  address={["National Road", "Barangay Anos", "Los Baños, Laguna"]}
  coords={{ lat: 14.181547, lng: 121.230956 }}
/>
```

### StructuredData

Component for injecting JSON-LD structured data.

**Usage:**
```tsx
import { StructuredData } from '@/components/seo';

<StructuredData type="localbusiness" />
<StructuredData type="products" />
<StructuredData type="faqpage" />
```

**Available Schema Components:**
- `LocalBusinessSchema` - Business information with all locations
- `ProductsSchema` - Product catalog with images and prices
- `FAQSchema` - Frequently asked questions
- `LocationSchema` - Individual location schema (props: `locationId`)

### GoogleAnalytics

Google Analytics 4 integration with automatic page view tracking.

**Usage:**
```tsx
import { GoogleAnalytics } from '@/components/seo';

function App() {
  return (
    <>
      <GoogleAnalytics />
      {/* App content */}
    </>
  );
}
```

### useGoogleAnalytics

Hook for tracking custom events and user interactions.

**Usage:**
```tsx
import { useGoogleAnalytics } from '@/components/seo';

function MyComponent() {
  const {
    trackEvent,
    trackPageView,
    trackProductView,
    trackContactFormSubmit,
    trackLocationClick
  } = useGoogleAnalytics();

  const handleClick = () => {
    trackEvent('custom_event', {
      parameter_name: 'value'
    });
  };

  return <button onClick={handleClick}>Track me</button>;
}
```

## Hooks

### useTrackClick

Track click events with automatic parameters.

```tsx
import { useTrackClick } from '@/components/seo';

const handleClick = useTrackClick({
  eventName: 'button_click',
  parameters: { button_name: 'subscribe' },
  onClick: () => console.log('Button clicked')
});
```

### useTrackNavigation

Track navigation events (internal and external).

```tsx
import { useTrackNavigation } from '@/components/seo';

const trackNav = useTrackNavigation();

<Link onClick={() => trackNav('/products', 'internal')}>
  Products
</Link>
```

### useTrackSearch

Track search events.

```tsx
import { useTrackSearch } from '@/components/seo';

const trackSearch = useTrackSearch();

const handleSearch = (term: string) => {
  trackSearch(term, results.length, 'all_products');
};
```

### useTrackFilter

Track filter events.

```tsx
import { useTrackFilter } from '@/components/seo';

const trackFilter = useTrackFilter();

<Select onChange={(value) => trackFilter('category', value)}>
```

### useTrackSocial

Track social media interactions.

```tsx
import { useTrackSocial } from '@/components/seo';

const trackSocial = useTrackSocial();

<button onClick={() => trackSocial('facebook', 'page')}>
  Share on Facebook
</button>
```

### useTrackVideo

Track video engagement.

```tsx
import { useTrackVideo } from '@/components/seo';

const { play, pause, complete } = useTrackVideo();

<video onPlay={() => play('Intro Video', '/videos/intro.mp4')} />
```

### useTrackDownload

Track file downloads.

```tsx
import { useTrackDownload } from '@/components/seo';

const trackDownload = useTrackDownload();

<a
  href="/menu.pdf"
  onClick={() => trackDownload('menu.pdf', 'pdf', 1024000)}
>
  Download Menu
</a>
```

### useTrackError

Track JavaScript errors.

```tsx
import { useTrackError } from '@/components/seo';

const trackError = useTrackError();

try {
  // Some operation
} catch (error) {
  trackError(error.message, 'TypeError', 'ProductCard');
}
```

### useTrackScrollDepth

Track how far users scroll on pages.

```tsx
import { useTrackScrollDepth } from '@/components/seo';

const trackScroll = useTrackScrollDepth();

useEffect(() => {
  const handleScroll = () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    trackScroll(scrollPercent);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## Higher-Order Components

### withProductViewTracking

Automatically track when products are viewed.

```tsx
import { withProductViewTracking } from '@/components/seo';

const ProductCard = withProductViewTracking(({ productName, category }) => {
  return <div>{productName}</div>;
});
```

### withClickTracking

Add click tracking to any component.

```tsx
import { withClickTracking } from '@/components/seo';

const Button = withClickTracking(
  OriginalButton,
  'button_click',
  (props) => ({ button_name: props.label })
);
```

### useContactFormTracking

Track contact form submissions.

```tsx
import { useContactFormTracking } from '@/components/seo';

function ContactForm() {
  const handleSubmit = useContactFormTracking(async (e) => {
    e.preventDefault();
    // Your form submission logic
  });

  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Constants

Import SEO constants for consistent configuration:

```tsx
import {
  SEO_CONFIG,
  EVENT_CATEGORIES,
  EVENT_ACTIONS,
  SCHEMA_TYPES,
  IMAGE_PRESETS
} from '@/components/seo';
```

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```bash
# Google Analytics 4
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_GA=true

# EmailJS (for contact form)
REACT_APP_SERVICE_ID=your_service_id
REACT_APP_TEMPLATE_ID=your_template_id
REACT_APP_USER_ID=your_user_id
```

### Site URL

Update `SITE_URL` in `/src/lib/seo.ts`:

```typescript
export const SITE_URL = 'https://letysbukopie.com';
```

## Best Practices

1. **Always use SEOHead** on every page with the correct pageKey
2. **Add structured data** for content types that support it
3. **Track important user interactions** with appropriate events
4. **Test structured data** with Google's Rich Results Test
5. **Keep meta descriptions** under 160 characters
6. **Use descriptive alt text** for all images
7. **Monitor analytics** regularly to understand user behavior

## Testing

### Structured Data Validation

Use these tools to validate your structured data:

1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema Markup Validator](https://validator.schema.org/)
3. [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
4. [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Analytics Testing

To test Google Analytics in development:

1. Set `VITE_ENABLE_GA=true` in your `.env` file
2. Use the Google Analytics Debugger Chrome extension
3. Check the Real-Time report in Google Analytics
4. Use the `gtag` function in browser console:

```javascript
// Check if GA is loaded
console.log(gtag);

// Send test event
gtag('event', 'test_event', { test_parameter: 'value' });
```

## File Structure

```
src/components/seo/
├── SEOHead.tsx              # Meta tags and Open Graph
├── StructuredData.tsx       # JSON-LD schema components
├── GoogleAnalytics.tsx      # GA4 integration and hooks
├── EventTracker.tsx         # Advanced event tracking hooks
├── SEOConstants.ts          # SEO configuration constants
├── index.ts                 # Public API exports
└── README.md                # This file
```

## Related Files

- `/src/lib/seo.ts` - SEO utility functions and page metadata
- `/src/data/locations.ts` - Location data with coordinates
- `/src/data/products.ts` - Product catalog
- `/public/robots.txt` - Search engine crawler rules
- `/src/scripts/generate-sitemap.ts` - Sitemap generator

## Support

For detailed documentation, see `/docs/SEO_ANALYTICS_GUIDE.md`.
