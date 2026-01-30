/**
 * SEO Head Component
 * Manages meta tags and Open Graph tags for all pages
 *
 * Features:
 * - Comprehensive meta tag optimization
 * - Open Graph tags for social sharing
 * - Twitter Card meta tags
 * - Geo and location meta tags
 * - Structured data integration
 */

import { Helmet } from 'react-helmet-async';
import { type PageMeta, generateMetaTags, getPageMeta, SITE_URL } from '@/lib/seo';

interface SEOHeadProps {
  pageKey: string;
  customMeta?: Partial<PageMeta>;
}

export default function SEOHead({ pageKey, customMeta }: SEOHeadProps) {
  const pageMeta = customMeta
    ? { ...getPageMeta(pageKey), ...customMeta }
    : getPageMeta(pageKey);

  const metaTags = generateMetaTags(pageMeta);
  const canonicalUrl = pageMeta.canonical || `${SITE_URL}/${pageKey === 'home' ? '' : pageKey}`;

  return (
    <Helmet>
      <title>{pageMeta.title}</title>
      <link rel="canonical" href={canonicalUrl} />

      {/* Meta Tags */}
      {metaTags.map((tag, index) => {
        if (tag.name) {
          return <meta key={index} name={tag.name} content={tag.content} />;
        }
        if (tag.property) {
          return <meta key={index} property={tag.property} content={tag.content} />;
        }
        return null;
      })}

      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#7C3AED" />
      <meta name="author" content="Lety's Buko Pie" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />

      {/* Geo Meta Tags for Local SEO */}
      <meta name="geo.region" content="PH-LAG" />
      <meta name="geo.placename" content="Los Baños, Laguna" />
      <meta name="geo.position" content="14.181547;121.230956" />
      <meta name="ICBM" content="14.181547, 121.230956" />

      {/* Additional Open Graph Tags */}
      <meta property="og:site_name" content="Lety's Buko Pie" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="tl_PH" />
      {pageMeta.og?.url && <meta property="og:url" content={pageMeta.og.url} />}
      <meta property="og:type" content={pageKey === 'products' ? 'product.item' : 'website'} />

      {/* Enhanced Twitter Card Tags */}
      <meta name="twitter:site" content="@letysbukopie" />
      <meta name="twitter:creator" content="@letysbukopie" />
      <meta name="twitter:domain" content="letysbukopie.com" />

      {/* Product-specific meta tags */}
      {pageKey === 'products' && (
        <>
          <meta property="product:brand" content="Lety's Buko Pie" />
          <meta property="product:availability:in_stock" content="true" />
          <meta property="product:condition" content="new" />
          <meta property="product:price:currency" content="PHP" />
          <meta property="product:retailer_item_id" content="letys-buko-pie" />
        </>
      )}

      {/* Local business meta tags */}
      {(pageKey === 'locations' || pageKey === 'home') && (
        <>
          <meta name="business:contact_data:street_address" content="National Road, Barangay Anos" />
          <meta name="business:contact_data:locality" content="Los Baños" />
          <meta name="business:contact_data:region" content="Laguna" />
          <meta name="business:contact_data:postal_code" content="4030" />
          <meta name="business:contact_data:country_name" content="Philippines" />
        </>
      )}

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Alternates */}
      <link rel="alternate" hrefLang="en" href={canonicalUrl} />
      <link rel="alternate" hrefLang="tl" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
    </Helmet>
  );
}

/**
 * Product Page SEO Head with dynamic product info
 * Enhanced with comprehensive Open Graph and Twitter Card tags
 */
interface ProductSEOHeadProps {
  productName: string;
  productDescription?: string;
  productImage?: string;
  category?: string;
  price?: number | string;
}

