import React from 'react';

import clsx from 'clsx';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import AvatarFieldView from './AvatarFieldView';

const AvatarField = () => {
  const { isMobile } = useIsMobile();
  return (
    <div className={clsx('max-w-[416px] w-full', isMobile ? 'mt-6 mb-10' : 'my-12')}>
      <AvatarFieldView />
    </div>
  );
};

export default React.memo(AvatarField);
