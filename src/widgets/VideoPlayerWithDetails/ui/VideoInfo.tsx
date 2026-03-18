import { Paper } from '@/shareds';
import Link from 'next/link';
import imgProxy from '@/shareds/lib/utils/imgProxy';
import { SubscribeButton } from '@/features/SubscribeToChannel';
import { formatDateToString } from '@/shareds/lib/utils/formatDateToString';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { Fragment, useState } from 'react';
import {
  AdditionalActions,
  Avatar,
  ChannelView,
  Description,
  EyeIcon,
  formatCount,
  Skeleton,
  WatchIcon,
} from 'rupor-ui-kit';
import { VerticalBreakdown } from '@/shareds/ui/VerticalBreakdown';
import { ShareVideoButton } from '@/features/ShareVideo';
import { HFlex } from '@/shareds/ui/Flex';
import { mapVideoProps, VideoActions } from '@/entities/Video';
import { AddVideoToPlaylist } from '@/features/AddVideoToPlaylist';
import { AddReactionToVideo } from '@/features/AddReactionToVideo';
import { IChannelResponse, IVideo, IVideoChannel } from '@/redux/services/video/baseModel';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useTranslation } from 'next-i18next';
import { useFormatCountTranslations } from '@/shareds/hooks/useFormatCountTranslations';
import { mapProps } from '@/shareds/lib/helpers/mapProps';
import { mapAgeRatingToTitle } from '@/shareds/constants/ageRatingToTitle';
import { linkify } from '@/shareds/lib/utils/linkify';
import { useSendYmMetrics } from 'rupor-common';
import { useGetVideoInfoActions } from '../model/hooks/useGetVideoInfoActions';

interface IVideoInfoContent {
  video: IVideo;
}

