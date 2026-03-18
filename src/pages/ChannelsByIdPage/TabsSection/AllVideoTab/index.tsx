import { SortBtn } from '@/entities/SortBtn';
import { VideoList } from '@/entities/Video';
import { SortType } from '@/shareds/types/sortTypes';
import { Paper } from '@/shareds/ui';
import { FC, useState } from 'react';

import { BlockHeaderInner } from 'rupor-ui-kit';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';
import { useTranslation } from 'next-i18next';
import { EmptyHomeTab } from '../EmptyHomeTab';
import { useAllVideoTabList } from './useAllVideoTabList';

type Props = {
  channelId: string;
};
const AllVideoTab: FC<Props> = ({
  channelId,
}) => {
  const [sortType, setSortType] = useState<SortType>('SORT_DIRECTION_CREATED_AT_DESC');
  const { t } = useTranslation();
  const handleToggleSortType = (value: string) => {
    setSortType(value as SortType);
  };

  const {
    isFetching, videos, onEndReached, total, isLastPage,
  } = useAllVideoTabList({ limit: 20, channelId, sortType });

  const dataGrid = {
    data: videos,
    hasNextPage: !isLastPage && !isFetching,
    isLoading: isFetching,
    contentListId: channelId,
  };

  const actions = useGetVideoActions({ actionsList: ['addToWatchLater', 'addToQueue', 'addToSaved', 'addReportToVideo'] });

  if (!channelId) {
    return null;
  }

  if (videos.length === 0 && !isFetching) {
    return <EmptyHomeTab channelId={channelId} />;
  }

  return (
    <Paper className="!py-4.5 md:!px-4 h-auto">
      <BlockHeaderInner.Container split className="mb-4.5">
        <BlockHeaderInner.TitleWrapper>
          <BlockHeaderInner.Title data-testid={`channel-page-content-video-count_${channelId}`} className="leading-[26px] text-paragraph-xl">
            {t('All_Video_Tab', { total })}
          </BlockHeaderInner.Title>
        </BlockHeaderInner.TitleWrapper>
        <BlockHeaderInner.RightBlock>
          <SortBtn dti={`channel-page-content-sort-button_${channelId}`} onClick={handleToggleSortType} />
        </BlockHeaderInner.RightBlock>
        <BlockHeaderInner.RightBlockMobile>
          <SortBtn onClick={handleToggleSortType} />
        </BlockHeaderInner.RightBlockMobile>
      </BlockHeaderInner.Container>

      <VideoList.Grid
        onEndReached={onEndReached}
        getVideoActions={actions}
        {...dataGrid}
      />
    </Paper>
  );
};

export default AllVideoTab;
