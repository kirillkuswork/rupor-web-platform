import { useEffect, useState } from 'react';

export const useResizeObserver = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [rect, setRect] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    const RO = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (Array.isArray(entries)) {
        const entry = entries[0];
        setRect(entry.contentRect);
      }
    });

    if (anchor) {
      RO.observe(anchor);
    }

    return () => {
      RO.disconnect();
    };
  }, [anchor]);

  return { rect, anchorRef: setAnchor, anchor };
};
