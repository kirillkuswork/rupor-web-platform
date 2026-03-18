import { BlockHeaderInner } from 'rupor-ui-kit';
import { BreadCrumbs, Route } from '@/shareds/ui/BreadCrumbs';
import { ICategoryWithVideos } from '@/redux/services/categories/baseTypes';
import { EmptyContainer, Paper } from '@/shareds';
import { ChannelsFeed } from '@/sections/ChannelsFeed';
import { useTranslation } from 'next-i18next';
import { useGetChannelByCategoryPlaylists } from './useGetChannelByCategoryPlaylists';

interface IChannelPageByCategoryPage {
  category?: ICategoryWithVideos;
  id?: string;
  routes: Route[];
}

export const ChannelPageByCategoryPage = ({
  category, id, routes,
}: IChannelPageByCategoryPage) => {
  const categoryId = Number(id);
  const { t } = useTranslation();
  const {
    channels,
    isError,
    refetch,
    isLastPage,
    isFetching,
    ref: endPageRef,
    isReady,
  } = useGetChannelByCategoryPlaylists({ categoryId });

  const isEmpty = !channels?.length && !isFetching;

  if (isError) {
    return (
      <EmptyContainer
        text="Channel_Page_By_Category_Page_Error_Empty_Container_Text"
        errorHandler={{
          refetch,
          isError,
        }}
      />
    );
  }

  return (
    <>
      <Paper className="sm:px-4 sm:py-4.5 md:mb-4">
        <BreadCrumbs
          id={categoryId}
          dti="category-channels-breadcrumbs"
          className="mt-0 mb-1.5 sm:my-0"
          routes={routes}
        />
        <BlockHeaderInner.Title className="text-headline-s sm:text-headline-xs">
          {category?.title ? t(category.title) : ''}
        </BlockHeaderInner.Title>
      </Paper>

      {isEmpty ? (
        <Paper>
          <EmptyContainer
            text={t('Channel_Page_By_Category_Page_Empty_Container_Text')}
            subtitleText={t('Channel_Page_By_Category_Page_Empty_Container_Subtitle_Text')}
          />
        </Paper>
      ) : (
        <ChannelsFeed
          channels={channels}
          hasNextPage={!isLastPage}
          isLoading={isFetching}
          scrollElement={endPageRef}
          isReady={isReady}
          dti="category"
          contentCategoryId={categoryId.toString()}
        />
      )}
    </>
  );
};
