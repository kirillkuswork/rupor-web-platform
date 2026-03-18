import { memo, RefObject, useCallback } from 'react';
import { IChannel } from '@/redux/services/channels/responseModel';
import { ItemChannel } from '@/widgets/ItemChannel';
import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { Paper } from '@/shareds/ui';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { EmptyPage } from './EmptyPage';

interface IChannelsFeed {
  channels: IChannel[];
  hasNextPage: boolean;
  isLoading: boolean;
  scrollElement?: RefObject<HTMLDivElement>;
  isReady?: boolean;
  dti?: string;
  contentCategoryId?: string
}

export const ChannelsFeed = memo(
  ({
    channels,
    hasNextPage,
    isLoading,
    scrollElement,
    dti,
    contentCategoryId,
    isReady = true,
  }: IChannelsFeed) => {
    const { isMobile } = useIsMobile();
    const isEmpty = !channels.length && !isLoading;

    const skeletons = renderSkeletons({
      dti,
      template: isMobile ? 'channelMobile' : 'channel',
      limit: 10,
      wrapper: Paper,
    });
    const isNextPageFetching = !!channels.length && hasNextPage && isLoading;

    const ChannelItem = useCallback(
      (channel: IChannel) => (
        <ItemChannel
          key={channel.id}
          dti={dti}
          isLoading={isLoading!}
          contentCategoryId={contentCategoryId}
          {...channel}
        />
        // eslint-disable-next-line react-hooks/exhaustive-deps
      ),
      [],
    );

    const { elementsArray: ChannelList } = arrayRender({
      items: channels,
      renderItem: ChannelItem,
    });

    if (!isReady) return skeletons;
    if (isEmpty) return <EmptyPage />;

    return (
      <>
        {ChannelList}
        <div className="h-[1px]" ref={scrollElement} />
        {isNextPageFetching && skeletons}
      </>
    );
  },
);

ChannelsFeed.displayName = 'ChannelsFeed';
