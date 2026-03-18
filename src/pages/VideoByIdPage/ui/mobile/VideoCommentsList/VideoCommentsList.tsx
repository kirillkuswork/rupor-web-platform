import {
  ICommentSortData,
  VideoByIdCommentsList,
} from '@/widgets/VideoByIdComments';
import { Paper } from '@/shareds';
import { IVideo } from '@/redux/services/video/baseModel';
import { AddCommentToVideo } from '@/features/AddCommentToVideo';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { Order, SortField } from '@/shareds/types/sortOrder';
import { VideoCommentsListHeader } from './VideoCommentsListHeader';

interface IVideoCommentsListProps {
  videoData?: IVideo;
  isLoading?: boolean;
}

export const VideoCommentsList = (props: IVideoCommentsListProps) => {
  const { videoData, isLoading } = props;

  const { total } = useSelector(selectors.commentsSelector);

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const isCommentsEnabled = process.env.NEXT_PUBLIC_MODULE_COMMENTS_ENABLED === 'true';

  const openCommentsHandler = () => {
    setIsCommentsOpen(true);
  };

  const closeCommentsHandler = () => {
    setIsCommentsOpen(false);
  };

  const [sortDirection, setSortDirection] = useState<ICommentSortData>({
    sortField: SortField.SortFieldCreatedAt,
    sortOrder: Order.SortOrderDesc,
  });

  if (isLoading || !videoData || !isCommentsEnabled) return null;

  return (
    <>
      <VideoCommentsListHeader
        commentsCount={total}
        commentSort={sortDirection}
        onChangeSort={setSortDirection}
        isCommentsOpen={isCommentsOpen}
        openCommentsHandler={openCommentsHandler}
        closeCommentsHandler={closeCommentsHandler}
      />
      <AddCommentToVideo videoId={videoData.id} />
      {isCommentsOpen && (
        <Paper className="px-0 py-0 mb-0">
          <VideoByIdCommentsList
            dti="video-comments-comment"
            videoId={videoData.id}
            isEnabled={videoData.comments?.enabled}
            sortData={sortDirection}
          />
        </Paper>
      )}
    </>
  );
};
