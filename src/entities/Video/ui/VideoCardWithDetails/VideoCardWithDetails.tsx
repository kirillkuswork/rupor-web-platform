import { HVideoCard as HUIKitVideoCard, VideoCard as VUIKitVideoCard } from 'rupor-ui-kit';
import Link from 'next/link';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import imgProxy from '@/shareds/lib/utils/imgProxy';
import { buildPathWithQueryParams } from '@/shareds/lib/helpers/buildPathWithQueryParams';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { localStorageHandler } from '@/shareds/lib/helpers/localStorageHandler';
import { isNewAuthMode } from '@/shareds/lib/utils/isNewAuthMode';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { MouseEvent, useCallback } from 'react';
import { useSendYmMetrics, useAuthModal } from 'rupor-common';
import { useGetMutatedStateFromActions } from '../../model/hooks/useGetMutatedStateFromActions';
import { VideoCard } from '../VideoCard';
import { VideoCardWithDetailsDescription } from './VideoCardWithDetailsDescription';
import { IVideoCardWithDetailsProps } from '../../model/types/videoCardWithDetailsProps';

export const VideoCardWithDetails = (props: IVideoCardWithDetailsProps) => {
  const { videoState, videoActions } = useGetMutatedStateFromActions(props);

  const { t } = useTranslation();

  const {
    channelId,
    channelLogo,
    videoId,
    isShowChannelLogo = true,
    className,
    variant = 'vertical',
    index,
    contentListId,
    parentIndex,
  } = videoState;
  const { isAuth } = useSelector(selectors.userSelector);
  const { openModal } = useAuthModal();
  const routerPathToVideoByIdPage = `${APP_PATHS_PAGES.videos}/${videoId}`;
  const routerPathToChannelByIdPage = `${APP_PATHS_PAGES.channels}/${channelId}`;

  const userViewProgressFromStorage = localStorageHandler.getValueFromStorage({
    key: 'playerParams',
  });

  const userViewTime = userViewProgressFromStorage?.[videoId]?.time ?? 0;

  const buildedVideoPagePath = useCallback(() => {
    if (isNewAuthMode() && !isAuth) return '';

    return buildPathWithQueryParams(routerPathToVideoByIdPage, {
      t: userViewTime,
    }, ['t']);
  }, [isAuth, routerPathToVideoByIdPage, userViewTime]);

  const buildedChannelPagePath = useCallback(() => {
    if (isNewAuthMode() && !isAuth) return '';

    return routerPathToChannelByIdPage;
  }, [isAuth, routerPathToChannelByIdPage]);

  const dataTestId = props?.dti ? `${props?.dti}-` : '';

  const DescriptionComponent = (
    <VideoCardWithDetailsDescription
      videoPagePath={buildedVideoPagePath()}
      channelPagePath={buildedChannelPagePath()}
      variant={variant}
      videoActions={videoActions}
      {...videoState}
      dti={dataTestId}
      index={index}
      contentListId={contentListId}
      parentIndex={parentIndex}
    />
  );

  const VideoCardContainerComponent = variant === 'vertical' ? VUIKitVideoCard : HUIKitVideoCard;

  const containerClassName = clsx(
    className,
    variant === 'vertical' && 'relative pointer',
    variant === 'horizontal' && 'pr-9',
  );

  const handleOnWatchLaterClick = useCallback((event?: MouseEvent<HTMLElement & HTMLButtonElement>) => {
    if (!isAuth && isNewAuthMode()) return;
    const onWatchLaterAction = videoActions?.find(
      (videoAction) => videoAction.label === t('Video_Option_Add_Video_To_Watchlist')
          || videoAction.label === t('Video_Option_Delete_Video_From_Watchlist'),
    );

    return onWatchLaterAction?.onClick?.(event);
  }, [isAuth, t, videoActions]);

  const handelOnClick = () => {
    if (!isAuth && isNewAuthMode()) {
      openModal('login');
    }
  };

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

  return (
    <VideoCardContainerComponent.Container
      data-testid={`${dataTestId}video-card-wrapper_${videoId}`}
      className={containerClassName}
      onClick={handelOnClick}
    >
      <VideoCard
        videoPagePath={buildedVideoPagePath()}
        onWatchLaterClick={handleOnWatchLaterClick}
        t={t}
        userViewProgress={userViewTime}
        dti={props?.dti}
        {...videoState}
      />
      {isShowChannelLogo && variant === 'vertical' ? (
        <VUIKitVideoCard.Wrapper className="h-[96px]">
          <Link href={buildedChannelPagePath()} onClick={handelOnChannelLogoClick}>
            <VUIKitVideoCard.Avatar
              data-testid={`${dataTestId}video-card-channel-avatar_${channelId}`}
              src={imgProxy({ imgUrl: channelLogo })}
            />
          </Link>
          {DescriptionComponent}
        </VUIKitVideoCard.Wrapper>
      ) : (
        DescriptionComponent
      )}
    </VideoCardContainerComponent.Container>
  );
};
