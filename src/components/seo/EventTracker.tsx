/**
 * Enhanced Event Tracker Component
 * Provides easy-to-use wrappers for tracking user interactions
 */

import { MouseEvent, KeyboardEvent } from 'react';
import { useGoogleAnalytics } from './GoogleAnalytics';

interface TrackClickOptions {
  eventName: string;
  parameters?: Record<string, unknown>;
  onClick?: (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void | Promise<void>;
  disabled?: boolean;
}

/**
 * Hook that returns a click handler with automatic tracking
 */
export function useTrackClick({ eventName, parameters, onClick, disabled = false }: TrackClickOptions) {
  const { trackEvent } = useGoogleAnalytics();

  return async (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    if (disabled) return;

    // Track the event
    trackEvent(eventName, parameters);

    // Call the original onClick handler if provided
    if (onClick) {
      await onClick(e);
    }
  };
}

/**
 * HOC to add click tracking to any component
 */
export function withClickTracking<P extends {
  onClick?: (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
}>(
  WrappedComponent: React.ComponentType<P>,
  eventName: string,
  getParameters?: (props: P) => Record<string, unknown>
) {
  return function TrackedComponent(props: P) {
    const { trackEvent } = useGoogleAnalytics();

    const handleClick = async (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      const parameters = getParameters ? getParameters(props) : undefined;
      trackEvent(eventName, parameters);

      if (props.onClick) {
        await props.onClick(e);
      }
    };

    return <WrappedComponent {...props} onClick={handleClick} />;
  };
}

/**
 * Track navigation events
 */
export function useTrackNavigation() {
  const { trackEvent } = useGoogleAnalytics();

  return (destination: string, navigationType: 'internal' | 'external' = 'internal') => {
    trackEvent('navigation', {
      destination,
      navigation_type: navigationType,
      link_type: navigationType === 'external' ? 'outbound' : 'internal'
    });
  };
}

/**
 * Track search events
 */
export function useTrackSearch() {
  const { trackEvent } = useGoogleAnalytics();

  return (searchTerm: string, resultCount: number, category?: string) => {
    trackEvent('search', {
      search_term: searchTerm,
      result_count: resultCount,
      category,
      search_type: 'product_search'
    });
  };
}

/**
 * Track filter events
 */
export function useTrackFilter() {
  const { trackEvent } = useGoogleAnalytics();

  return (filterType: string, filterValue: string) => {
    trackEvent('filter', {
      filter_type: filterType,
      filter_value: filterValue
    });
  };
}

/**
 * Track social media clicks
 */
export function useTrackSocial() {
  const { trackEvent } = useGoogleAnalytics();

  return (platform: 'facebook' | 'instagram' | 'twitter' | 'email', contentType: 'page' | 'product') => {
    trackEvent('social_share', {
      platform,
      content_type: contentType,
      method: 'click'
    });
  };
}

/**
 * Track video interactions
 */
export function useTrackVideo() {
  const { trackEvent } = useGoogleAnalytics();

  return {
    play: (videoTitle: string, videoUrl: string) => {
      trackEvent('video_play', {
        video_title: videoTitle,
        video_url: videoUrl,
        playback_method: 'autoplay'
      });
    },
    pause: (videoTitle: string, watchTime: number) => {
      trackEvent('video_pause', {
        video_title: videoTitle,
        watch_time_seconds: watchTime
      });
    },
    complete: (videoTitle: string, totalWatchTime: number) => {
      trackEvent('video_complete', {
        video_title: videoTitle,
        total_watch_time_seconds: totalWatchTime
      });
    }
  };
}

/**
 * Track download events
 */
export function useTrackDownload() {
  const { trackEvent } = useGoogleAnalytics();

  return (fileName: string, fileType: string, fileSize?: number) => {
    trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      file_size_bytes: fileSize
    });
  };
}

/**
 * Track error events
 */
export function useTrackError() {
  const { trackEvent } = useGoogleAnalytics();

  return (errorMessage: string, errorType: string, context?: string) => {
    trackEvent('error', {
      error_message: errorMessage,
      error_type: errorType,
      context,
      fatal: false
    });
  };
}

/**
 * Track scroll depth
 */
export function useTrackScrollDepth() {
  const { trackEvent } = useGoogleAnalytics();

  const trackedDepths = new Set<number>();

  return (scrollDepth: number, pagePath?: string) => {
    const depthPercentage = Math.floor(scrollDepth);
    const milestones = [25, 50, 75, 90, 100];

    milestones.forEach(milestone => {
      if (depthPercentage >= milestone && !trackedDepths.has(milestone)) {
        trackedDepths.add(milestone);
        trackEvent('scroll_tracking', {
          percent_scrolled: milestone,
          page_path: pagePath || window.location.pathname
        });
      }
    });
  };
}
