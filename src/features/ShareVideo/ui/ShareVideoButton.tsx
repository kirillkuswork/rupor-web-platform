import React from 'react';
import { Button, ShareIcon } from 'rupor-ui-kit';
import { useShareVideoModal } from '@/modals/ShareVideoModal';
import { IVideoCardWithDetailsProps } from '@/entities/Video';

interface IShareVideoProps {
  videoData: IVideoCardWithDetailsProps
  iconClassName?: string
}

export const ShareVideoButton = ({ videoData, iconClassName }: IShareVideoProps) => {
  const { openModal, setModalState } = useShareVideoModal();

  const onClickHandler = () => {
    setModalState({ videoData });
    openModal();
  };

  return (
    <Button
      data-testid={`video-info-additional-icon-2_${videoData.videoId}`}
      variant="quaternary"
      className="!px-0 !h-8 !w-8"
      onClick={onClickHandler}
    >
      <ShareIcon className={iconClassName} />
    </Button>
  );
};
