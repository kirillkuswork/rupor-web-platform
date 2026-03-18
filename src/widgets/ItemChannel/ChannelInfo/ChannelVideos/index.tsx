import React, { FC, memo } from 'react';

import useIsMobile from '@/shareds/hooks/useIsMobile';
import { IChannel } from '@/redux/services/channels/responseModel';

import { EmptyContainer } from '@/shareds';
import { IVideoCardWithDetailsProps } from '@/entities/Video';
import { ChannelVideoList } from './ChannelVideoList';
import { MobileSlider } from './MobileSlider';

interface IChannelVideos {
  channelId: IChannel['id'];
  dti?: string;
  videos: IVideoCardWithDetailsProps[];
  isLoading: boolean;
}

export const ChannelVideos: FC<IChannelVideos> = memo(({
  channelId,
  dti,
  videos: VV,
  isLoading,
}) => {
  const isError = false;
  const refetch = () => {};
  const videos = VV ?? [];
  const { isMobile } = useIsMobile();

  const videoList = isMobile ? (
    <MobileSlider videos={videos} isLoading={isLoading} />
  ) : (
    <ChannelVideoList videos={videos} channelId={channelId!} dti={dti} />
  );

  if (isLoading || videos.length) {
    return videoList;
  }

  if (!isMobile || isError) {
    return (
      <EmptyContainer
        id={channelId}
        dti={`${dti}-empty-container`}
        isPage={false}
        text={isError ? 'Channel_Videos_Empty_Container_Error' : 'Channel_Videos_Empty_Container_No_Video'}
        subtitleText={
          isError
            ? 'Channel_Videos_Empty_Container_Get_Video_Error'
            : 'Channel_Videos_Empty_Container_No_Uploaded_Video'
        }
        errorHandler={{
          refetch,
          isError,
        }}
      />
    );
  }

  return null;
});

ChannelVideos.displayName = 'ChannelVideos';
