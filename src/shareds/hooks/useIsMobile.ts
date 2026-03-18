import { useEffect, useState } from 'react';
import { ADAPTIVE_SIZE } from '../constants/elements';

const useIsMobile = () => {
  const [isMobile, setisMobile] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    setisMobile(window.innerWidth <= ADAPTIVE_SIZE);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    const mediaQueryLists = {
      isMobile: window.matchMedia(`screen and (max-width: ${ADAPTIVE_SIZE}px)`),
    };

    const handleBreakpointChange = () => {
      const width = window?.innerWidth;
      setisMobile(width <= ADAPTIVE_SIZE);
      setIsInitialized(true);
    };

    Object.values(mediaQueryLists).forEach((mql) => {
      mql.addEventListener('change', handleBreakpointChange);
    });

    handleBreakpointChange();

    return () => {
      Object.values(mediaQueryLists).forEach((mql) => {
        mql.removeEventListener('change', handleBreakpointChange);
      });
    };
  }, []);

  return {
    isMobile,
    isMobileInitialized: isInitialized,
  };
};

export default useIsMobile;
