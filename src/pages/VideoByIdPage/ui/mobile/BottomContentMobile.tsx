import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { Paper } from '@/shareds';
import { IVideo } from '@/redux/services/video/baseModel';
import { VideoRecommendationsList } from '@/widgets/VideoRecommendationsList';
import { VideoCommentsList } from './VideoCommentsList';
import { CommentsAndVideoQueueTab } from './CommentsAndVideoQueueTab';

interface IBottomContentMobile {
  videoData?: IVideo
  isLoading?: boolean
}

export const BottomContentMobile = (props: IBottomContentMobile) => {
  const {
    videoData, isLoading,
  } = props;

  const { videoQueue } = useSelector(selectors.videoQueueSelectors.videoQueueSelector);

  const isVideoQueueExists = videoQueue.length;
  const isCommentsEnabled = process.env.NEXT_PUBLIC_MODULE_COMMENTS_ENABLED === 'true';
  const isContentShown = isCommentsEnabled ? true : Boolean(isVideoQueueExists);

  return (
    <>
      {isContentShown && (
        <Paper className="px-4 py-4">
          {
            isVideoQueueExists
              ? <CommentsAndVideoQueueTab videoData={videoData} isLoading={isLoading} />
              : <VideoCommentsList videoData={videoData} isLoading={isLoading} />
          }
        </Paper>
      )}
      <div className="h-6 w-full rounded-t-xl bg-dynamic-secondary" />
      <VideoRecommendationsList
        cardVariant="vertical"
        // Лучше конечно создать отдельный вертикальный виртуальный список,
        // а не затирать грид флексом
        className="mb-6 p-6 rounded--b-xl bg-dynamic-secondary flex flex-col"
      />
    </>
  );
};
