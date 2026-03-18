import { ReactNode, useCallback } from 'react';

import { useRouter } from 'next/router';
import { SplitPaper } from 'rupor-ui-kit';

import { EmptyContainer, IsNotAuthorized, Paper } from '@/shareds';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { SortBtn } from '@/entities/SortBtn';
import { VideoList } from '@/entities/Video';

import { SortType } from '@/shareds/types/sortTypes';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { PaperProps } from 'rupor-ui-kit/dist/components/Paper/Paper.types';
import { WatchLaterEmptyComponent } from '@/pages/WatchLaterPage/ui/WatchLaterEmptyComponent';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';
import { useTranslation } from 'next-i18next';
import { WatchLaterHeader } from './ui/Header';
import { useWatchLaterList } from './model/hooks/useWatchLaterList';

const HeaderWrapper = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col h-full">
    <Paper className="px-6 py-10 md:!p-4">
      <WatchLaterHeader />
    </Paper>
    <Paper className="h-full !mb-0">{children as PaperProps['children']}</Paper>
  </div>
);

const WatchLaterPage = () => {
  const router = useRouter();
  const { isAuth, isInitial } = useSelector(selectors.userSelector);
  const { t } = useTranslation();

  const { sort = 'SORT_DIRECTION_CREATED_AT_DESC' } = router.query as {
    sort: SortType;
  };

  const { watchLaterTotalCount } = useSelector(selectors.watchLaterSelectors);

  const handleToggleSortType = useCallback(
    (value: string) => {
      router.replace(`${APP_PATHS_PAGES.watchLater}?sort=${value}`);
    },
    [router],
  );

  const {
    isError, isFetching, videos, onEndReached, isLastPage, refetch,
  } = useWatchLaterList({
    sortType: sort,
  });

  const dataGrid = {
    data: videos,
    hasNextPage: !isLastPage && !isFetching,
    isLoading: isFetching,
    onEndReached,
  };

  const actions = useGetVideoActions({ actionsList: ['addToWatchLater', 'addToQueue', 'addToSaved', 'addReportToVideo'] });

  if (!isAuth && !isInitial) {
    return (
      <HeaderWrapper>
        <IsNotAuthorized
          dti="watch-later-not-auth-text"
          subtitleText="Watch_Later_Unauthorized_Subtitle_Text"
        />
      </HeaderWrapper>
    );
  }

  if (isError) {
    return (
      <HeaderWrapper>
        <EmptyContainer
          text={t('Watch_Later_Page_Empty_Container_Text')}
          subtitleText={t('Watch_Later_Page_Empty_Container_Subtitle_Text')}
          height={300}
          errorHandler={{
            refetch,
            isError,
          }}
        />
      </HeaderWrapper>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {videos.length ? (
        <SplitPaper.Wrapper className="mb-6 sm:mb-4">
          <SplitPaper.TopBlock className="px-6 py-10 md:!p-4">
            <WatchLaterHeader totalItems={watchLaterTotalCount} />
          </SplitPaper.TopBlock>
          <SplitPaper.BottomBlock className="flex justify-between px-6 py-7 md:pl-4 md:py-4.5">
            <SortBtn
              dti="watch-later-sort-button"
              value={sort}
              onClick={handleToggleSortType}
            />
          </SplitPaper.BottomBlock>
        </SplitPaper.Wrapper>
      ) : (
        <Paper className="px-6 py-10 md:!p-4">
          <WatchLaterHeader totalItems={watchLaterTotalCount} />
        </Paper>
      )}

      <Paper className="h-auto" data-testid="watch-later-container">
        <VideoList.Grid
          NotFoundComponent={WatchLaterEmptyComponent}
          getVideoActions={actions}
          {...dataGrid}
          dti="watchlater"
        />
      </Paper>
    </div>
  );
};

export default WatchLaterPage;
