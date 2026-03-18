import { memo } from 'react';

import useIsMobile from '@/shareds/hooks/useIsMobile';
import { HeaderSkeletonDesktop } from './Desktop';
import { HeaderSkeletonMobile } from './Mobile';

const HeaderSkeletonComponent = () => {
  const { isMobile } = useIsMobile();
  return isMobile ? <HeaderSkeletonMobile /> : <HeaderSkeletonDesktop />;
};

export const HeaderSkeleton = memo(HeaderSkeletonComponent);
