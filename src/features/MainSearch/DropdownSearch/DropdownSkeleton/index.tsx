import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';

export const DropdownSkeleton = () => {
  const skeletonsList = renderSkeletons({
    template: 'simpleLine',
    className: 'h-[22px] w-full rounded-full',
    limit: 10,
  });

  return (
    <div className="grid gap-[16px] w-full px-[16px] py-[8px]">
      {skeletonsList}
    </div>
  );
};
