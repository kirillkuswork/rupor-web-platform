import clsx from 'clsx';
import { Skeleton } from 'rupor-ui-kit';

import useIsMobile from '@/shareds/hooks/useIsMobile';
import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';

export const Loading = () => {
  const { isMobile } = useIsMobile();

  return (
    <div className="flex flex-col items-center">
      <Skeleton
        variant="circle"
        className={clsx('w-[128px] h-[128px]', isMobile ? 'mt-6 mb-10' : 'my-12')}
      />

      {renderSkeletons({
        limit: 3,
        className: 'max-w-[416px] w-full rounded h-16 mb-4',
      })}
    </div>
  );
};
