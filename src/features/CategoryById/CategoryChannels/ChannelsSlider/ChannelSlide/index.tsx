import React, { FC, memo, useState } from 'react';

import Link from 'next/link';

import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import imgProxy from '@/shareds/lib/utils/imgProxy';
import { IChannel } from '@/redux/services/channels/responseModel';
import { Avatar, ChannelCard, formatCount } from 'rupor-ui-kit/dist';
import { SubscribeButton } from '@/features/SubscribeToChannel';
import { useFormatCountTranslations } from '@/shareds/hooks/useFormatCountTranslations';
import { useSendYmMetrics } from 'rupor-common';

interface IChannelSlide {
  channel: IChannel;
  categoryId: number;
  dti?: string;
  index?: number;
}

const { channels: channelsPath } = APP_PATHS_PAGES;

export const ChannelSlide: FC<IChannelSlide> = memo(({ channel, dti, categoryId, index}) => {
  const {
    logoUrl, id, title, subscribers = 0
  } = channel;
  const channelPath = `${channelsPath}/${id}`;
  const { subsDeclensions } = useFormatCountTranslations();
  // Первое значение - кол-во сабов, второе - предыдущее состояние (sub = true, unsub = false)
  const [subCount, setSubCount] = useState<[number, boolean]>([subscribers || 0, channel.subscribed || false]);

  const { sendYmMetric } = useSendYmMetrics();

  const handelOnChannelLogoClick = () => {
    sendYmMetric({ // метрика 2.7.12 Пользователь на экране конкретной категории нажимает на карточку канала 
      // Экран конкретной категории → полка Каналы
      // Конкретная категория в поиске каналов в подписках (если пользователь не подписан еще ни на один канал)
      event_group: 'event',
      event_category: 'content',
      event_label: 'kanal',
      event_name: 'content-element_click-kanal',
      event_action: 'element_click',
      event_context: 'polka', 
      // в 2.7.12 событии нужно отпарвлять событие с экрана категории 
      // если в полке Каналы пользователь нажимает на какой-то из предложенных. Тут в "content_list_position": будет 1 всегда
      channel_id: id,
      content_list_position: '1', // порядковый номер канала/категории/плейлиста в списке
      content_in_list_position: index != undefined ? index.toString() : 'na', // порядковый номер канала/категории/плейлиста в списке
      content_category_id: categoryId.toString(),
      content_list_id: categoryId.toString(),
    });
  };
  return (
    <ChannelCard.Wrapper data-testid={`${dti}-channel-card-wrapper_${categoryId}`}>
      <Link href={channelPath} passHref onClick={handelOnChannelLogoClick}>
        <Avatar src={imgProxy({ imgUrl: logoUrl })} size={48} />
      </Link>
      <ChannelCard.WrapperText>
        <Link href={channelPath} passHref onClick={handelOnChannelLogoClick}>
          <ChannelCard.Title data-testid={`${dti}-channel-card-title_${categoryId}`}>
            {title}
          </ChannelCard.Title>
        </Link>
        <ChannelCard.SubTitle data-testid={`${dti}-channel-card-subtitle_${categoryId}`}>
          {formatCount(subCount[0] as number, subsDeclensions)}
        </ChannelCard.SubTitle>
      </ChannelCard.WrapperText>
      <SubscribeButton
        size="extra small"
        dti={`${dti}-channel-subscribe-button_${categoryId}`}
        channelId={channel.id}
        logoUrl={channel.logoUrl}
        ownerId={channel.ownerId}
        subscribed={channel.subscribed}
        title={channel.title}
        setSubCount={setSubCount}
        categoryId={categoryId}
      />
    </ChannelCard.Wrapper>
  );
});

ChannelSlide.displayName = 'ChannelSlide';
