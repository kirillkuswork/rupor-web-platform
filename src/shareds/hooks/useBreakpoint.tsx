import { useState, useEffect } from 'react';

const getBreakpoint = (width: number): string => {
  if (width < 767) return 'xs';
  if (width >= 767 && width < 1023) return 'sm';
  if (width >= 1023 && width < 1279) return 'md';
  if (width >= 1279 && width < 1439) return 'lg';
  return 'xl';
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<string>('');
  useEffect(() => {
    setBreakpoint(getBreakpoint(window.innerWidth));
  }, []);
  useEffect(() => {
    const mediaQueryLists = {
      xs: window.matchMedia('screen and (max-width: 767px)'),
      sm: window.matchMedia('screen and (max-width: 1023px)'),
      md: window.matchMedia('screen and (max-width: 1279px)'),
      lg: window.matchMedia('screen and (max-width: 1439px)'),
      xl: window.matchMedia('screen and (min-width: 1440px)'),
    };

    const handleBreakpointChange = () => {
      const width = window?.innerWidth;
      setBreakpoint(getBreakpoint(width));
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

  return breakpoint;
};

export default useBreakpoint;
