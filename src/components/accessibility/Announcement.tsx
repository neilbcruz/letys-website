// src/components/accessibility/Announcement.tsx
import { useEffect, useRef } from 'react';

interface AnnouncementProps {
  message: string;
  politeness?: 'polite' | 'assertive';
  clearOnUnmount?: boolean;
}

export function Announcement({ 
  message, 
  politeness = 'polite',
  clearOnUnmount = true 
}: AnnouncementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && message) {
      ref.current.textContent = message;
    }

    return () => {
      if (clearOnUnmount && ref.current) {
        ref.current.textContent = '';
      }
    };
  }, [message, clearOnUnmount]);

  return (
    <div
      ref={ref}
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    />
  );
}