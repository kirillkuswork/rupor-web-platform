/* eslint-disable import/no-cycle */
import {
  EyeIcon,
  formatCount,
  HVideoCard as HUIKitVideoCard,
  VideoCard as VUIKitVideoCard,
  WatchIcon,
} from 'rupor-ui-kit';
import Link from 'next/link';
import { formatDateAgo } from '@/shareds/lib/utils/formatDateAgo';
import { useTranslation } from 'next-i18next';
import { useSendYmMetrics } from 'rupor-common';
import { TVideoAction, TVideoCardVariants } from '../../model/types/videoCardWithDetailsProps';
import { VideoActions } from './VideoActions';

export interface IVideoCardWithDetailsDescriptionProps {
  channelTitle?: string;
  videoPagePath: string;
  channelPagePath: string;
  viewsCount?: string;
  publishedAt?: string;
  videoTitle: string;
  variant?: TVideoCardVariants;
  videoActions?: TVideoAction[];
  videoId?: string;
  channelId?: string;
  dti?: string;
  index?: number;
  contentListId?: string;
  parentIndex?: number;
}

const VVideoCardWithDetailsDescription = ({
  channelTitle,
  videoPagePath,
  videoTitle,
  channelPagePath,
  publishedAt = '',
  viewsCount = '0',
  videoActions,
  videoId,
  channelId,
  dti,
  index,
  contentListId,
  parentIndex,
}: Omit<IVideoCardWithDetailsDescriptionProps, 'variant'>) => {
  const { t } = useTranslation();
  const { sendYmMetric } = useSendYmMetrics();

  const handelOnChannelLogoClick = () => {
    sendYmMetric({ // метрика 2.7.11 Пользователь в списке видео нажимает на аватар/название канала
      event_group: 'event',
      event_category: 'content',
      event_label: 'kanal',
      event_name: 'content-element_click-kanal',
      event_action: 'element_click',
      event_context: 'polka',
      channel_id: channelId,
      content_id: videoId,
      content_list_position: parentIndex != undefined ? parentIndex.toString() : 'na', // порядковый номер канала/категории/плейлиста в списке
      content_list_id: contentListId != undefined ? contentListId.toString() : 'na', // {id канала/категории/плейлиста в Rupor} //заполняется только на экранах "Каналы", "Категории", "Сохраненные
      content_type: 'video',
    });
  };

  const handelOnVideoClick = () => {
    console.log('\n\n\n@@@@ CLICK video name @@@');
    sendYmMetric({ // метрика 2.7.8 Пользователь нажимает на видео в общих списках видео (кроме "полок" и конкретного канала)
      // метрика 2.7.22 Пользователь нажимает на карточку видео на странице канала.
      event_group: 'event',
      event_category: 'content',
      event_label: 'video',
      event_name: 'content-element_click-video',
      event_action: 'element_click',
      channel_id: contentListId == channelId && parentIndex == undefined ? channelId : 'na', // передается только если находимся на странице конкретного канала
      content_id: videoId,
      content_in_list_position: index !== undefined ? index.toString() : 'na',
      content_type: 'video',
      // не понятно нужны ли остальные параметры для экрана Сохраненные видео
      // content_list_position: parentIndex != undefined ? parentIndex.toString() : 'na', // порядковый номер канала/категории/плейлиста в списке
      // content_list_id: contentListId != undefined ? contentListId.toString() : 'na', // {id канала/категории/плейлиста в Rupor} //заполняется только на экранах "Каналы", "Категории", "Сохраненные
    });
  };
  return (
    <VUIKitVideoCard.Description className="truncate">
      <VUIKitVideoCard.TitleWrapper>
        <Link href={videoPagePath} onClick={handelOnVideoClick}>
          <VUIKitVideoCard.Title
            data-testid={`${dti || ''}video-card-title_${videoId}`}
            className="whitespace-nowrap overflow-hidden overflow-ellipsis cursor-pointer line-clamp-none"
          >
            {videoTitle}
          </VUIKitVideoCard.Title>
        </Link>
        <VideoActions dti={`${dti || ''}video-card`} videoId={videoId} videoActions={videoActions} />
      </VUIKitVideoCard.TitleWrapper>

      {!!channelTitle?.length && (
      <Link href={channelPagePath} onClick={handelOnChannelLogoClick}>
        <VUIKitVideoCard.Label
          data-testid={`${dti || ''}video-card-label_${channelId}`}
          className="whitespace-nowrap overflow-hidden overflow-ellipsis cursor-pointer line-clamp-none"
        >
          {channelTitle}
        </VUIKitVideoCard.Label>
      </Link>
      )}

      <VUIKitVideoCard.InfoWrapper>
        <VUIKitVideoCard.InfoWrapper>
          <EyeIcon data-testid={`${dti || ''}video-card-views-icon_${videoId}`} className="w-4 h-4" />
          <VUIKitVideoCard.Info data-testid={`${dti || ''}video-card-views-count_${videoId}`}>
            {formatCount(Number(viewsCount))}
          </VUIKitVideoCard.Info>
        </VUIKitVideoCard.InfoWrapper>
        <VUIKitVideoCard.InfoWrapper>
          <WatchIcon data-testid={`${dti || ''}video-card-published-icon_${videoId}`} className="w-4 h-4" />
          <VUIKitVideoCard.Info data-testid={`${dti || ''}video-card-published-count_${videoId}`}>
            {formatDateAgo(publishedAt, t)}
          </VUIKitVideoCard.Info>
        </VUIKitVideoCard.InfoWrapper>
      </VUIKitVideoCard.InfoWrapper>
    </VUIKitVideoCard.Description>
  );
};

