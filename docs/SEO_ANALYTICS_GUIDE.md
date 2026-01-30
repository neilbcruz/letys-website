# SEO & Analytics Implementation Guide

This guide explains the SEO and Analytics features implemented in the Lety's Buko Pie website.

## Table of Contents

1. [Overview](#overview)
2. [SEO Components](#seo-components)
3. [Google Analytics 4](#google-analytics-4)
4. [Structured Data (JSON-LD)](#structured-data-json-ld)
5. [Meta Tags & Social Sharing](#meta-tags--social-sharing)
6. [Local SEO](#local-seo)
7. [Configuration](#configuration)
8. [Best Practices](#best-practices)

## Overview

The website includes comprehensive SEO and Analytics features:

- **Google Analytics 4** integration with event tracking
- **JSON-LD structured data** for LocalBusiness, Products, and FAQPage
- **Optimized meta tags** with Open Graph and Twitter Card support
- **Local SEO** with geolocation and business hours
- **Dynamic sitemap** and **robots.txt** generation
- **Product view tracking** for analytics

## SEO Components

### SEOHead Component

The `SEOHead` component manages meta tags for each page:

```tsx
import { SEOHead } from '@/components/seo';

<SEOHead pageKey="home" />
```

**Available page keys:**
- `home` - Homepage
- `products` - Products page
- `availability` - Product availability checker
- `locations` - Store locations
- `faq` - FAQ page
- `contact` - Contact page

### Product SEO Head

For individual product pages:

```tsx
import { ProductSEOHead } from '@/components/seo';

<ProductSEOHead
  productName="Buko Pie"
  productDescription="Authentic Filipino buko pie"
  productImage="/images/buko-pie.jpg"
  category="Specialties"
/>
```

### Location SEO Head

For location-specific pages:

```tsx
import { LocationSEOHead } from '@/components/seo';

<LocationSEOHead
  locationName="Main Store"
  address={["National Road", "Los Baños, Laguna"]}
  coords={{ lat: 14.181547, lng: 121.230956 }}
/>
```

## Google Analytics 4

### Setup

1. Create a Google Analytics 4 property at https://analytics.google.com/
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add it to your `.env` file:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_ENABLE_GA=true
```

### Integration

The Google Analytics is automatically integrated in `App.tsx`:

```tsx
import { GoogleAnalytics } from '@/components/seo';

function App() {
  return (
    <>
      <GoogleAnalytics />
      {/* Your app content */}
    </>
  );
}
```

### Event Tracking

#### Using the Hook

```tsx
import { useGoogleAnalytics } from '@/components/seo';

function MyComponent() {
  const { trackEvent, trackProductView, trackContactFormSubmit, trackLocationClick } = useGoogleAnalytics();

  // Track custom event
  const handleButtonClick = () => {
    trackEvent('custom_event', {
      parameter_name: 'value'
    });
  };

  // Track product view
  useEffect(() => {
    trackProductView('Buko Pie', 'Specialties');
  }, []);

  // Track contact form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    trackContactFormSubmit({
      name: 'Juan Dela Cruz',
      email: 'juan@example.com',
      subject: 'Inquiry'
    });
    // ... submit form
  };

  // Track location click
  const handleLocationClick = () => {
    trackLocationClick('Main Store');
  };
}
```

#### Using the HOC

```tsx
import { withProductViewTracking } from '@/components/seo';

const ProductCard = withProductViewTracking(({ productName, category }) => {
  return <div>{productName}</div>;
});
```

#### Using Contact Form Tracking

```tsx
import { useContactFormTracking } from '@/components/seo';

function ContactForm() {
  const handleSubmit = useContactFormTracking(async (e: FormEvent) => {
    // Your form submission logic
  });

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Tracked Events

The following events are automatically tracked:

1. **Page Views** - Automatic on route changes
2. **Product Views** - When products are displayed
3. **Contact Form Submissions** - When users submit the contact form
4. **Location Clicks** - When users interact with store locations

### Production vs Development

Google Analytics only loads in production or when `VITE_ENABLE_GA=true`:

```bash
# Development (GA disabled)
npm run dev

# Production (GA enabled)
npm run build

# Development with GA enabled
VITE_ENABLE_GA=true npm run dev
```

## Structured Data (JSON-LD)

### LocalBusiness Schema

Automatically includes business information for all locations:

```tsx
import { LocalBusinessSchema } from '@/components/seo';

<LocalBusinessSchema />
```

This generates structured data for:
- Business name, description, and contact info
- All store locations with addresses
- GPS coordinates for each location
- Business hours for each location
- Social media links
- Service area (Los Baños, Calamba, Laguna)

### Products Schema

```tsx
import { ProductsSchema } from '@/components/seo';

<ProductsSchema />
```

Includes structured data for:
- All products from `PRODUCT_DATA`
- Product categories
- Images and descriptions
- Brand information

### FAQPage Schema

```tsx
import { FAQSchema } from '@/components/seo';

<FAQSchema />
```

Generates FAQ structured data from `FAQ_ITEMS` in `FaqPage.tsx`.

### Location Schema

For individual location pages:

```tsx
import { LocationSchema } from '@/components/seo';

<LocationSchema locationId="main" />
```

## Meta Tags & Social Sharing

### Page-Specific Meta Tags

Each page has optimized meta tags defined in `/src/lib/seo.ts`:

```typescript
export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: "Lety's Buko Pie - The Best Buko Pie in Laguna Since 1997",
    description: "Experience the authentic taste...",
    keywords: ['buko pie', 'Laguna buko pie', ...],
    canonical: SITE_URL,
    og: {
      title: "...",
      description: "...",
      image: `${SITE_URL}/og-home.jpg`,
      url: SITE_URL
    }
  },
  // ... other pages
};
```

### Adding Custom Meta Tags

For custom meta tags on a page:

```tsx
<SEOHead
  pageKey="products"
  customMeta={{
    title: "Custom Title",
    description: "Custom description"
  }}
/>
```

### Open Graph Tags

Open Graph tags are automatically generated for social media sharing:

- `og:title` - Page title
- `og:description` - Page description
- `og:type` - Page type (website, product, etc.)
- `og:url` - Canonical URL
- `og:image` - Share image

### Twitter Card Tags

Twitter Card tags for Twitter sharing:

- `twitter:card` - Card type (summary_large_image)
- `twitter:title` - Title
- `twitter:description` - Description
- `twitter:image` - Image

### Image Requirements

For optimal social sharing, provide:
- **Recommended size**: 1200 x 630 pixels
- **Format**: JPG or PNG
- **File size**: Under 5MB
- **Location**: `/public/og-image.jpg`, `/public/og-home.jpg`, etc.

## Local SEO

### Geolocation

All store locations include GPS coordinates in the structured data:

```typescript
{
  coords: { lat: 14.181547, lng: 121.230956 }
}
```

This enables:
- Google Maps integration
- "Near me" searches
- Local business schema

### Business Hours

Structured data includes business hours for each location:

```tsx
openingHoursSpecification: [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', ...],
    opens: '06:00',
    closes: '18:00'
  }
]
```

### Location Pages

Each location has its own schema with:
- Full address
- GPS coordinates
- Business hours
- Phone number
- Map link

### Regional Meta Tags

The site includes regional meta tags:

```html
<meta name="geo.region" content="PH-LAG" />
<meta name="geo.placename" content="Los Baños, Laguna" />
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

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

Update the `SITE_URL` in `/src/lib/seo.ts`:

```typescript
export const SITE_URL = 'https://letysbukopie.com';
```

### Sitemap Generation

The sitemap is automatically generated during build:

```bash
npm run generate-sitemap
```

Or regenerate manually:

```bash
tsx src/scripts/generate-sitemap.ts
```

The sitemap includes:
- All static pages
- All location pages
- Product category pages
- Images for each page/product

## Best Practices

### 1. Regular Updates

- **Update sitemap** when adding new pages
- **Review meta descriptions** quarterly
- **Check structured data** with Google's Rich Results Test
- **Monitor analytics** for user behavior insights

### 2. Image Optimization

- Use WebP format when possible
- Compress images before upload
- Include alt text for all images
- Use responsive images with srcset

### 3. Content Strategy

- Keep meta descriptions under 160 characters
- Use keywords naturally in titles and descriptions
- Update FAQ items regularly
- Add new products with descriptions

### 4. Performance

- Enable lazy loading for images
- Minimize JavaScript bundle size
- Use CDN for static assets
- Monitor Core Web Vitals

### 5. Local SEO

- Keep business hours accurate
- Verify locations on Google Business Profile
- Encourage customer reviews
- Maintain consistent NAP (Name, Address, Phone)

### 6. Analytics Monitoring

Key metrics to track:
- **Page views** by location
- **Product views** and popularity
- **Contact form submissions**
- **User flow** from products to locations
- **Bounce rate** by page

### 7. Testing Tools

Use these tools to validate your SEO:

1. **Google Search Console** - https://search.google.com/search-console
2. **Rich Results Test** - https://search.google.com/test/rich-results
3. **PageSpeed Insights** - https://pagespeed.web.dev/
4. **Mobile-Friendly Test** - https://search.google.com/test/mobile-friendly
5. **Schema Markup Validator** - https://validator.schema.org/

## Troubleshooting

### Google Analytics Not Tracking

1. Check if `VITE_GA_MEASUREMENT_ID` is set correctly
2. Verify `VITE_ENABLE_GA=true` in production
3. Check browser console for errors
4. Ensure ad-blockers are disabled during testing
5. Use Google Analytics Debugger extension

### Structured Data Not Showing

1. Validate with Rich Results Test
2. Check JSON-LD syntax
3. Ensure required fields are populated
4. Verify no duplicate schemas on the page
5. Check for JavaScript errors

### Meta Tags Not Updating

1. Clear browser cache
2. Check for multiple SEOHead components
3. Verify pageKey is correct
4. Check React Helmet is rendering
5. View page source to confirm

### Sitemap Not Generated

1. Ensure build script runs `generate-sitemap`
2. Check file permissions
3. Verify NODE_ENV is set correctly
4. Check for TypeScript errors
5. Run manually with `tsx src/scripts/generate-sitemap.ts`

## Additional Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics#topic=9140703)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Google Search Central](https://developers.google.com/search)

## Support

For issues or questions about SEO and Analytics implementation:

1. Check the component documentation in `/src/components/seo/`
2. Review the SEO library in `/src/lib/seo.ts`
3. Validate structured data with online tools
4. Check browser console for errors
5. Review Google Analytics Real-Time reports
