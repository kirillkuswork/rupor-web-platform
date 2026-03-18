import { EmptyContainer, Paper } from '@/shareds/ui';
import VideosByDate from '@/features/VideosByDate';
import { mapVideoProps } from '@/entities/Video';
import { IVideo } from '@/redux/services/channels/responseModel';
import { memo, useMemo } from 'react';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';
import { useTranslation } from 'next-i18next';
import { useGetHistoryVideos } from './model/hooks/useGetHistroryVideos';
import { HistoryEmptyComponent } from './ui/HistoryEmptyContainer';

const HistoryPage = () => {
  const {
    videos,
    isFetching,
    isError,
    isSuccess,
    refetch,
    onEndReached,
    isLastPage,
  } = useGetHistoryVideos({ limit: 100 });
  const { t } = useTranslation();

  const data = useMemo(() => mapVideoProps(videos as IVideo[]), [videos]);
  const isEmpty = isSuccess && !videos?.length && !isFetching;

  const actions = useGetVideoActions({
    actionsList: [
      'deleteVideoFromHistory',
      'addToWatchLater',
      'addToQueue',
      'addToSaved',
      'addReportToVideo',
    ],
  });

  if (isEmpty) return <HistoryEmptyComponent />;
  if (isError) {
    return (
      <Paper className="h-full">
        <EmptyContainer
          text={t('History_Page_Empty_Container_Error')}
          errorHandler={{
            refetch,
            isError,
          }}
        />
      </Paper>
    );
  }

  return (
    <VideosByDate
      dti="history-views-grid"
      data={data}
      isLoading={isFetching}
      fromHistoryPage
      limit={100}
      onEndReached={onEndReached}
      hasNextPage={!isLastPage}
      getVideoActions={actions}
    />
  );
};

export default memo(HistoryPage);
