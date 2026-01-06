import type { Metric } from 'web-vitals';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

export function reportWebVitals(onPerfEntry?: (metric: Metric) => void) {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
}

export default reportWebVitals;
