import { memo } from 'react';

import {
  SplitPaper,
  Skeleton,
} from 'rupor-ui-kit';

const HeaderSkeletonDesktopComponent = () => (
  <SplitPaper.Wrapper className="mb-6">
    <SplitPaper.TopBlock className="px-6 py-10">
      <div
        className="flex flex-row justify-between items-center"
      >
        <div>
          <Skeleton
            className="w-[122px] h-[17px] rounded-full"
            animation
          />
        </div>

        <div>
          <Skeleton
            className="w-[134px] h-[33px] rounded-lg"
            animation
          />
        </div>
      </div>
    </SplitPaper.TopBlock>
    <SplitPaper.BottomBlock className="px-6 py-6">
      <div
        className="flex flex-row justify-between items-center"
      >
        <div className="flex flex-row items-center">
          <Skeleton
            className="w-6 h-6 mr-1 rounded-full"
            animation
          />
          <Skeleton
            className="w-[62px] h-[9px] rounded-full"
            animation
          />
        </div>

        <div>
          <Skeleton
            className="w-[306px] h-[33px] rounded-lg"
            animation
          />
        </div>
      </div>
    </SplitPaper.BottomBlock>
  </SplitPaper.Wrapper>
);

export const HeaderSkeletonDesktop = memo(HeaderSkeletonDesktopComponent);
