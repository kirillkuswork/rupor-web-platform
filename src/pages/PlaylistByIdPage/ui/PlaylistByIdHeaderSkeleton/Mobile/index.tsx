import { memo } from 'react';

import {
  SplitPaper,
  Skeleton,
} from 'rupor-ui-kit';

const HeaderSkeletonMobileComponent = () => (
  <SplitPaper.Wrapper className="mb-6">
    <SplitPaper.TopBlock className="px-6 py-4">
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
            className="w-6 h-6 rounded-full"
            animation
          />
        </div>
      </div>
    </SplitPaper.TopBlock>
    <SplitPaper.BottomBlock className="px-6 py-4">
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
            className="w-6 h-6 rounded-full"
            animation
          />
        </div>
      </div>
    </SplitPaper.BottomBlock>
  </SplitPaper.Wrapper>
);

export const HeaderSkeletonMobile = memo(HeaderSkeletonMobileComponent);
