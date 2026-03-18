import React from 'react';
import { BrightCLockIcon, Button, ClockIcon, DarkWatchIcon } from 'rupor-ui-kit';
import { IVideoCardWithDetailsProps } from '@/entities/Video';
import { useAddVideoToWatchLaterOption } from '@/features/AddVideoToPlaylist';

interface IAddVideoToSavedPlaylistProps {
  videoData: IVideoCardWithDetailsProps;
  dti?: string;
}

export const AddVideoToWatchLaterPlaylist = (
  props: IAddVideoToSavedPlaylistProps,
) => {
  const { videoData, dti = '' } = props;

  const { onClick } = useAddVideoToWatchLaterOption({ videoData });

  const dataTestId = dti
    ? `${dti}-video-info-additional-icon-4_${videoData.videoId}`
    : `video-info-additional-icon-4_${videoData.videoId}`;

  return (
    <Button
      data-testid={dataTestId}
      variant="quaternary"
      className="!px-0 !h-8 !w-8"
      onClick={onClick}
    >
      {videoData.watchLater ? (
        <DarkWatchIcon className="text-white w-8 h-8" />
      ) : (
        <ClockIcon />
      )}
    </Button>
  );
};
