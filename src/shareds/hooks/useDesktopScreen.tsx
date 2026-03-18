import { useEffect, useState } from 'react';
import { ADAPTIVE_SIZE } from '../constants/elements';

export default function useDesktopScreen() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsDesktop(window.innerWidth >= ADAPTIVE_SIZE);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return isDesktop;
}
