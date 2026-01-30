# SEO & Analytics Setup Guide

This guide explains the SEO and analytics features implemented for Lety's Buko Pie website.

## Features Implemented

### 1. Structured Data (JSON-LD)

The website includes comprehensive structured data for better search engine visibility:

#### LocalBusiness Schema
- Multi-location bakery schema with all store information
- Opening hours for each location
- Geo-coordinates for each store
- Contact information and social media links
- Service area information

#### Product Schema
- All products from the catalog with proper categorization
- Brand and manufacturer information
- Offer details (pricing, availability)

#### FAQPage Schema
- All FAQ items with questions and answers
- Proper schema markup for FAQ rich snippets

#### Location Schema
- Individual schemas for each store location
- Address, coordinates, and business hours
- Maps integration

**Location:** `/src/components/seo/StructuredData.tsx`

### 2. Google Analytics 4 Integration

Complete GA4 integration with:

#### Page View Tracking
- Automatic page view tracking on route changes
- Proper page path, location, and title capture

#### Custom Event Tracking
- `view_item` - When products are viewed
- `generate_lead` - Contact form submissions
- `select_content` - Location interactions
- Custom event tracking support for any interaction

#### React Hooks
- `useGoogleAnalytics()` - Main hook for analytics tracking
- `useContactFormTracking()` - HOC for form submission tracking
- `withProductViewTracking()` - HOC for product view tracking

**Location:** `/src/components/seo/GoogleAnalytics.tsx`

### 3. Meta Tag Optimization

#### Page-Specific Meta Tags
Each page has optimized:
- Title tags (60-70 characters)
- Meta descriptions (150-160 characters)
- Keywords
- Canonical URLs

#### Open Graph Tags
- OG titles and descriptions
- OG images
- OG URLs
- OG type (website, product, bakery, etc.)

#### Twitter Card Tags
- Large image summary cards
- Twitter-specific meta tags
- Image dimensions optimized

#### Additional Meta Tags
- Viewport and theme-color
- Author and robots
- Language specification
- Geo-location tags

**Location:** `/src/lib/seo.ts` and `/src/components/seo/SEOHead.tsx`

### 4. Local SEO

#### Geographic Metadata
- Geo region (PH-LAG)
- Place names (Los Baños, Laguna)
- ICBM coordinates
- Geo position meta tags

#### Business Hours Schema
- Proper opening hours format
- Day-specific hours when applicable
- Structured for search engines

#### Store Location Data
- Complete address information
- Phone numbers
- Maps integration
- Service area definition

## Setup Instructions

### 1. Environment Configuration

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Add your Google Analytics Measurement ID:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_GA=true
```

3. Get your GA4 Measurement ID from: https://analytics.google.com/

### 2. Update Site Information

Edit `/src/lib/seo.ts` to update:

```typescript
export const SITE_URL = 'https://letysbukopie.com';

export const DEFAULT_META = {
  title: "Lety's Buko Pie - The Best Buko Pie in Laguna",
  description: "...",
  // Update with actual values
};
```

### 3. Update Contact Information

Edit `/src/components/seo/StructuredData.tsx`:

```typescript
telephone: '+63-917-123-4567',
email: 'hello@letysbukopie.com',
```

### 4. Add Social Media Links

Update in `StructuredData.tsx`:

```typescript
sameAs: [
  'https://www.facebook.com/letysbukopie',
  'https://www.instagram.com/letysbukopie'
]
```

### 5. Update Images

Ensure these images exist in your `/public/` folder:
- `logo.jpg` - Company logo for structured data
- `og-image.jpg` - Default Open Graph image (1200x630px)
- `og-home.jpg` - Home page OG image
- `og-products.jpg` - Products page OG image
- `favicon-32x32.png` - 32x32 favicon
- `favicon-16x16.png` - 16x16 favicon
- `apple-touch-icon.png` - 180x180 Apple touch icon
- `site.webmanifest` - Web app manifest

## Usage Examples

### Adding SEO to a New Page

```tsx
import { SEOHead } from '@/components/seo';

