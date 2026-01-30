/**
 * Enhanced Sitemap Generator
 * Generates comprehensive sitemap.xml for the website
 * Includes support for images, multilingual, and dynamic content
 */

import { writeFileSync } from 'fs';
import { LOCATIONS } from '../data/locations';
import { PRODUCT_DATA } from '../data/products';

const SITE_URL = 'https://letysbukopie.com';

interface SitemapURL {
  url: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
  images?: SitemapImage[];
}

interface SitemapImage {
  loc: string;
  caption?: string;
  title?: string;
  geo_location?: string;
  license?: string;
}

/**
 * Generate sitemap URLs with comprehensive coverage
 */
function generateSitemapURLs(): SitemapURL[] {
  const urls: SitemapURL[] = [];
  const currentDate = new Date().toISOString().split('T')[0];

  // Core pages - highest priority
  urls.push(
    {
      url: '/',
      changefreq: 'daily',
      priority: 1.0,
      lastmod: currentDate
    },
    {
      url: '/products',
      changefreq: 'daily',
      priority: 0.9,
      lastmod: currentDate
    },
    {
      url: '/availability',
      changefreq: 'hourly',
      priority: 0.8,
      lastmod: currentDate
    },
    {
      url: '/locations',
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: currentDate
    }
  );

  // Add individual location pages with images
  LOCATIONS.forEach(location => {
    urls.push({
      url: `/locations#${location.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: currentDate,
      images: [
        {
          loc: `${SITE_URL}/images/${location.image}.jpg`,
          caption: `Lety's Buko Pie ${location.name} - ${location.address.join(', ')}`,
          title: `${location.name} Storefront`,
          geo_location: `${location.address.join(', ')}`
        }
      ]
    });
  });

  // Product-related pages
  urls.push(
    {
      url: '/faq',
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: currentDate
    },
    {
      url: '/contact',
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: currentDate
    }
  );

  // Add product category pages with images
  PRODUCT_DATA.forEach(category => {
    urls.push({
      url: `/products#${category.id}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: currentDate,
      images: category.items
        .filter(item => item.image)
        .map(item => ({
          loc: `${SITE_URL}/images/${item.image}.jpg`,
          caption: `${item.name} - ${category.title} from Lety's Buko Pie`,
          title: item.name
        }))
    });

    // Add individual product items (if you create individual product pages in the future)
    // category.items.forEach(item => {
    //   urls.push({
    //     url: `/products/${item.name.toLowerCase().replace(/\s+/g, '-')}`,
    //     changefreq: 'weekly',
    //     priority: 0.7,
    //     lastmod: currentDate,
    //     images: item.image ? [{
    //       loc: `${SITE_URL}/images/${item.image}.jpg`,
    //       caption: `${item.name} from Lety's Buko Pie`,
    //       title: item.name
    //     }] : undefined
    //   });
    // });
  });

  return urls;
}

/**
 * Escape XML special characters
 */
function escapeXML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generate XML sitemap with image support
 */
function generateSitemapXML(): string {
  const urls = generateSitemapURLs();

  const xmlUrls = urls.map(({ url, changefreq, priority, lastmod, images }) => {
    const urlBlock = `  <url>
    <loc>${SITE_URL}${escapeXML(url)}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>${
      images && images.length > 0
        ? images.map(img => `
    <image:image>
      <image:loc>${escapeXML(img.loc)}</image:loc>${
        img.caption ? `
      <image:caption>${escapeXML(img.caption)}</image:caption>` : ''
      }${
        img.title ? `
      <image:title>${escapeXML(img.title)}</image:title>` : ''
      }${
        img.geo_location ? `
      <image:geo_location>${escapeXML(img.geo_location)}</image:geo_location>` : ''
      }
    </image:image>`).join('')
        : ''
    }
  </url>`;

    return urlBlock;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlUrls}
</urlset>`;
}

/**
 * Main function to generate and save sitemap
 */
export function generateSitemap(outputPath: string = './public/sitemap.xml') {
  const xml = generateSitemapXML();
  writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ Sitemap generated at ${outputPath}`);
  console.log(`   Total URLs: ${generateSitemapURLs().length}`);
  return xml;
}

// Run if executed directly
if (require.main === module) {
  generateSitemap();
}
