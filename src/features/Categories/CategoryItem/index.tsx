import {
  FC, memo, useMemo, useState,
} from 'react';

import Link from 'next/link';
import { BlockHeaderInner, RightArrowIcon } from 'rupor-ui-kit';
import type { SpliderApi } from 'rupor-ui-kit/dist/components/Splider/Splider.types';
import { EmptyContainer, Paper, SpliderNavigation } from '@/shareds';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { IVideoCardWithDetailsProps, VideoList } from '@/entities/Video';
import { ICategoryWithVideos } from '@/redux/services/categories/baseTypes';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';
import { useTranslation } from 'next-i18next';

export const CategoryItem: FC<ICategoryWithVideos> = memo(
  ({
    title, id, isLoading, videos = [], itemClassName, index,
  }) => {
    const [sliderApi, handleSliderApi] = useState<SpliderApi>();
    const { t } = useTranslation();

    const videoCards = useMemo(() => videos?.map((video) => ({
      videoId: video?.id,
      duration: video?.duration,
      ageRating: video?.ageRating,
      videoTitle: video?.title,
      viewsCount: video?.views?.count,
      thumbnailUrl: video?.thumbnail?.url,
      publishedAt: video?.publishedAt,
      channelId: video?.channel?.id,
      channelLogo: video?.channel?.logoUrl,
      channelTitle: video?.channel?.title,
      watchLater: video?.playlists?.watchLater,
      saved: video?.playlists?.saved,
      dti: 'categories',
    })) as IVideoCardWithDetailsProps[], [videos]);

    const actions = useGetVideoActions({ actionsList: ['addToWatchLater', 'addToQueue', 'addToSaved', 'addReportToVideo'] });

    return (
      <Paper className="py-4.5 md:py-4 md:pr-0 md:pl-4 overflow-hidden md:mb-4">
        <BlockHeaderInner.Container split>
          <Link href={`${APP_PATHS_PAGES.categories}/${id}`} passHref>
            <BlockHeaderInner.TitleWrapper
              data-testid={`category-item-title_${id}`}
            >
              <BlockHeaderInner.Title className="text-paragraph-l mr-[1rem]">
                {!!title?.length && t(title)}
              </BlockHeaderInner.Title>
              <BlockHeaderInner.Subtitle>
                <RightArrowIcon width={20} />
              </BlockHeaderInner.Subtitle>
            </BlockHeaderInner.TitleWrapper>
          </Link>
          {!!videos?.length && (
            <SpliderNavigation id={id} dti="category-item" {...sliderApi} />
          )}
        </BlockHeaderInner.Container>

        <div className="mt-4.5">
          {videos?.length ? (
            <VideoList.Slider
              data={videoCards}
              isLoading={isLoading}
              sliderApiHandler={handleSliderApi}
              itemClassName={itemClassName}
              getVideoActions={actions}
              index={index}
              contentListId={id?.toString()}
            />
          ) : (
            <EmptyContainer
              text={t('Category_Item_Empty_Container_Text')}
              isPage={false}
              height={300}
            />
          )}
        </div>
      </Paper>
    );
  },
);

CategoryItem.displayName = 'CategoryItem';
