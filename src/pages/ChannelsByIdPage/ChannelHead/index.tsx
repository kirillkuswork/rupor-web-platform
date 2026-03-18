import {
  memo, useCallback, useEffect, useState,
} from 'react';

import clsx from 'clsx';
import {
  Avatar, ChannelHeader, Description, formatCount, Tag,
} from 'rupor-ui-kit';

import useIsMobile from '@/shareds/hooks/useIsMobile';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import imgProxy from '@/shareds/lib/utils/imgProxy';
import { IChannelResponse } from '@/redux/services/video/baseModel';
import { ICategory } from '@/redux/services/channels/responseModel';
import { SubscribeButton } from '@/features/SubscribeToChannel';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useFormatCountTranslations } from '@/shareds/hooks/useFormatCountTranslations';
import { useTranslation } from 'next-i18next';

export const ChannelHead = memo((channel: IChannelResponse) => {
  const { isMobile } = useIsMobile();
  const { subscribedChannel } = useSelector(selectors.playlistSelector);
  const [subscribersCount, setSubscribersCount] = useState(channel?.subscribersCount);
  const { subsDeclensions } = useFormatCountTranslations();
  const { t } = useTranslation();
  const TagItem = useCallback((category: ICategory) => (
    <Tag className="mr-1 md:!mb-1" key={category.id}>
      {t(category.title)}
    </Tag>
  ), []);

  const { Element: TagItemList } = arrayRender({
    items: channel.categories,
    renderItem: TagItem,
  });

  // Для изменений количества подписчиков после сайбскрайба/ансабскайба
  useEffect(() => {
    if (!subscribedChannel.subscribers) {
      setSubscribersCount(channel?.subscribersCount);
    }
    if (subscribedChannel.channelId === channel?.channelId) {
      setSubscribersCount(subscribedChannel?.subscribers || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribedChannel, channel?.subscribersCount]);

  return (
    <>
      {channel.bannerUrl && (
        <div
          style={{ backgroundImage: `url("${channel.bannerUrl}")` }}
          className="w-full bg-center bg-no-repeat bg-cover rounded-t h-[200px] md:!h-[128px]"
        />
      )}
      <ChannelHeader.Wrapper className="!py-10 md:!pt-6 md:!px-4">
        <ChannelHeader.Header className={clsx('relative', isMobile && 'flex-col items-center')}>
          <ChannelHeader.LeftBlock
            data-testid={`channel-page-header-left-block_${channel.channelId}`}
            className={clsx(
              isMobile && 'flex-col items-center',
              'items-center md:!mb-4.5',
            )}
          >
            <Avatar
              className="md:!w-[56px] md:!h-[56px]"
              variant="super ellipse"
              size={80}
              src={imgProxy({ imgUrl: channel?.logoUrl || '' })}
              mountain
            />
            <ChannelHeader.TitleWrapper className={clsx(isMobile && 'flex-col items-center text-center mt-2 md:!mt-0')}>
              <ChannelHeader.Title data-testid={`channel-page-header-title_${channel.channelId}`} className="font-bold">
                {channel.title}
              </ChannelHeader.Title>
              <ChannelHeader.Subtitle data-testid={`channel-page-header-subscribers_${channel.channelId}`}>
                {formatCount(subscribersCount || 0, subsDeclensions)}
              </ChannelHeader.Subtitle>
            </ChannelHeader.TitleWrapper>
          </ChannelHeader.LeftBlock>
          <div className="flex items-center ml-6 md:ml-0">
            <SubscribeButton
              dti={`channel-page-header-subscribe-button_${channel.channelId}`}
              size="small"
              channelId={channel.channelId ?? ''}
              logoUrl={channel.logoUrl ?? ''}
              ownerId={channel.ownerId ?? ''}
              subscribed={channel.subscribed ?? false}
              title={channel.title ?? ''}
            />
          </div>
        </ChannelHeader.Header>
        {channel.description && (
          <Description
            dti={`channel-page-header-description_${channel.channelId}`}
            className={clsx('whitespace-pre-line mt-5', isMobile ? 'w-full' : 'w-[800px]')}
            stringCount={3}
          >
            {channel.description}
          </Description>
        )}
        {!!channel.categories && (
          <div className="!mt-6 md:!mt-4.5">
            <TagItemList />
          </div>
        )}
      </ChannelHeader.Wrapper>
    </>
  );
});

ChannelHead.displayName = 'ChannelHead';