const HVideoCardWithDetailsDescription = ({
  videoPagePath,
  videoTitle,
  channelTitle,
  channelPagePath,
  viewsCount = '0',
  publishedAt = '',
  videoActions,
  videoId,
  channelId,
  dti,
  index,
  contentListId,
  parentIndex,
}: Omit<IVideoCardWithDetailsDescriptionProps, 'variant'>) => {
  const { t } = useTranslation();

  const { sendYmMetric } = useSendYmMetrics();

  const handelOnChannelLogoClick = (el: any) => {
    sendYmMetric({ // метрика 2.7.11 Пользователь в списке видео нажимает на аватар/название канала
      event_group: 'event',
      event_category: 'content',
      event_label: 'kanal',
      event_name: 'content-element_click-kanal',
      event_action: 'element_click',
      event_context: 'polka',
      channel_id: channelId,
      content_id: videoId,
      content_list_position: parentIndex != undefined ? parentIndex.toString() : 'na', // порядковый номер канала/категории/плейлиста в списке
      content_list_id: contentListId != undefined ? contentListId.toString() : 'na', // {id канала/категории/плейлиста в Rupor} //заполняется только на экранах "Каналы", "Категории", "Сохраненные
      content_type: 'video',
    });
    el.stopPropagation();
  };

  const handelOnVideoClick = () => {
    sendYmMetric({ // метрика 2.7.8 Пользователь нажимает на видео в общих списках видео (кроме "полок" и конкретного канала)
      // метрика 2.7.22 Пользователь нажимает на карточку видео на странице канала.
      event_group: 'event',
      event_category: 'content',
      event_label: 'video',
      event_name: 'content-element_click-video',
      event_action: 'element_click',
      channel_id: contentListId == channelId && parentIndex == undefined ? channelId : 'na', // передается только если находимся на странице конкретного канала
      content_id: videoId,
      content_in_list_position: index !== undefined ? index.toString() : 'na',
      content_type: 'video',
      // не понятно нужны ли остальные параметры для экрана Сохраненные видео
      // content_list_position: parentIndex != undefined ? parentIndex.toString() : 'na', // порядковый номер канала/категории/плейлиста в списке
      // content_list_id: contentListId != undefined ? contentListId.toString() : 'na', // {id канала/категории/плейлиста в Rupor} //заполняется только на экранах "Каналы", "Категории", "Сохраненные
    });
  };

  return (
    <>
      <div className="absolute right-0 z-10">
        <VideoActions dti={`${dti || ''}video-card`} videoId={videoId} videoActions={videoActions} />
      </div>
      <Link href={videoPagePath} onClick={handelOnVideoClick}>
        <HUIKitVideoCard.Wrapper className="w-full">
          <HUIKitVideoCard.Title
            data-testid={`${dti || ''}video-card-title_${videoId}`}
            className="whitespace-nowrap overflow-hidden overflow-ellipsis cursor-pointer line-clamp-none"
          >
            {videoTitle}
          </HUIKitVideoCard.Title>
          {!!channelTitle?.length && (
          <Link href={channelPagePath} onClick={handelOnChannelLogoClick}>
            <HUIKitVideoCard.Label
              data-testid={`${dti || ''}video-card-label_${channelId}`}
              className="whitespace-nowrap overflow-hidden overflow-ellipsis cursor-pointer line-clamp-none"
            >
              {channelTitle}
            </HUIKitVideoCard.Label>
          </Link>
          )}
          <HUIKitVideoCard.InfoWrapper>
            <EyeIcon data-testid={`${dti || ''}video-card-views-icon_${videoId}`} className="w-4 h-4" />
            <HUIKitVideoCard.Info data-testid={`${dti || ''}video-card-views-count_${videoId}`}>
              {formatCount(Number(viewsCount))}
            </HUIKitVideoCard.Info>
            <WatchIcon data-testid={`${dti || ''}video-card-published-icon${videoId}`} className="w-4 h-4" />
            <HUIKitVideoCard.Info data-testid={`${dti || ''}video-card-published-count_${videoId}`}>
              {formatDateAgo(publishedAt, t)}
            </HUIKitVideoCard.Info>
          </HUIKitVideoCard.InfoWrapper>
        </HUIKitVideoCard.Wrapper>
      </Link>
    </>
  );
};

export const VideoCardWithDetailsDescription = (
  props: IVideoCardWithDetailsDescriptionProps,
) => {
  const { variant = 'vertical', ...otherProps } = props;

  const mapVariantToComponent: Record<TVideoCardVariants, JSX.Element> = {
    vertical: <VVideoCardWithDetailsDescription {...otherProps} />,
    horizontal: <HVideoCardWithDetailsDescription {...otherProps} />,
  };

  return mapVariantToComponent[variant];
};
