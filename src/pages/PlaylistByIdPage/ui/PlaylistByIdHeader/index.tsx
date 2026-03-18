import { ComponentProps, memo } from 'react';
import { SortBtn } from '@/entities/SortBtn';
import { IPlaylist } from '@/redux/services/video/baseModel';
import { SortType } from '@/shareds/types/sortTypes';
import { Paper } from '@/shareds/ui';
import { Route } from '@/shareds/ui/BreadCrumbs';

import { SplitPaper } from 'rupor-ui-kit';
import { HeaderContent } from './HeaderContent';

type Props = {
  playlistData?: IPlaylist;
  route?: Route;
  amountOfVideo: number;
  currentValue: SortType;
  onToggleSortType: (value: string) => void;
  dti?: string
};

export const PlaylistByIdHeader = memo(({
  playlistData,
  route,
  amountOfVideo,
  currentValue,
  onToggleSortType: handleToggleSortType,
  dti,
}: Props) => {
  const isEmpty = amountOfVideo === 0;

  const headerContentProps: ComponentProps<typeof HeaderContent> = {
    playlistData,
    route,
    amountOfVideo,
    dti,
  };

  return isEmpty ? (
    <Paper>
      <HeaderContent {...headerContentProps} />
    </Paper>
  ) : (
    <SplitPaper.Wrapper className="mb-6 sm:mb-4">
      <SplitPaper.TopBlock className="py-3">
        <HeaderContent {...headerContentProps} />
      </SplitPaper.TopBlock>
      <SplitPaper.BottomBlock
        className="py-3 md:py-0"
      >
        <div className="my-4">
          <SortBtn
            dti={`${dti}-sort-btn_${playlistData?.id}`}
            value={currentValue}
            onClick={handleToggleSortType}
          />
        </div>
      </SplitPaper.BottomBlock>
    </SplitPaper.Wrapper>
  );
});

PlaylistByIdHeader.displayName = 'PlaylistByIdHeader';
