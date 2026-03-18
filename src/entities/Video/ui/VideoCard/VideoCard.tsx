import { VideoCard as UIKitVideoCard } from 'rupor-ui-kit';
import Link from 'next/link';
import { TAgeRating } from '@/shareds/types/ageRating';
import { LEGAL_AGE } from '@/shareds/constants/restrictions';
import { msToHMSFormat } from '@/shareds/lib/utils/msToHMSFormat';
import { MouseEvent } from 'react';
import { TFunction } from 'i18next';
import { mapAgeRatingToTitle } from '@/shareds/constants/ageRatingToTitle';
import { TUploadingSource } from '@/redux/services/video/baseModel';
import { useFetchVideoThumbnail } from '@/entities/Video/model/hooks/useFetchVideoThumbnail';
import { useSendYmMetrics } from 'rupor-common';

export interface IVideoCardProps {
  /* Флаг добавлен ли видеоролик в плейлист Смотреть позже */
  watchLater?: boolean;
  /* Показывать ли кнопку Добавить/Удалить в/из плейлиста смотреть позже */
  isShowWatchLaterButton?: boolean;
  /* Продолжительность видео в миллисекундах */
  duration?: number;
  /* Ссылка на постер видеоролика */
  thumbnailUrl?: string;
  /* Ссылка на путь к странице videoByid */
  videoPagePath: string;
  /* Название видеоролика */
  videoTitle?: string;
  /* Ограничение по возрасту на просмотр видео */
  ageRating?: TAgeRating;
  /* Переводчик для лейблов */
  t: TFunction<'translation', undefined>;
  /* Хендлер нажатия на кнопку смотреть позже */
  onWatchLaterClick?: (
    event?: MouseEvent<HTMLElement & HTMLButtonElement>,
  ) => void;
  /* Прогресс просмотра видеоролика пользователем */
  userViewProgress?: number;
  /* data-testid для компонента */
  dti?: string;
  /* id видео */
  videoId?: string;

  uploadingSource?: TUploadingSource

  index?: number;
  channelId?: string;
  contentListId?: string;
  parentIndex?: number;
}

// TODO:: Доделать ключи i18n и ?imgProxy?

export const VideoCard = (props: IVideoCardProps) => {
  const {
    ageRating = 'AGE_RATING_INVALID',
    duration = 0,
    userViewProgress = 0,
    thumbnailUrl = '',
    videoTitle = '',
    isShowWatchLaterButton = false,
    watchLater = false,
    onWatchLaterClick,
    videoPagePath,
    dti,
    videoId,
    uploadingSource = 'RUPOR',
    t,
    index,
    channelId,
    contentListId,
    parentIndex,
  } = props;

  const { thumbnailBlob, isLoading: isImageLoading, isError: isImageError } = useFetchVideoThumbnail({ uploadingSource, thumbnailUrl });

  const videoDuration = msToHMSFormat(duration * 1000);

  const viewProgress = (userViewProgress / Math.round(duration)) * 100;

  const dataTestId = dti ? `${dti}-` : '';

  const isAdultContent = ageRating === LEGAL_AGE;

  const ageRatingText = isAdultContent ? t('Video_Card_Preview_Content_Text') : mapAgeRatingToTitle[ageRating];

  const { sendYmMetric } = useSendYmMetrics();

  const handelOnVideoClick = () => {
    sendYmMetric({ // метрика 2.7.8 Пользователь нажимает на видео в общих списках видео (кроме "полок" и конкретного канала)
                   // метрика 2.7.22 Пользователь нажимает на карточку видео на странице канала.
      event_group: 'event',
      event_category: 'content',
      event_label: 'video',
      event_name: 'content-element_click-video',
      event_action: 'element_click',
      event_context: contentListId == channelId  && parentIndex == undefined? 'kanal' : undefined, // 2.7.22 kanal если находимся на странице конкретного канала
      channel_id: contentListId == channelId  && parentIndex == undefined? channelId : 'na', // передается только если находимся на странице конкретного канала
      content_id: videoId,
      content_in_list_position: index !== undefined ? index.toString() : 'na', 
      content_type: 'video',
      // не понятно нужны ли остальные параметры для экрана Сохраненные видео
      //content_list_position: parentIndex != undefined ? parentIndex.toString() : 'na', // порядковый номер канала/категории/плейлиста в списке
      //content_list_id: contentListId != undefined ? contentListId.toString() : 'na', // {id канала/категории/плейлиста в Rupor} //заполняется только на экранах "Каналы", "Категории", "Сохраненные
    });
  };

  return (
    <UIKitVideoCard.Preview data-testid={`${dataTestId}video-card-header_${videoId}`}>
      <Link href={videoPagePath} onClick={handelOnVideoClick}>
        <UIKitVideoCard.Preview
          isAdultContent={isAdultContent}
          ageRatingText={ageRatingText}
          duration={videoDuration}
          progress={viewProgress}
          videoDurationDti={`${dataTestId}video-card-duration_${videoId}`}
          src={thumbnailBlob}
          alt={videoTitle}
          isImageLoading={isImageLoading}
          isImageError={isImageError}
          useExternalLoadControl
        >
          {!isShowWatchLaterButton && (
            <UIKitVideoCard.WatchLaterTooltip
              watchIconDti={`${dataTestId}watch-later-icon`}
              data-testid={`${
                watchLater
                  ? `${dataTestId}video-card-delete-from-watch-later`
                  : `${dataTestId}video-card-watch-later`
              }_${videoId}`}
              labels={[
                t('Video_Option_Add_Video_To_Watchlist'),
                t('Video_Option_Delete_Video_From_Watchlist'),
              ]}
              selected={watchLater}
              onClick={onWatchLaterClick}
            />
          )}
        </UIKitVideoCard.Preview>
      </Link>
    </UIKitVideoCard.Preview>
  );
};
