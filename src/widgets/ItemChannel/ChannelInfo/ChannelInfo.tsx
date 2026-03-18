import React, {
  FC, memo, useCallback, useMemo, useState,
} from 'react';

import Link from 'next/link';

import { APP_PATHS_PAGES } from '@/shareds/constants/paths';

import imgProxy from '@/shareds/lib/utils/imgProxy';
import { ICategory, IChannel } from '@/redux/services/channels/responseModel';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { IVideoCardWithDetailsProps } from '@/entities/Video';
import {
  Avatar, Channel, Description, formatCount, PeopleIcon, Tag, textCutter,
} from 'rupor-ui-kit/dist';
import { SubscribeButton } from '@/features/SubscribeToChannel';
import { useFormatCountTranslations } from '@/shareds/hooks/useFormatCountTranslations';
import { useTranslation } from 'next-i18next';
import { useSendYmMetrics } from 'rupor-common';
import { ChannelVideos } from './ChannelVideos';

const channelUrl = APP_PATHS_PAGES.channels;

interface IChannelInfo extends IChannel {
  dti?: string;
  isLoading: boolean;
  index?: number;
  contentCategoryId?: string;
}

export const ChannelInfo: FC<IChannelInfo> = memo(({
  dti, isLoading, contentCategoryId, ...channel
}) => {
  const {
    logoUrl,
    id,
    title,
    description,
    subscribers,
    categories,
    index,
  } = channel;
  const { subsDeclensions } = useFormatCountTranslations();
  const { t } = useTranslation();
  const videoCards = useMemo(() => channel?.videos?.map((video, i) => ({
    videoId: video?.id,
    duration: video?.duration,
    ageRating: video?.ageRating,
    videoTitle: video?.title,
    viewsCount: video?.views?.count,
    thumbnailUrl: video?.thumbnail?.url,
    publishedAt: video?.publishedAt,
    channelId: channel?.id,
    saved: video?.playlists.saved,
    watchLater: video?.playlists.watchLater,
    index: i + 1,
    parentIndex: index,
  })) as IVideoCardWithDetailsProps[], [channel]);

  // Первое значение - кол-во сабов, второе - предыдущее состояние (sub = true, unsub = false)
  const [subCount, setSubCount] = useState<[number, boolean]>([subscribers || 0, channel.subscribed || false]);

  const categoryItem = useCallback(
    (category: ICategory) => (
      <Tag className="mr-1" key={category.id}>
        {t(category.title)}
      </Tag>
    ),
    [],
  );

  const { Element: Categories } = arrayRender({ items: categories, renderItem: categoryItem });

  const { sendYmMetric } = useSendYmMetrics();

  const handelOnChannelLogoClick = () => {
    sendYmMetric({ // метрика 2.7.17  Пользователь нажимает на аватар/название канала в Раздел Каналы
      event_group: 'event',
      event_category: 'content',
      event_label: 'kanal',
      event_name: 'content-element_click-kanal',
      event_action: 'element_click',
      // @ts-ignore
      event_context: contentCategoryId != undefined ? 'kategoriya' : undefined, // 2.7.17 для раздела каналы не передается
      channel_id: id,
      // content_in_list_position: index != undefined ? index.toString() : 'na',
      content_category_id: contentCategoryId != undefined ? contentCategoryId : 'na',
    });
  };

  return (
    <>
      <Channel.Wrapper className="!h-auto min-h-[274px]">
        <Channel.LeftContainer>
          <Channel.Info>
            <Link href={`${channelUrl}/${id}`} passHref onClick={handelOnChannelLogoClick}>
              <Avatar
                size={64}
                src={imgProxy({ imgUrl: logoUrl })}
                mountain
                dti={`channel-avatar_${id}`}
              />
            </Link>
            <div className="pt-2 mb-6 ml-6">
              <Link href={`${channelUrl}/${id}`} passHref onClick={handelOnChannelLogoClick}>
                <Channel.Title
                  title={title}
                  data-testid={`${dti ? `${dti}-` : ''}channel-info-title_${id}`}
                  className="cursor-pointer"
                >
                  {textCutter(title || '', 35)}
                </Channel.Title>
              </Link>
              <Channel.SubTitle data-testid={`${dti ? `${dti}-` : ''}channel-info-subscribers_${id}`}>
                <PeopleIcon width={15} className="mr-1 mt-1 w-[16px] h-[16px]" />
                {formatCount(subCount[0] as number, subsDeclensions)}
              </Channel.SubTitle>
              <SubscribeButton
                dti={`${dti ? `${dti}-` : ''}channel-info-subscribe-button_${id}`}
                size="extra small"
                className="mt-4"
                channelId={channel.id}
                logoUrl={channel.logoUrl}
                ownerId={channel.ownerId}
                subscribed={channel.subscribed}
                title={channel.title}
                setSubCount={setSubCount}
                categoryId={contentCategoryId != undefined ? +contentCategoryId : undefined}
              />
            </div>
          </Channel.Info>
          <Description
            dti={`channel-info-description_${id}`}
            stringCount={3}
            className="whitespace-pre-line"
          >
            {description}
          </Description>

        </Channel.LeftContainer>
        <ChannelVideos
          channelId={id as string}
          isLoading={isLoading}
          videos={videoCards}
          dti={`${dti}-channel`}
        />

      </Channel.Wrapper>
      {!!categories?.length && (
        <div className="mt-0.5 pb-6 pl-6">
          <Categories />
        </div>
      )}
    </>
  );
});

ChannelInfo.displayName = 'ChannelInfo';
