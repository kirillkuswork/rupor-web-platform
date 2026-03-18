import { memo, useMemo } from 'react';

import { AutoGridVideoCardNotFound, mapVideoProps, VideoList } from '@/entities/Video';
import { useRouter } from 'next/router';
import { EmptyContainer } from '@/shareds/ui';
import { useTranslation } from 'react-i18next';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';
import { HomeButton } from './ui/HomeButton';
import { useGetVideoResults } from './model/hooks/useGetVideoResults';

export const VideosResultsTape = memo(() => {
  const router = useRouter();
  const queryText = useMemo(() => router.query.query as string, [router.query]);
  const { t } = useTranslation();

  const mainText = 'Videos_Results_Tape_Main_Text';
  const subtitleText = `«${queryText}»`;

  const {
    videos,
    isLastPage,
    isError,
    isLoading,
    refetch,
    onEndReached,
    isReady,
  } = useGetVideoResults();

  const transformedVideos = useMemo(() => mapVideoProps(videos), [videos]);

  const dataGrid = {
    data: transformedVideos,
    hasNextPage: !isLastPage,
    isLoading,
  };

  const actions = useGetVideoActions({ actionsList: ['addToWatchLater', 'addToQueue', 'addToSaved', 'addReportToVideo'] });

  if (isError) {
    return (
      <EmptyContainer
        text={t('Video_error')}
        height={300}
        isPage={false}
        errorHandler={{
          refetch,
          isError,
        }}
      />
    );
  }

  if (videos?.length === 0 && isReady) {
    return (
      <AutoGridVideoCardNotFound
        mainText={t(mainText)}
        subtitleText={t(subtitleText)}
        button={<HomeButton />}
        isPage
      />
    );
  }

  return (
    <VideoList.Grid
      onEndReached={onEndReached}
      getVideoActions={actions}
      {...dataGrid}
    />
  );
});

VideosResultsTape.displayName = 'VideosResultsTape';
