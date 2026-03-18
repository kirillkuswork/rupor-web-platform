import {
  ICommentSortData,
  VideoByIdCommentsList,
} from '@/widgets/VideoByIdComments';
import { Paper } from '@/shareds';
import { IVideo } from '@/redux/services/video/baseModel';
import { AddCommentToVideo } from '@/features/AddCommentToVideo';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useLazyGetCommentsByVideoIdQuery } from '@/redux/services/comments';
import { VideoCommentsListHeader } from './VideoCommentsListHeader';

interface IVideoCommentsListProps {
  videoData?: IVideo;
  isLoading?: boolean;
}

export const VideoCommentsList = (props: IVideoCommentsListProps) => {
  const { videoData, isLoading } = props;

  const { total, sortDirection } = useSelector(selectors.commentsSelector);
  const isCommentsEnabled =
    process.env.NEXT_PUBLIC_MODULE_COMMENTS_ENABLED === 'true';

  const [fetchComments] = useLazyGetCommentsByVideoIdQuery();
  const handleChangeSortHandler = useCallback(
    ({ sortField, sortOrder }: ICommentSortData) => {
      fetchComments({ sortOrder, sortField, videoId: videoData?.id as string });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [videoData],
  );

  if (isLoading || !videoData || !isCommentsEnabled) return null;

  return (
    <Paper className="py-4 px-0">
      <VideoCommentsListHeader
        commentsCount={total}
        commentSort={sortDirection}
        onChangeSort={handleChangeSortHandler}
        videoData={videoData}
      />
      <AddCommentToVideo videoId={videoData.id} />
      <Paper className="px-6 pt-0">
        <VideoByIdCommentsList
          dti="video-comments-comment"
          videoId={videoData.id}
          isEnabled={videoData.comments?.enabled}
          sortData={sortDirection}
        />
      </Paper>
    </Paper>
  );
};
