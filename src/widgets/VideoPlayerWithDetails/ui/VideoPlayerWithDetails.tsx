import { IVideo } from '@/redux/services/video/baseModel';
import { VideoPlayer } from '@/features/VideoPlayer';
import { VideoInfo } from './VideoInfo';

interface IVideoPlayerWithDetailsProps {
  isLoading?: boolean
  videoData?: IVideo
  startTime?: string
}

export const VideoPlayerWithDetails = (props: IVideoPlayerWithDetailsProps) => {
  const { isLoading, videoData, startTime } = props;

  return (
    <>
      <div className="mb-6 rounded-xl sm:mb-4 aspect-video overflow-hidden relative">
        <VideoPlayer videoData={videoData} isLoading={isLoading} startTime={startTime} />
      </div>
      <VideoInfo
        video={videoData}
        isLoading={isLoading}
      />
    </>
  );
};
