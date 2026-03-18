import { FC } from 'react';

import { EmptyContainer, IsNotAuthorized, Paper } from '@/shareds';
import VideosByDate from '@/features/VideosByDate';
import { useGetSubscriptionsVideos } from '@/pages/SubscriptionsPage/model/hooks/useGetSubscriptionsVideos';
import SkeletonsByDate from '@/features/VideosByDate/SkeletonsByDate';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';
import { SubscriptionsEmptyComponent } from './EmptyPage';

export const SubscriptionsList: FC = () => {
  const {
    videos,
    isFetching,
    isError,
    isSuccess,
    refetch,
    limit,
    isLastPage,
  } = useGetSubscriptionsVideos();
  const { isAuth } = useSelector(selectors.userSelector);
  const isEmpty = isSuccess && !videos?.length;

  const actions = useGetVideoActions({ actionsList: ['addToWatchLater', 'addToQueue', 'addToSaved', 'addReportToVideo'] });

  if (!isAuth) {
    return (
      <IsNotAuthorized
        dti="subscriptions"
        subtitleText="Subscriptions_Unauthorized_Subtitle_Text"
      />
    );
  }

  if (isFetching) {
    return <SkeletonsByDate />;
  }

  if (isError) {
    return (
      <Paper className="h-full">
        <EmptyContainer
          text="Subscriptions_List_Empty_Container_Text"
          subtitleText="Subscriptions_List_Empty_Container_Subtitle_Text"
          errorHandler={{
            refetch,
            isError,
          }}
        />
      </Paper>
    );
  }

  if (isEmpty) {
    return <SubscriptionsEmptyComponent />;
  }

  return (
    <VideosByDate
      limit={limit}
      hasNextPage={isLastPage}
      data={videos}
      isLoading={isFetching}
      dti="subscriptions"
      getVideoActions={actions}
    />
  );
};
