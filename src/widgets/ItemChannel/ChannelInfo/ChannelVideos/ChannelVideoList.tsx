import { FC, memo, useCallback } from 'react';

import Link from 'next/link';

import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import {
  IVideoCardWithDetailsProps,
  VideoCardWithDetails,
} from '@/entities/Video';
import { BlockHeaderInner, Channel } from 'rupor-ui-kit/dist';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';
import { useTranslation } from 'next-i18next';

interface IChannelVideoList {
  videos: IVideoCardWithDetailsProps[];
  channelId: string;
  dti?: string;
}

export const ChannelVideoList: FC<IChannelVideoList> = memo(
  ({ videos, channelId, dti }) => {
    const actions = useGetVideoActions({
      actionsList: [
        'addToWatchLater',
        'addToQueue',
        'addToSaved',
        'addReportToVideo',
      ],
    });

    const videoItem = useCallback(
      (video: IVideoCardWithDetailsProps) => (
        <VideoCardWithDetails
          key={video.videoId}
          getVideoActions={actions}
          isShowChannelLogo={false}
          dti={dti}
          {...video}
        />
      ),
      [],
    );

    const { t } = useTranslation();

    const { Element: VideoList } = arrayRender({
      items: videos.length > 3 ? videos.slice(0, 2) : videos,
      renderItem: videoItem,
    });

    return (
      <Channel.RightContainer>
        <VideoList />
        {videos.length > 3 && (
          <Link href={`${APP_PATHS_PAGES.channels}/${channelId}`} passHref>
            <Channel.CountVideoContainer
              data-testid={`${dti}-go-to-channel-button_${channelId}`}
              className="w-full aspect-video"
            >
              <BlockHeaderInner.TitleWrapper>
                <BlockHeaderInner.Subtitle className="text-black/40 dark:text-white/40 dark:hover:text-white !m-0">
                  <Channel.RightAllow />
                </BlockHeaderInner.Subtitle>
              </BlockHeaderInner.TitleWrapper>
              <Channel.SubTitle>
                {t('Channel_Video_List_Subtitle')}
              </Channel.SubTitle>
            </Channel.CountVideoContainer>
          </Link>
        )}
      </Channel.RightContainer>
    );
  },
);

ChannelVideoList.displayName = 'ChannelVideoList';
