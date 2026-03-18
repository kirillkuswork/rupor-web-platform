import {
  FC, useCallback, useMemo, useState,
} from 'react';

import Link from 'next/link';

import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import imgProxy from '@/shareds/lib/utils/imgProxy';
import { ICategory, IChannel } from '@/redux/services/channels/responseModel';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';

import { IVideoCardWithDetailsProps } from '@/entities/Video';
import {
  Avatar,
  Channel,
  Description,
  formatCount,
  MobileChannel,
  PeopleIcon,
  Tag,
  textCutter,
} from 'rupor-ui-kit/dist';
import { SubscribeButton } from '@/features/SubscribeToChannel';
import { useFormatCountTranslations } from '@/shareds/hooks/useFormatCountTranslations';
import { useTranslation } from 'next-i18next';
import { useSendYmMetrics } from 'rupor-common';
import { ChannelVideos } from './ChannelVideos';

const channelUrl = APP_PATHS_PAGES.channels;

interface IMobileChannelInfo extends IChannel {
  isLoading: boolean;
  index?: number;
  contentCategoryId?: string;
}

export const MobileChannelInfo: FC<IMobileChannelInfo> = ({ isLoading, contentCategoryId, ...channel }) => {
  const {
    logoUrl,
    title,
    id,
    description,
    subscribers,
    categories,
    index,
  } = channel;
  const { t } = useTranslation();
  const { subsDeclensions } = useFormatCountTranslations();
  const videoCards = useMemo(() => channel?.videos?.map((video, i) => ({
    videoId: video?.id,
    duration: video?.duration,
    ageRating: video?.ageRating,
    videoTitle: video?.title,
    viewsCount: video?.views?.count,
    thumbnailUrl: video?.thumbnail?.url,
    publishedAt: video?.publishedAt,
    channelId: video?.id,
    index: i+1,
    parentIndex: index,
  })) as IVideoCardWithDetailsProps[], [channel]);

  const categoryItem = useCallback(
    (category: ICategory) => (
      <Tag className="mr-1" key={category.id}>
        {t(category.title)}
      </Tag>
    ),
    [],
  );

  const { sendYmMetric } = useSendYmMetrics();

  const handelOnChannelLogoClick = () => {
    sendYmMetric({ // метрика 2.7.17  Клик по логотипу/названию канала на странице категории или в поиске по каналам в разделе категории, если пользователь еще не подписан ни на один канал
      event_group: 'event',
      event_category: 'content',
      event_label: 'kanal',
      event_name: 'content-element_click-kanal',
      event_action: 'element_click',
      event_context: contentCategoryId != undefined ? 'kategoriya' : undefined, // 2.7.17 для раздела каналы не передается
      // срабатывает в 2.7.17 событии, мы были на экране конкретной категории и нажали на саму полку каналы 
      // и вот уже в ней на какой-то конкретный канал нажимаем
      channel_id: id,
      // content_in_list_position: index != undefined ? index.toString() : 'na',
      content_category_id: contentCategoryId != undefined ? contentCategoryId : 'na',
    });
  };

  const { Element: Categories } = arrayRender({ items: categories, renderItem: categoryItem });

  // Решение взято из ChannelInfo.tsx
  // Первое значение - кол-во сабов, второе - предыдущее состояние (sub = true, unsub = false)
  const [subCount, setSubCount] = useState<[number, boolean]>([subscribers || 0, channel.subscribed || false]);

  return (
    <>
      <MobileChannel.InfoWrapper className="items-center pr-4 !mb-0">
        <Link href={`${channelUrl}/${id}`} passHref onClick={handelOnChannelLogoClick}>
          <div className="flex">
            <Avatar
              size={40}
              src={imgProxy({ imgUrl: logoUrl })}
              className="mr-3"
            />
            <div>
              <MobileChannel.Title title={title} className="cursor-pointer">
                {textCutter(title || '', 15)}
              </MobileChannel.Title>
              <Channel.SubTitle>
                <PeopleIcon width={15} className="mr-1" />
                {formatCount(subCount[0] as number, subsDeclensions)}
              </Channel.SubTitle>
            </div>
          </div>
        </Link>
        <SubscribeButton
          channelId={channel.id}
          ownerId={channel.ownerId}
          subscribed={channel.subscribed}
          title={channel.title}
          logoUrl={channel.logoUrl}
          size="extra small"
          setSubCount={setSubCount}
          categoryId={contentCategoryId != undefined ? +contentCategoryId : undefined }
        />
      </MobileChannel.InfoWrapper>
      {Boolean(description) && (
        <Description stringCount={3} className="pr-4 whitespace-pre-line mt-4">
          {description}
        </Description>
      )}
      {Boolean(categories?.length) && (
        <div className="mt-4">
          <Categories />
        </div>
      )}
      <ChannelVideos
        channelId={id || ''}
        videos={videoCards}
        isLoading={isLoading}
      />
    </>
  );
};

MobileChannelInfo.displayName = 'MobileChannelInfo';
