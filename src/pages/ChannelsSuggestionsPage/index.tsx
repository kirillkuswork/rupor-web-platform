import type { NextPage } from 'next';
import { BlockHeaderInner, Skeleton, Splider } from 'rupor-ui-kit';

import { BreadCrumbs, EmptyContainer, Paper } from '@/shareds';
import { Route } from '@/shareds/ui/BreadCrumbs';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';
import React, { memo, useCallback, useEffect } from 'react';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { useLazyGetCategoriesQuery } from '@/redux/services/categories';
import { ICategoryWithVideos } from '@/redux/services/categories/baseTypes';

import { CategoryChannels } from '@/features';
import { useTranslation } from 'next-i18next';

interface IChannelsSuggestionsPage {
  routes: Route[];
}

const preloadVideos = 5;

export const ChannelsSuggestionsPage: NextPage<IChannelsSuggestionsPage> = memo(({ routes = [] }) => {
  const [getCategories, { data, isLoading, isError }] = useLazyGetCategoriesQuery();
  const categories = data?.categories || [];
  const isReady = !isLoading && !isError;
  const { t } = useTranslation();

  const channelList = useCallback((category: ICategoryWithVideos) => (
    <CategoryChannels
      dti="subscriptions"
      key={category.id}
      categoryId={category.id!}
      categoryTitle={t(`${category.title}`)}
      href={`${APP_PATHS_PAGES.channelsSuggestions}/${category.id}`}
    />
  ), []);

  const skeletonList = useCallback((index: number) => (
    <Paper key={index}>
      <BlockHeaderInner.Title>
        <Skeleton className="h-5 max-w-[200px] mb-6 rounded" />
      </BlockHeaderInner.Title>
      <Splider
        slides={renderSkeletons({ template: 'channelCard', limit: 8 })}
      />
    </Paper>
  ), []);

  const { Element: CategoryChannelsList } = arrayRender({ items: categories, renderItem: channelList });
  const { Element: SkeletonList } = arrayRender({ items: [...Array(4)], renderItem: skeletonList });

  useEffect(() => {
    getCategories({ preloadVideos });
  }, [getCategories]);

  return (
    <div className="flex flex-col h-full">
      <Paper data-testid="subscriptions-findChannels-wrapper">
        <BreadCrumbs
          dti="subscriptions-breadCrumbs"
          className="mt-0 mb-0"
          routes={routes}
        />
        <BlockHeaderInner.Title data-testid="subscriptions-findChannels" className="mt-2 text-headline-s">
          {t('Channels_Suggestions_Page_Title')}
        </BlockHeaderInner.Title>
      </Paper>
      {isReady && <CategoryChannelsList />}
      {isError && (
        <Paper className="h-full">
          <EmptyContainer
            text={t('Channels_Suggestions_Page_Empty_Container_Text')}
            subtitleText={t('Channels_Suggestions_Page_Empty_Container_Subtitle_Text')}
            errorHandler={{
              refetch: () => getCategories({ preloadVideos }),
              isError,
            }}
          />
        </Paper>
      )}
      {isLoading && <SkeletonList />}
    </div>
  );
});

ChannelsSuggestionsPage.displayName = 'ChannelsSuggestionsPage';
