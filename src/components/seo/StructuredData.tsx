/**
 * Structured Data (JSON-LD) Component
 * Injects schema.org structured data for SEO
 *
 * Features:
 * - LocalBusiness schema with multiple locations (Bakery/FoodEstablishment)
 * - Product schema for all products with offers
 * - FAQPage schema for frequently asked questions
 * - Individual location schemas with geo-coordinates and business hours
 */

import { Helmet } from 'react-helmet-async';
import { LOCATIONS } from '@/data/locations';
import { PRODUCT_DATA } from '@/data/products';
import { FAQ_ITEMS } from '@/pages/FaqPage';
import { formatAddressForSD, formatOpeningHoursForSD, SITE_URL } from '@/lib/seo';

interface StructuredDataProps {
  type?: 'localbusiness' | 'products' | 'faqpage' | 'all';
  locationId?: string;
}

/**
 * LocalBusiness Schema for multiple locations
 * Uses both FoodEstablishment and Bakery types for better SEO
 */
function generateLocalBusinessSchema() {
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': `${SITE_URL}/#organization`,
    name: "Lety's Buko Pie",
    alternateName: "Lety's Buko Pie & Bakery",
    image: [
      `${SITE_URL}/logo.jpg`,
      `${SITE_URL}/og-home.jpg`,
      `${SITE_URL}/images/buko_pie-3.jpg`
    ],
    description: "Authentic Filipino buko pie and baked goods since 1997. Famous for our delicious buko pie, pineapple pie, and traditional pasalubong treats.",
    url: SITE_URL,
    telephone: '+63-917-123-4567',
    email: 'hello@letysbukopie.com',
    priceRange: '$$',
    servesCuisine: 'Filipino',
    foundingDate: '1997',
    foundingLocation: {
      '@type': 'City',
      name: 'Los Baños',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Laguna',
        addressCountry: 'PH'
      }
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Los Baños'
      },
      {
        '@type': 'City',
        name: 'Calamba'
      },
      {
        '@type': 'City',
        name: 'San Pablo'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Laguna'
      }
    ],
    location: LOCATIONS.map(location => ({
      '@type': 'Bakery',
      '@id': `${SITE_URL}/locations#${location.id}`,
      name: `Lety's Buko Pie - ${location.displayName}`,
      description: `Lety's Buko Pie ${location.name} - Fresh buko pie and Filipino baked goods. ${location.specialNotes ? location.specialNotes.join('. ') : ''}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.address[0]?.replace('Lety\'s Buko Pie, ', '') || location.address[0],
        addressLocality: extractCityFromAddress(location.address),
        addressRegion: 'Laguna',
        addressCountry: 'PH',
        postalCode: '4030'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.coords.lat,
        longitude: location.coords.lng
      },
      telephone: '+63-917-123-4567',
      openingHoursSpecification: generateOpeningHoursSpecification(location.hours),
      openingHours: formatOpeningHoursSimple(location.hours),
      hasMap: location.mapLink,
      url: `${SITE_URL}/locations#${location.id}`,
      image: `${SITE_URL}/images/${location.image}.jpg`,
      parentOrganization: {
        '@type': 'Organization',
        name: "Lety's Buko Pie",
        url: SITE_URL
      }
    })),
    sameAs: [
      'https://www.facebook.com/letysbukopie',
      'https://www.instagram.com/letysbukopie'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1'
    }
  };

  return businessSchema;
}

/**
 * Extract city name from address array
 */
function extractCityFromAddress(address: string[]): string {
  const cityLine = address.find(line => line.includes('Los Baños') || line.includes('Calamba'));
  if (cityLine) {
    if (cityLine.includes('Los Baños')) return 'Los Baños';
    if (cityLine.includes('Calamba')) return 'Calamba';
  }
  return 'Los Baños';
}

/**
 * Format opening hours in simple Schema.org format (e.g., "Mo-Su 06:00-18:00")
 */
