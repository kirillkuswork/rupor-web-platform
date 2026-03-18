import React, { FC, memo, ReactElement } from 'react';

import useIsMobile from '@/shareds/hooks/useIsMobile';
import { IChannel } from '@/redux/services/channels/responseModel';
import { Paper } from '@/shareds';
import { MobileChannelInfo } from '@/widgets/ItemChannel/ChannelInfo/MobileChannelInfo';
import { ChannelInfo } from './ChannelInfo/ChannelInfo';

interface IChannelWrapper {
  dti?: string;
  channelId?: string;
  children?: ReactElement;
}

interface IItemChannel extends IChannel {
  dti?: string;
  isLoading:boolean
  contentCategoryId?: string
}

const ChannelWrapper = ({ children, dti, channelId }: IChannelWrapper) => {
  const { isMobile } = useIsMobile();

  return isMobile ? (
    <Paper className="py-4 pr-0 pl-4 mb-4">
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <>{children}</>
    </Paper>
  ) : (
    <Paper data-testid={`${dti}-wrapper_${channelId}`} className="!p-0">
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      <>{children}</>
    </Paper>
  );
};

export const ItemChannel: FC<IItemChannel> = memo(({ dti, isLoading, contentCategoryId, ...channel }) => {
  const { isMobile } = useIsMobile();
  return (
    <ChannelWrapper dti={dti} channelId={channel.id}>
      {isMobile
        ? <MobileChannelInfo isLoading={isLoading} contentCategoryId={contentCategoryId} {...channel} />
        : (
          <ChannelInfo
            dti={dti}
            isLoading={isLoading}
            contentCategoryId={contentCategoryId}
            {...channel}
          />
        )}
    </ChannelWrapper>
  );
});

ItemChannel.displayName = 'ItemChannel';