export function ProductSEOHead({
  productName,
  productDescription,
  productImage,
  category,
  price
}: ProductSEOHeadProps) {
  const title = `${productName} - Lety's Buko Pie | Authentic Filipino ${category || 'Delicacy'}`;
  const description = productDescription || `Order fresh ${productName} from Lety's Buko Pie. Authentic Filipino ${category || 'delicacy'} made with love in Los Baños, Laguna since 1997.`;
  const imageUrl = productImage || `${SITE_URL}/og-image.jpg`;
  const productUrl = `${SITE_URL}/products#${productName.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={productUrl} />

      {/* Enhanced Open Graph for Products */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="product" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${productName} from Lety's Buko Pie`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={productUrl} />
      <meta property="og:site_name" content="Lety's Buko Pie" />
      <meta property="product:brand" content="Lety's Buko Pie" />
      <meta property="product:availability:in_stock" content="true" />
      <meta property="product:condition" content="new" />
      {category && <meta property="product:category" content={category} />}
      {price && <meta property="product:price:amount" content={String(price)} />}
      {price && <meta property="product:price:currency" content="PHP" />}

      {/* Enhanced Twitter Card for Products */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@letysbukopie" />
      <meta name="twitter:creator" content="@letysbukopie" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${productName} from Lety's Buko Pie`} />

      {/* Additional SEO tags */}
      <meta name="keywords" content={`${productName}, buko pie, ${category || 'Filipino delicacy'}, Laguna buko pie, Los Baños, pasalubong, Lety's Buko Pie`} />
      <meta name="author" content="Lety's Buko Pie" />

      {/* Schema.org Product JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          '@id': `${productUrl}#product`,
          name: productName,
          description: productDescription,
          category: category,
          image: [imageUrl, `${SITE_URL}/logo.jpg`],
          brand: {
            '@type': 'Brand',
            '@id': `${SITE_URL}/#brand`,
            name: "Lety's Buko Pie",
            url: SITE_URL
          },
          offers: {
            '@type': 'Offer',
            price: price || 'Contact for price',
            priceCurrency: 'PHP',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Bakery',
              '@id': `${SITE_URL}/#organization`,
              name: "Lety's Buko Pie"
            },
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: '0',
                currency: 'PHP'
              }
            }
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.7',
            reviewCount: '500',
            bestRating: '5',
            worstRating: '1'
          }
        })}
      </script>
    </Helmet>
  );
}

/**
 * Location Page SEO Head with dynamic location info
 * Enhanced with geo-coordinates and local business schema
 */
interface LocationSEOHeadProps {
  locationName: string;
  address: string[];
  coords?: { lat: number; lng: number };
  hours?: Record<string, [string, string]>;
  mapLink?: string;
  imageUrl?: string;
}

export function LocationSEOHead({
  locationName,
  address,
  coords,
  hours,
  mapLink,
  imageUrl
}: LocationSEOHeadProps) {
  const title = `${locationName} - Lety's Buko Pie Location in Laguna`;
  const description = `Visit Lety's Buko Pie ${locationName}. Located at ${address.join(', ')}. ${hours ? 'Open daily with fresh buko pie and Filipino delicacies.' : ''} Get directions and store hours.`;
  const locationUrl = `${SITE_URL}/locations#${locationName.toLowerCase().replace(/\s+/g, '-')}`;
  const locationImageUrl = imageUrl || `${SITE_URL}/og-locations.jpg`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={locationUrl} />

      {/* Enhanced Geo Meta Tags */}
      {coords && (
        <>
          <meta name="geo.position" content={`${coords.lat};${coords.lng}`} />
          <meta name="geo.region" content="PH-LAG" />
          <meta name="geo.placename" content={address[1]?.split(',')[0]?.trim() || 'Los Baños'} />
          <meta name="ICBM" content={`${coords.lat}, ${coords.lng}`} />
        </>
      )}

      {/* Business Contact Data Meta Tags */}
      <meta name="business:contact_data:street_address" content={address[0] || ''} />
      <meta name="business:contact_data:locality" content={address[1]?.split(',')[0]?.trim() || 'Los Baños'} />
      <meta name="business:contact_data:region" content="Laguna" />
      <meta name="business:contact_data:postal_code" content="4030" />
      <meta name="business:contact_data:country_name" content="Philippines" />

      {/* Enhanced Open Graph for Locations */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="bakery" />
      <meta property="og:url" content={locationUrl} />
      <meta property="og:image" content={locationImageUrl} />
      <meta property="og:image:alt" content={`Lety's Buko Pie ${locationName}`} />
      <meta property="place:location:latitude" content={coords?.lat.toString() || ''} />
      <meta property="place:location:longitude" content={coords?.lng.toString() || ''} />

      {/* Enhanced Twitter Card for Locations */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@letysbukopie" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={locationImageUrl} />

      {/* Additional SEO tags */}
      <meta name="keywords" content={`${locationName}, buko pie near me, Laguna bakery, Los Baños bakery, Lety's Buko Pie location, Filipino bakery, pasalubong store`} />

      {/* Schema.org LocalBusiness JSON-LD */}
      {coords && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Bakery',
            '@id': `${locationUrl}#bakery`,
            name: `Lety's Buko Pie - ${locationName}`,
            description: `Lety's Buko Pie ${locationName} - Fresh buko pie and Filipino baked goods`,
            url: locationUrl,
            telephone: '+63-917-123-4567',
            email: 'hello@letysbukopie.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: address[0]?.replace('Lety\'s Buko Pie, ', '').trim() || address[0],
              addressLocality: address[1]?.split(',')[0]?.trim() || 'Los Baños',
              addressRegion: 'Laguna',
              addressCountry: 'PH',
              postalCode: '4030'
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: coords.lat,
              longitude: coords.lng
            },
            hasMap: mapLink,
            image: locationImageUrl,
            openingHoursSpecification: hours ? generateOpeningHoursSpecification(hours) : undefined,
            priceRange: '$$',
            servesCuisine: 'Filipino',
            parentOrganization: {
              '@type': 'Organization',
              name: "Lety's Buko Pie",
              url: SITE_URL
            }
          })}
        </script>
      )}
    </Helmet>
  );
}

/**
 * Helper to generate opening hours specification for location schema
 */
function generateOpeningHoursSpecification(hours: Record<string, [string, string]>) {
  const dayMap: Record<string, string> = {
    'mon': 'Monday',
    'tue': 'Tuesday',
    'wed': 'Wednesday',
    'thu': 'Thursday',
    'fri': 'Friday',
    'sat': 'Saturday',
    'sun': 'Sunday'
  };

  const allHours = Object.entries(hours);
  const firstHours = allHours[0][1];
  const allSame = allHours.every(([, h]) => h[0] === firstHours[0] && h[1] === firstHours[1]);

  if (allSame) {
    return [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: firstHours[0],
      closes: firstHours[1]
    }];
  }

  return Object.entries(hours).map(([day, [open, close]]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: dayMap[day] || day,
    opens: open,
    closes: close
  }));
}
