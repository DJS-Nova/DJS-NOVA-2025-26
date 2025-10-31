'use client';
import { useEffect, useRef } from 'react';

export default function useScrollCompensate() {
  const prevWidthRef = useRef<number | null>(null);

  useEffect(() => {
    const body = document.body;

    const resizeBody = () => {
      const currentWidth = body.clientWidth;

      if (prevWidthRef.current !== currentWidth) {
        prevWidthRef.current = currentWidth;

        // Temporarily hide overflow to measure scrollbar width
        body.style.overflow = 'hidden';
        const scrollBarWidth = body.clientWidth - currentWidth;
        body.style.overflow = 'auto';

        // Apply margin compensation
        body.style.marginLeft = `${scrollBarWidth}px`;
      }
    };

    // Run periodically because scrollbars don’t trigger resize events
    const interval = setInterval(resizeBody, 100);
    resizeBody();

    return () => clearInterval(interval);
  }, []);
}
