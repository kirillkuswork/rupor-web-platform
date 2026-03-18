import { VideoSharedVideoStatus } from '@/shareds/constants/videoStatus';
import { FC, PropsWithChildren } from 'react';
import { IVideo } from '@/redux/services/video/baseModel';
import { VideoDeleted } from './variants/VideoDeleted';
import { VideoNotExist } from './variants/VideoNotExist';
import { VideoBlocked } from './variants/VideoBlocked';

interface IModerationStatusWrapper {
  videoData?: IVideo
}

export const ModerationStatusWrapper: FC<PropsWithChildren<IModerationStatusWrapper>> = (props) => {
  const {
    videoData, children,
  } = props;

  switch (videoData?.status) {
    case VideoSharedVideoStatus.Deleted:
      return (
        <VideoDeleted />
      );
    case VideoSharedVideoStatus.Blocked:
      return (
        <VideoBlocked />
      );
    case VideoSharedVideoStatus.Delayed:
    case VideoSharedVideoStatus.Moderation:
    case VideoSharedVideoStatus.Draft:
      return (
        <VideoNotExist />
      );
    default:
      return children;
  }
};