export default function NewPage() {
  return (
    <>
      <SEOHead pageKey="newpage" />
      {/* page content */}
    </>
  );
}
```

### Tracking Custom Events

```tsx
import { useGoogleAnalytics } from '@/components/seo';

export default function MyComponent() {
  const { trackEvent } = useGoogleAnalytics();

  const handleClick = () => {
    trackEvent('custom_event', {
      parameter_name: 'value'
    });
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### Tracking Product Views

```tsx
import { withProductViewTracking } from '@/components/seo';

const ProductCard = withProductViewTracking(ProductCardComponent);

<ProductCard productName="Buko Pie" category="Specialties" />
```

## Component Reference

### SEOHead Props

```typescript
interface SEOHeadProps {
  pageKey: string;           // Page identifier (home, products, etc.)
  customMeta?: Partial<PageMeta>;  // Override default metadata
}
```

### StructuredData Props

```typescript
interface StructuredDataProps {
  type?: 'localbusiness' | 'products' | 'faqpage' | 'all';
  locationId?: string;       // For location-specific schema
}
```

### Google Analytics Hooks

```typescript
// Main analytics hook
const {
  trackEvent,           // Track custom events
  trackPageView,        // Track page views
  trackProductView,     // Track product views
  trackContactFormSubmit, // Track form submissions
  trackLocationClick    // Track location clicks
} = useGoogleAnalytics();

// Form tracking HOC
const handleSubmit = useContactFormTracking(originalHandler);
```

## Testing

### Validate Structured Data

1. Google's Rich Results Test: https://search.google.com/test/rich-results
2. Schema.org Validator: https://validator.schema.org/

### Check Meta Tags

1. View page source and check `<head>` section
2. Use browser extensions like "Meta SEO Inspector"
3. Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/

### Verify Analytics

1. Check Google Analytics Real-Time report
2. Trigger events and verify they appear
3. Check DebugView for event parameters

## Best Practices

### Meta Tags
- Keep titles under 70 characters
- Keep descriptions under 160 characters
- Use unique titles and descriptions for each page
- Include target keywords naturally

### Structured Data
- Keep schema markup accurate
- Update when business info changes
- Test regularly with Google's tools
- Include all required fields

### Analytics
- Don't track personal data (GDPR/CCPA)
- Use meaningful event names
- Add event parameters for context
- Test events before deploying

### Performance
- Async load analytics scripts
- Don't block rendering
- Use page view tracking efficiently
- Limit custom event tracking

## Maintenance

### Regular Tasks
- [ ] Update business hours if they change
- [ ] Add new products to product schema
- [ ] Review and update meta descriptions
- [ ] Check analytics for tracking issues
- [ ] Update OG images for new content
- [ ] Test structured data after major changes

### SEO Checklist
- [ ] All pages have unique titles and descriptions
- [ ] All pages have canonical URLs
- [ ] All images have alt text
- [ ] Internal links use descriptive anchor text
- [ ] Mobile-friendly design maintained
- [ ] Page speed optimized
- [ ] Structured data valid
- [ ] Analytics tracking working

## Troubleshooting

### Analytics Not Working
- Check GA_MEASUREMENT_ID is correct
- Verify VITE_ENABLE_GA=true
- Check browser console for errors
- Verify ad blockers aren't blocking analytics
- Check network tab for gtag calls

### Structured Data Not Showing
- Validate with Google's tools
- Check JSON-LD syntax
- Verify script is in head
- Check for console errors
- Ensure proper schema.org types

### Meta Tags Not Updating
- Clear browser cache
- Check for caching plugins
- Verify HelmetProvider is set up
- Check for multiple meta tags
- Inspect element to verify

## Additional Resources

- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Google Analytics 4](https://support.google.com/analytics/answer/9304153)

## Support

For issues or questions about SEO and analytics implementation:
1. Check the component documentation
2. Review the examples above
3. Validate with testing tools
4. Check browser console for errors