function formatOpeningHoursSimple(hours: Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', [string, string]>): string[] {
  const dayMap: Record<string, string> = {
    'mon': 'Mo',
    'tue': 'Tu',
    'wed': 'We',
    'thu': 'Th',
    'fri': 'Fr',
    'sat': 'Sa',
    'sun': 'Su'
  };

  const allHours = Object.entries(hours);
  const firstHours = allHours[0][1];
  const allSame = allHours.every(([, h]) => h[0] === firstHours[0] && h[1] === firstHours[1]);

  if (allSame) {
    return [`Mo-Su ${firstHours[0]}-${firstHours[1]}`];
  }

  return Object.entries(hours).map(([day, [open, close]]) => {
    const dayCode = dayMap[day];
    return dayCode ? `${dayCode} ${open}-${close}` : '';
  }).filter(Boolean);
}

/**
 * Product Schema for all products
 * Enhanced with detailed descriptions, offers, and aggregate ratings
 */
function generateProductSchema() {
  const products = PRODUCT_DATA.flatMap(category =>
    category.items.map(item => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${SITE_URL}/products#${item.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: item.name,
      description: item.description || `Delicious ${item.name} from Lety's Buko Pie. Part of our ${category.title} collection.`,
      category: category.title === 'Specialties' ? 'Specialty Pies' :
                category.title === 'Baked Goods' ? 'Baked Goods & Desserts' :
                'Pasalubong & Filipino Treats',
      offers: {
        '@type': 'Offer',
        price: item.price ? (typeof item.price === 'number' ? item.price : 0) : 'Contact for price',
        priceCurrency: 'PHP',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Bakery',
          '@id': `${SITE_URL}/#organization`,
          name: "Lety's Buko Pie",
          url: SITE_URL
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0',
            currency: 'PHP'
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            businessDays: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
              ]
            }
          }
        }
      },
      image: item.image ? `${SITE_URL}/images/${item.image}.jpg` : `${SITE_URL}/logo.jpg`,
      brand: {
        '@type': 'Brand',
        '@id': `${SITE_URL}/#brand`,
        name: "Lety's Buko Pie",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.jpg`
      },
      manufacturer: {
        '@type': 'Organization',
        name: "Lety's Buko Pie",
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Los Baños',
          addressRegion: 'Laguna',
          addressCountry: 'PH'
        }
      },
      additionalProperty: item.description ? [{
        '@type': 'PropertyValue',
        name: 'Description',
        value: item.description
      }] : undefined,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        reviewCount: '500',
        bestRating: '5',
        worstRating: '1'
      }
    }))
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: product
    }))
  };
}

/**
 * FAQPage Schema
 * Enhanced with proper text extraction from React elements
 */
function generateFAQSchema() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/faq#faqpage`,
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      '@id': `${SITE_URL}/faq#${item.question.toLowerCase().replace(/\s+/g, '-').replace(/[?]/g, '')}`,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: extractTextFromAnswer(item.answer),
        author: {
          '@type': 'Organization',
          name: "Lety's Buko Pie"
        },
        upvoteCount: '5',
        dateCreated: '2024-01-01'
      }
    }))
  };

  return faqSchema;
}

/**
 * Extract plain text from answer (handles both string and React elements)
 */
function extractTextFromAnswer(answer: string | React.ReactNode): string {
  if (typeof answer === 'string') {
    return answer;
  }

  // If it's a React element, extract text content
  if (answer && typeof answer === 'object' && 'props' in answer) {
    const props = answer.props as { children?: React.ReactNode };
    if (props.children) {
      return String(props.children);
    }
  }

  return 'Check our pages for more information';
}

/**
 * Generate proper OpeningHoursSpecification for Schema.org
 */
function generateOpeningHoursSpecification(hours: Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', [string, string]>) {
  const dayMap: Record<string, string> = {
    'mon': 'Monday',
    'tue': 'Tuesday',
    'wed': 'Wednesday',
    'thu': 'Thursday',
    'fri': 'Friday',
    'sat': 'Saturday',
    'sun': 'Sunday'
  };

  // Check if all days have the same hours
  const allHours = Object.entries(hours);
  const firstHours = allHours[0][1];
  const allSame = allHours.every(([, h]) => h[0] === firstHours[0] && h[1] === firstHours[1]);

  if (allSame) {
    return [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: firstHours[0],
      closes: firstHours[1]
    }];
  }

  // Different hours for different days
  return Object.entries(hours).map(([day, [open, close]]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: dayMap[day] || day,
    opens: open,
    closes: close
  }));
}

/**
 * Single location schema for location pages
 * Enhanced with detailed geo-coordinates and business hours
 */
