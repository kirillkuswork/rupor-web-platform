import { BlockHeaderInner, formatCount, SplitPaper } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { Option, SortBtn } from '@/entities/SortBtn';
import { SortType } from '@/shareds/types/sortTypes';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useRouter } from 'next/router';
import { ControlBlock } from '@/features';
import { ChannelsFeed } from '@/sections/ChannelsFeed';
import { EmptyContainer } from '@/shareds/ui';
import { memo, useCallback } from 'react';
import { useGetChannelPlaylists } from './useGetChannelPlaylists';

// TODO Переделать. Пока хардкод, потому что бек не возвращает total
const totalChannels = 1000;

export const ChannelsPage = memo(() => {
  const { t } = useTranslation();
  const router = useRouter();
  const { sort = 'SORT_DIRECTION_CREATED_AT_DESC' } = router.query as { sort: SortType };

  const handleToggleSortType = useCallback((value: Option['value']) => {
    router.replace(`${APP_PATHS_PAGES.channels}?sort=${value}`);
  }, []);

  const {
    channels,
    isError,
    refetch,
    isLastPage,
    isFetching,
    ref: endPageRef,
    isReady,
  } = useGetChannelPlaylists({ sortType: sort });

  if (isError) {
    return (
      <EmptyContainer
        text={t('Channels_Page_Empty_Container_Error')}
        errorHandler={{
          refetch,
          isError,
        }}
      />
    );
  }

  return (
    <>
      <SplitPaper.Wrapper className="mb-6 sm:mb-4" data-testid="channels-header-wrapper">
        <SplitPaper.TopBlock className="px-6 py-10 md:p-4">
          <BlockHeaderInner.Container className="justify-between">
            <BlockHeaderInner.TitleWrapper className="text-headline-s md:!text-headline-xs">
              <BlockHeaderInner.Title data-testid="channels-header-title" className="!mr-6 md:!mr-4">
                {t('Common_channels')}
              </BlockHeaderInner.Title>
              <BlockHeaderInner.Subtitle data-testid="channels-header-count" className="font-semibold text-headline-s">
                {totalChannels ? formatCount(totalChannels) : ''}
              </BlockHeaderInner.Subtitle>
            </BlockHeaderInner.TitleWrapper>
            <ControlBlock />
          </BlockHeaderInner.Container>
        </SplitPaper.TopBlock>
        <SplitPaper.BottomBlock className="px-6 py-8 md:p-4">
          <SortBtn
            dti="channels-sort-dropdown"
            onClick={handleToggleSortType}
            value={sort}
          />
        </SplitPaper.BottomBlock>
      </SplitPaper.Wrapper>
      <ChannelsFeed
        channels={channels}
        hasNextPage={!isLastPage}
        isLoading={isFetching}
        scrollElement={endPageRef}
        isReady={isReady}
        dti="channels"
      />
    </>
  );
});

ChannelsPage.displayName = 'ChannelsPage';
