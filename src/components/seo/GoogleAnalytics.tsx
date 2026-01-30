/**
 * Google Analytics 4 Integration
 * Comprehensive tracking for Lety's Buko Pie website
 *
 * Features:
 * - Page view tracking on route changes
 * - Enhanced event tracking for products, locations, and forms
 * - E-commerce tracking for product views
 * - Custom dimension tracking for better insights
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */

import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// Google Analytics Measurement ID
// Replace with your actual GA4 Measurement ID (G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Google Tag Manager Container ID (optional)
const GTM_ID = import.meta.env.VITE_GTM_ID;

/**
 * Google Analytics initialization script
 * Enhanced with custom configuration for better tracking
 */
const GA_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}', {
    page_path: window.location.pathname,
    send_page_view: true,
    custom_map: {
      'custom_dimension_1': 'product_category',
      'custom_dimension_2': 'store_location'
    }
  });
`;

/**
 * Google Tag Manager script (if GTM is enabled)
 */
const GTM_SCRIPT = `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GA_MEASUREMENT_ID}');
`;

/**
 * Google Analytics Provider Component
 * Injects the GA scripts and wraps the application
 */
export function GoogleAnalyticsProvider() {
  // Only load GA in production or when explicitly enabled
  const shouldLoadGA = import.meta.env.PROD || import.meta.env.VITE_ENABLE_GA === 'true';

  if (!shouldLoadGA || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <Helmet>
      {/* Google Analytics / GTM script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script type="text/javascript">{GA_SCRIPT}</script>

      {/* Additional verification meta tags (optional) */}
      <meta name="google-site-verification" content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || ''} />
    </Helmet>
  );
}

/**
 * Custom hook for tracking Google Analytics events
 * Enhanced with more tracking capabilities
 */
interface UseGoogleAnalyticsReturn {
  trackEvent: (eventName: string, parameters?: Record<string, unknown>) => void;
  trackPageView: (path?: string, title?: string) => void;
  trackProductView: (productName: string, category?: string, price?: number) => void;
  trackProductClick: (productName: string, category?: string, listName?: string) => void;
  trackContactFormSubmit: (formData: { name: string; email: string; subject: string }) => void;
  trackLocationClick: (locationName: string, locationId?: string) => void;
  trackLocationDirections: (locationName: string) => void;
  trackSocialClick: (platform: string, contentUrl?: string) => void;
  trackVideoPlay: (videoTitle: string, videoUrl?: string) => void;
  trackSearch: (searchTerm: string, resultsCount?: number) => void;
  trackError: (errorDescription: string, errorFatal?: boolean) => void;
}

export function useGoogleAnalytics(): UseGoogleAnalyticsReturn {
  const location = useLocation();
  const previousPath = useRef<string>('');

  const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as { gtag?: unknown }).gtag) {
      (window as { gtag: (command: string, eventName: string, params?: Record<string, unknown>) => void }).gtag(
        'event',
        eventName,
        {
          ...parameters,
          debug_mode: import.meta.env.VITE_ENABLE_GA_DEBUG === 'true'
        }
      );
    }
  };

  const trackPageView = (path?: string, title?: string) => {
    const currentPath = path || location.pathname;

    // Only track if path actually changed
    if (currentPath !== previousPath.current) {
      trackEvent('page_view', {
        page_path: currentPath,
        page_location: window.location.href,
        page_title: title || document.title,
        page_referrer: document.referrer
      });
      previousPath.current = currentPath;
    }
  };

  const trackProductView = (productName: string, category?: string, price?: number) => {
    trackEvent('view_item', {
      item_name: productName,
      item_id: productName.toLowerCase().replace(/\s+/g, '_'),
      item_category: category || 'Baked Goods',
      item_brand: "Lety's Buko Pie",
      price: price,
      currency: 'PHP'
    });
  };

  const trackProductClick = (productName: string, category?: string, listName?: string) => {
    trackEvent('select_item', {
      item_list_name: listName || 'Product List',
      item_list_id: listName?.toLowerCase().replace(/\s+/g, '_') || 'product_list',
      items: [{
        item_name: productName,
        item_id: productName.toLowerCase().replace(/\s+/g, '_'),
        item_category: category || 'Baked Goods',
        item_brand: "Lety's Buko Pie",
        index: 1
      }]
    });
  };

  const trackContactFormSubmit = (formData: { name: string; email: string; subject: string }) => {
    trackEvent('generate_lead', {
      form_name: 'Contact Form',
      form_id: 'contact-form',
      lead_type: 'contact_inquiry',
      email_domain: formData.email.split('@')[1],
      subject_category: formData.subject.toLowerCase()
    });
  };

  const trackLocationClick = (locationName: string, locationId?: string) => {
    trackEvent('select_content', {
      content_type: 'store_location',
      content_id: locationId || locationName.toLowerCase().replace(/\s+/g, '_'),
      items: [{
        item_name: locationName,
        item_id: locationId || locationName.toLowerCase().replace(/\s+/g, '_'),
        item_category: 'Store Location',
        item_brand: "Lety's Buko Pie"
      }]
    });
  };

  const trackLocationDirections = (locationName: string) => {
    trackEvent('directions_request', {
      location_name: locationName,
      content_type: 'directions'
    });
  };

  const trackSocialClick = (platform: string, contentUrl?: string) => {
    trackEvent('social_share', {
      method: platform,
      content_type: 'social_media',
      item_id: contentUrl || 'homepage'
    });
  };

  const trackVideoPlay = (videoTitle: string, videoUrl?: string) => {
    trackEvent('video_start', {
      video_title: videoTitle,
      video_url: videoUrl,
      content_type: 'video'
    });
  };

  const trackSearch = (searchTerm: string, resultsCount?: number) => {
    trackEvent('search', {
      search_term: searchTerm.toLowerCase(),
      results_count: resultsCount || 0,
      content_type: 'product_search'
    });
  };

  const trackError = (errorDescription: string, errorFatal = false) => {
    trackEvent('exception', {
      description: errorDescription,
      fatal: errorFatal
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackProductView,
    trackProductClick,
    trackContactFormSubmit,
    trackLocationClick,
    trackLocationDirections,
    trackSocialClick,
    trackVideoPlay,
    trackSearch,
    trackError
  };
}

/**
 * Page View Tracker Component
 * Automatically tracks page views on route changes
 * Enhanced with scroll depth tracking
 */
export function PageViewTracker() {
  const location = useLocation();
  const shouldTrack = import.meta.env.PROD || import.meta.env.VITE_ENABLE_GA === 'true';

  useEffect(() => {
    if (shouldTrack && typeof window !== 'undefined' && (window as { gtag?: unknown }).gtag) {
      (window as { gtag: (command: string, config: string, params: Record<string, string>) => void }).gtag(
        'config',
        GA_MEASUREMENT_ID,
        {
          page_path: location.pathname,
          page_location: window.location.href,
          page_title: document.title
        }
      );
    }
  }, [location, shouldTrack]);

  // Scroll depth tracking
  useEffect(() => {
    if (!shouldTrack) return;

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      // Track scroll depth milestones
      if (scrollPercent === 25 || scrollPercent === 50 || scrollPercent === 75 || scrollPercent === 90) {
        if (typeof window !== 'undefined' && (window as { gtag?: unknown }).gtag) {
          (window as { gtag: (command: string, eventName: string, params: Record<string, unknown>) => void }).gtag(
            'event',
            'scroll_tracking',
            {
              page_path: location.pathname,
              percent_scrolled: scrollPercent,
              non_interaction: true
            }
          );
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, shouldTrack]);

  return null;
}

/**
 * Event Tracker Component
 * Wraps components to automatically track specific events
 */
interface EventTrackerProps {
  eventName: string;
  eventParameters?: Record<string, unknown>;
  children: React.ReactElement;
  onClick?: () => void;
}

export function EventTracker({ eventName, eventParameters, children, onClick }: EventTrackerProps) {
  const { trackEvent } = useGoogleAnalytics();

  const handleClick = () => {
    trackEvent(eventName, eventParameters);
    if (onClick) onClick();
  };

  return <children.type {...children.props} onClick={handleClick} />;
}

/**
 * Product View Tracker HOC
 * Wraps a product component to track when it's viewed
 */
export function withProductViewTracking<P extends { productName: string; category?: string; price?: number }>(
  WrappedComponent: React.ComponentType<P>
) {
  return function TrackedComponent(props: P) {
    const { trackProductView } = useGoogleAnalytics();

    useEffect(() => {
      trackProductView(props.productName, props.category, props.price);
    }, [props.productName, props.category, props.price, trackProductView]);

    return <WrappedComponent {...props} />;
  };
}

/**
 * Contact Form Tracker Hook
 * Returns a wrapped submit handler that tracks form submissions
 */
export function useContactFormTracking(
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
) {
  const { trackContactFormSubmit } = useGoogleAnalytics();

  return async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;

    trackContactFormSubmit({ name, email, subject });
    await handleSubmit(e);
  };
}

/**
 * Export types for TypeScript consumers
 */
export type { UseGoogleAnalyticsReturn };

/**
 * Export default Google Analytics component
 */
export default function GoogleAnalytics() {
  return (
    <>
      <GoogleAnalyticsProvider />
      <PageViewTracker />
    </>
  );
}
