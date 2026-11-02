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
      <meta name="theme-color" content="#074621" />
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
