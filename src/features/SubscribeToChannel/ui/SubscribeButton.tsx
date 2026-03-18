import {
  memo, useEffect, useState,
} from 'react';
import { ButtonProps } from 'rupor-ui-kit/dist/components/Button/Button.types';
import { Button } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useAuthWarning } from '@/shareds/hooks/useAuthWarning';
import imgProxy from '@/shareds/lib/utils/imgProxy';
import { subscribeNotification } from '@/temporal/SubscribeNotification/SubscribeNotification';
import { SubscribePropsType } from '@/temporal/SubscribeNotification/types';
import { useLazySubscribeToChannelQuery, useLazyUnsubscribeFromChannelQuery } from '@/redux/services/channels';
import { useSendYmMetrics } from 'rupor-common';

type ButtonSize = ButtonProps['size'];

interface ISubscribeButtonProps {
  channelId: string
  ownerId: string
  videoId?: string
  categoryId?: number
  subscribed: boolean
  title: string,
  logoUrl: string,
  // channel: IChannelResponse;
  size?: ButtonSize;
  className?: string;
  dti?: string;
  // Нужно для локального изменения числа подписчиков
  // Первое значение - кол-во сабов, второе - предыдущее состояние (sub = true, unsub = false)
  setSubCount?: React.Dispatch<React.SetStateAction<[number, boolean]>>;
}

export const SubscribeButton = memo(
  ({
    channelId = '',
    ownerId = '',
    videoId = '',
    categoryId,
    subscribed,
    title,
    logoUrl,
    size = 'medium',
    className,
    dti,
    setSubCount,
  }: ISubscribeButtonProps) => {
    const { t } = useTranslation();
    const { openAuthWarning } = useAuthWarning();
    const { isAuth, user } = useSelector(selectors.userSelector);

    const isOwnChannel = isAuth && user?.id === ownerId;

    const { subscribedChannel } = useSelector(selectors.playlistSelector);

    const [isSubscribed, setIsSubscribed] = useState<boolean | null>(subscribed);

    useEffect(() => {
      setIsSubscribed(subscribed);
    }, [subscribed]);

    useEffect(() => {
      if (subscribedChannel?.channelId === channelId) {
        setIsSubscribed(subscribedChannel?.isSubscribed);
      }
    }, [channelId, subscribedChannel]);

    const getSubButtonTitle = () => {
      if (!isAuth) return 'Subscribe';
      if (isOwnChannel) return 'Own_Channel';

      return isSubscribed ? 'Unsubscribe' : 'Subscribe';
    };

    const [subscribe, { isLoading: isSubLoading }] = useLazySubscribeToChannelQuery();
    const [unsubscribe, { isLoading: isUnsubLoading }] = useLazyUnsubscribeFromChannelQuery();

    const isLoading = isSubLoading || isUnsubLoading;
    const isSecondary = (isOwnChannel || isSubscribed) && isAuth;

    // Функция для локального изменения кол-ва подписчиков при подписке/отписке
    const handleChangeSubCountState = (isSub: boolean) => {
      if (!setSubCount) return;

      if (isSub) {
        setSubCount((prev: [number, boolean]) => {
          if (!prev[1]) return prev;
          return [prev[0] - 1, false];
        });
      }

      if (!isSub) {
        setSubCount((prev: [number, boolean]) => {
          if (prev[1]) return prev;
          return [prev[0] + 1, true];
        });
      }
    };

    const handleOnSub = async () => {
      await subscribe({ channelId }).unwrap();
      handleChangeSubCountState(true);
      setIsSubscribed(true);
    };

    const handleOnUnsub = async () => {
      await unsubscribe({ channelId }).unwrap();
      handleChangeSubCountState(false);
      setIsSubscribed(false);
    };

    const handleNotification = (type: SubscribePropsType) => {
      const mainText = type === SubscribePropsType.subscribe ? t('Subscribe_Notification_Subscribe') : t('Subscribe_Notification_Unsubscribe');
      const buttonText = t('Subscribe_Notification_Button_Label');
      subscribeNotification({
        title,
        src: imgProxy({
          imgUrl: logoUrl,
        }),
        id: channelId,
        type,
        onSub: handleOnSub,
        onUnsub: handleOnUnsub,
        mainText,
        buttonText,
        t,
      });
    };

    const { sendYmMetric } = useSendYmMetrics();

    if (isOwnChannel) {
      return null;
    }

    const handleSubscribe = async () => {
      if (!isAuth) {
        openAuthWarning(
          t('Subscribe_Button_Auth_Warning'),
          'channel-subscribe',
        );
        return;
      }

      try {
        if (isSubscribed) {
          await unsubscribe({ channelId }).unwrap();
          handleNotification(SubscribePropsType.unsubscribe);
          handleChangeSubCountState(isSubscribed);
          setIsSubscribed(false);
        }
        if (!isSubscribed) {
          if (videoId && videoId != '') {
            sendYmMetric({ // метрика 2.7.13 Пользователь нажимает на кнопку Подписаться под плеером на странице просмотра видео
              event_group: 'event',
              event_category: 'subscribe',
              event_name: 'subscribe-button_click-podpisatsya',
              event_label: 'podpisatsya',
              event_action: 'button_click',
              event_context: 'pod_pleerom',
              content_type: 'video',
              channel_id: channelId,
              content_id: videoId,
            });
          } else if (categoryId != undefined) {
            sendYmMetric({ // метрика 2.7.16 	Пользователь нажимает на кнопку Подписаться на странице конкретной категории
              event_group: 'event',
              event_category: 'subscribe',
              event_name: 'subscribe-button_click-podpisatsya',
              event_label: 'podpisatsya',
              event_action: 'button_click',
              event_context: 'kategoriya',
              channel_id: channelId,
              content_category_id: categoryId.toString(),
            });
          } else {
            sendYmMetric({ // метрика 2.7.15 Пользователь нажимает на кнопку Подписаться на странице канала.
              event_group: 'event',
              event_category: 'subscribe',
              event_name: 'subscribe-button_click-podpisatsya',
              event_label: 'podpisatsya',
              event_action: 'button_click',
              event_context: 'kanal',
              channel_id: channelId,
            });
          }
          await subscribe({ channelId }).unwrap();
          handleNotification(SubscribePropsType.subscribe);
          handleChangeSubCountState(!!isSubscribed);
          setIsSubscribed(true);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to subscribe:', error);
      }
    };

    const dataTestId = dti
      ? `${dti}-${isSubscribed ? 'unsubscribe' : 'subscribe'}-button_${channelId}`
      : `view-${isSubscribed ? 'unsubscribe' : 'subscribe'}-button_${channelId}`;

    return (
      <Button
        data-testid={dataTestId}
        className={className}
        variant={isSecondary ? 'secondary' : 'primary'}
        label={t(getSubButtonTitle())}
        onClick={handleSubscribe}
        disabled={isOwnChannel}
        loading={isLoading}
        size={size}
      />
    );
  },
);

SubscribeButton.displayName = 'SubscribeButton';
