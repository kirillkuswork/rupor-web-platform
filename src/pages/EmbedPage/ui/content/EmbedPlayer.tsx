import { useFetchVideoData, VideoPlayer } from '@/features/VideoPlayer';
import { useRouter } from 'next/router';
import { TAutoplayValues } from '@/entities/Video';

interface IEmbedPageRouter {
  id?: string;
  start?: string
  autoplay?: TAutoplayValues
}

export const EmbedPlayer = () => {
  const router = useRouter();
  const { id, start, autoplay } = router.query as IEmbedPageRouter;

  const { videoData, isLoading } = useFetchVideoData({ videoId: id });

  return (
    <VideoPlayer videoData={videoData} isLoading={isLoading} startTime={start} autoplay={autoplay} />
  );
};