export const VideoInfoContent = (props: IVideoInfoContent) => {
  const { video } = props;
  const { t } = useTranslation();

  const channelData = mapProps<IVideoChannel, IChannelResponse>(video.channel ?? {}, {
    channelId: (channel) => channel.id,
    ownerId: (channel) => channel.owner?.authorId,
    iconUrl: (channel) => channel.icon?.url,
    subscribersCount: (channel) => channel.subscribersCount,
    subscribed: (channel) => channel.subscribed,
    title: (channel) => channel.title,
    logoUrl: (channel) => channel.logoUrl,
  });

  const [videoData] = mapVideoProps([video]);
  const videoActions = useGetVideoInfoActions(videoData);

  // Первое значение - кол-во сабов, второе - предыдущее состояние (sub = true, unsub = false)
  const [subCount, setSubCount] = useState<[number, boolean]>([video?.channel?.subscribersCount || 0, video?.channel?.subscribed || false]);
  const { viewsDeclensions, subsDeclensions } = useFormatCountTranslations();
  const { isVideoByIdSaved } = useSelector(selectors.videoQueueSelectors.videoQueueSelector);
  const { isVideoByIdWatchLater } = useSelector(selectors.videoQueueSelectors.videoQueueSelector);

  const videoDataTransformed = {
    ...videoData,
    saved: isVideoByIdSaved,
    watchLater: isVideoByIdWatchLater,
  };

  const ageRatingText = videoDataTransformed.ageRating ? mapAgeRatingToTitle[videoDataTransformed.ageRating] : '';

  const viewIcons = [
    {
      icon: (
        <EyeIcon
          data-testid={`video-info-description-additional-icon-0_${video.id}`}
          width={17}
        />
      ),
      title: (
        <span
          data-testid={`video-info-description-additional-title-0_${video.id}`}
        >
          {formatCount(Number(video?.views?.count), viewsDeclensions)}
        </span>
      ),
    },
    {
      icon: (
        <WatchIcon
          data-testid={`video-info-description-additional-icon-1_${video.id}`}
          width={18}
        />
      ),
      title: (
        <span
          data-testid={`video-info-description-additional-title-1_${video.id}`}
        >
          {formatDateToString({ date: video.publishedAt!, t })}
        </span>
      ),
    },
  ];

  const { elementsArray: ViewIcons } = arrayRender({
    items: viewIcons,
    renderItem: (item, index) => (
      <Fragment key={index}>
        <span className="mr-2 text-shuttle-gray">{item.icon}</span>
        <span className="text-shuttle-gray mr-2.5">{item?.title}</span>
      </Fragment>
    ),
  });

  const { sendYmMetric } = useSendYmMetrics();

  const handelOnChannelTitleClick = () => {
    sendYmMetric({ // метрика 2.7.10 Пользователь на экране просмотра видео нажимает на наименование канала 
      event_group: 'event',
      event_category: 'content',
      event_label: 'kanal',
      event_name: 'content-element_click-video',
      event_action: 'element_click',
      event_context: 'pod_pleerom',
      channel_id: video?.channel?.id,
      content_id: video.id,
      content_type: 'video',
    });
  };

  return (
    <Paper className="pt-4 pb-4.5 px-0">
      <div className="mb-[19px] px-6 sm:px-4">
        <div className="flex justify-between items-center w-full mb-5 gap-6 sm:gap-4">
          <h2
            data-testid={`video-info-channel-view_${video.id}`}
            className="font-bold leading-8 text-headline-s sm:text-headline-xs truncate-text"
          >
            {video?.title}
          </h2>
          <VideoActions
            videoId={video.id}
            dti="video-info"
            className="flex items-center"
            videoActions={videoActions}
            alwaysVisible
          />
        </div>
        <AdditionalActions.Wrapper>
          <AddReactionToVideo reactions={video?.reactions} videoId={video.id} />
          <VerticalBreakdown />
          <HFlex gap="16" maxWidth={false}>
            <ShareVideoButton videoData={videoData} />
            <AddVideoToPlaylist.ToSavedPlaylist
              dti="video-info"
              videoData={videoDataTransformed}
            />
            <AddVideoToPlaylist.ToWatchLaterPlaylist
              dti="video-info"
              videoData={videoDataTransformed}
            />
          </HFlex>
        </AdditionalActions.Wrapper>
      </div>
      <ChannelView.Wrapper className="!py-[18px] sm:px-4">
        <ChannelView.Container>
          <Link href={`/channels/${video?.channel?.id}`} passHref onClick={handelOnChannelTitleClick}>
            <Avatar
              data-testid={`video-info-channel-avatar_${video.id}`}
              src={imgProxy({
                imgUrl: video?.channel?.logoUrl,
              })}
              size={40}
            />
          </Link>

          <div className="pl-4">
            <Link
              key="channel-title"
              passHref
              onClick={handelOnChannelTitleClick}
              href={`/channels/${video?.channel?.id}`}
            >
              <ChannelView.Title
                data-testid={`video-info-channel-view-title_${video.id}`}
              >
                {video?.channel?.title}
              </ChannelView.Title>
            </Link>
            <ChannelView.SubTitle
              data-testid={`video-info-channel-view-subscribers_${video.id}`}
              className="text-paragraph-m-s"
            >
              {formatCount(subCount[0], subsDeclensions)}
            </ChannelView.SubTitle>
          </div>
        </ChannelView.Container>
        <ChannelView.Container>
          <SubscribeButton
            dti="video-info-channel-view"
            channelId={channelData.channelId ?? ''}
            videoId={video.id}
            ownerId={channelData.ownerId ?? ''}
            subscribed={channelData.subscribed ?? false}
            title={channelData.title ?? ''}
            logoUrl={channelData.logoUrl ?? ''}
            size="small"
            setSubCount={setSubCount}
          />
        </ChannelView.Container>
      </ChannelView.Wrapper>
      <div className="px-6 mt-5 sm:px-4">
        {video?.description && (
        <Description stringCount={2} className="whitespace-pre-line">
          {linkify(video.description, video.id)}
        </Description>
        )}
        <AdditionalActions.Wrapper>
          {
            !!ageRatingText.length && (
              <span className="bg-[rgba(255,255,255,0.12)] w-[40px] text-center rounded-sm mr-2.5">{ageRatingText}</span>
            )
          }
          {ViewIcons}
        </AdditionalActions.Wrapper>
      </div>
    </Paper>
  );
};

interface IVideoInfo {
  video?: IVideo;
  isLoading?: boolean;
}

export const VideoInfo = ({ isLoading, video }: IVideoInfo) => {
  if (isLoading || !video) {
    return (
      <Paper className="px-6 my-6">
        <Skeleton template="videoFooter" />
      </Paper>
    );
  }

  return <VideoInfoContent video={video} />;
};