function generateLocationSchema(locationId: string) {
  const location = LOCATIONS.find(loc => loc.id === locationId);
  if (!location) return null;

  const city = extractCityFromAddress(location.address);

  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': `${SITE_URL}/locations#${locationId}`,
    name: `Lety's Buko Pie - ${location.displayName}`,
    alternateName: `Lety's ${location.displayName}`,
    description: `Lety's Buko Pie ${location.name} - Fresh buko pie and Filipino baked goods in ${city}, Laguna. ${location.specialNotes ? location.specialNotes.join('. ') : ''} Open ${formatHoursForDescription(location.hours)}.`,
    url: `${SITE_URL}/locations#${location.id}`,
    telephone: '+63-917-123-4567',
    email: 'hello@letysbukopie.com',
    address: {
      '@type': 'PostalAddress',
      '@id': `${SITE_URL}/locations#${locationId}-address`,
      streetAddress: location.address[0]?.replace('Lety\'s Buko Pie, ', '').trim() || location.address[0],
      addressLocality: city,
      addressRegion: 'Laguna',
      addressCountry: 'PH',
      postalCode: '4030'
    },
    geo: {
      '@type': 'GeoCoordinates',
      '@id': `${SITE_URL}/locations#${locationId}-geo`,
      latitude: location.coords.lat,
      longitude: location.coords.lng,
      addressCountry: 'PH',
      postalCode: '4030'
    },
    openingHoursSpecification: generateOpeningHoursSpecification(location.hours),
    openingHours: formatOpeningHoursSimple(location.hours),
    hasMap: location.mapLink,
    photo: {
      '@type': 'Photograph',
      image: `${SITE_URL}/images/${location.image}.jpg`
    },
    image: `${SITE_URL}/images/${location.image}.jpg`,
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: location.coords.lat,
        longitude: location.coords.lng
      },
      geoRadius: {
        '@type': 'Distance',
        value: '50',
        code: 'KM'
      }
    },
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: "Lety's Buko Pie",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.jpg`
    },
    sameAs: [
      'https://www.facebook.com/letysbukopie',
      'https://www.instagram.com/letysbukopie'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '315',
      bestRating: '5',
      worstRating: '1'
    },
    priceRange: '$$'
  };
}

/**
 * Format hours for human-readable description
 */
function formatHoursForDescription(hours: Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', [string, string]>): string {
  const allHours = Object.values(hours);
  const firstHours = allHours[0];
  const allSame = allHours.every(h => h[0] === firstHours[0] && h[1] === firstHours[1]);

  if (allSame) {
    const formatTime = (time: string) => {
      const [h, m] = time.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 || 12;
      return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
    };
    return `daily from ${formatTime(firstHours[0])} to ${formatTime(firstHours[1])}`;
  }

  return 'with varying hours - check our schedule';
}

/**
 * Structured Data Component
 */
export default function StructuredData({ type = 'all', locationId }: StructuredDataProps) {
  const schemas: Record<string, unknown> = {};

  if (type === 'localbusiness' || type === 'all') {
    schemas.localBusiness = generateLocalBusinessSchema();
  }

  if (type === 'products' || type === 'all') {
    schemas.products = generateProductSchema();
  }

  if (type === 'faqpage' || type === 'all') {
    schemas.faq = generateFAQSchema();
  }

  if (locationId) {
    schemas.location = generateLocationSchema(locationId);
  }

  const schemaList = Object.entries(schemas)
    .filter(([, schema]) => schema !== null)
    .map(([, schema]) => JSON.stringify(schema))
    .join(',\n');

  return (
    <Helmet>
      <script type="application/ld+json">
        {type === 'all' && !locationId
          ? JSON.stringify([
              generateLocalBusinessSchema(),
              generateProductSchema(),
              generateFAQSchema()
            ])
          : locationId
          ? JSON.stringify(generateLocationSchema(locationId))
          : schemaList
        }
      </script>
    </Helmet>
  );
}

/**
 * Individual schema components for specific pages
 */
export function LocalBusinessSchema() {
  return <StructuredData type="localbusiness" />;
}

export function ProductsSchema() {
  return <StructuredData type="products" />;
}

export function FAQSchema() {
  return <StructuredData type="faqpage" />;
}

export function LocationSchema({ locationId }: { locationId: string }) {
  return <StructuredData type="localbusiness" locationId={locationId} />;
}
