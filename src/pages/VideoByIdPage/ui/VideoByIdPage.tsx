import { useRouter } from 'next/router';
import { useFetchVideoData } from '@/features/VideoPlayer';
import { useCallback, useEffect, useMemo } from 'react';
import { ConfirmationModal } from '@/modals';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { commentsActions } from '@/redux/actions/commentsActions';
import { useActions } from '@/shareds/hooks/useActions';
import { useDeleteCommentMutation } from '@/redux/services/comments';
import { VideoPlayerWithDetails } from '@/widgets/VideoPlayerWithDetails';
import { useTranslation } from 'next-i18next';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { scrollTo } from '@/shareds/lib/utils/scrollTo';
import { getStartTime } from '@/shareds/lib/utils/getPlayerStartTime';
import { VideoByIdPageLayout } from './layout/VideoByIdPageLayout';
import { VideoCommentsList } from './desktop/VideoCommentsList';
import { BottomContentMobile } from './mobile/BottomContentMobile';
import { RightContentDesktop } from './desktop/RightContentDesktop';
import { ErrorWrapper } from './plugs/ErrorWrapper';
import { ModerationStatusWrapper } from './plugs/ModerationStatusWrapper';

interface IVideoByIdPageRouter {
  id?: string;
  t?: string
}

const VideoByIdPage = () => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const { id: videoId, t: startTimeFromUrl } = router.query as IVideoByIdPageRouter;
  const { setDeletingComment } = useActions(commentsActions);

  const clearUrlTimeParam = () => {
    const { pathname, query } = router;
    if ('t' in query) {
      const { t, ...rest } = query;
      router.replace({ pathname, query: rest }, undefined, { shallow: true });
    }
  };

  const startTime = useMemo(
    () => getStartTime(videoId!, startTimeFromUrl),
    [videoId, startTimeFromUrl],
  );

  useEffect(() => {
    if (videoId && startTimeFromUrl) {
      clearUrlTimeParam();
    }
  }, [videoId, startTimeFromUrl, router]);

  const { deletedComment } = useSelector(selectors.commentsSelector);
  const closeDeleteModal = useCallback(() => {
    setDeletingComment({ id: null });
  }, []);

  useEffect(() => {
    scrollTo(0, true);
  }, [videoId]);

  const [deleteComment, { isLoading: isCommentsLoading }] = useDeleteCommentMutation();
  const confirmDeleteComment = useCallback(() => {
    deleteComment({ commentId: deletedComment.id as string });
  }, [deletedComment]);

  const {
    videoData, isLoading, error,
  } = useFetchVideoData({ videoId });

  const memoizedProps = useMemo(
    () => ({
      videoData,
      isLoading,
    }),
    [videoData, isLoading],
  );

  const { isMobile } = useIsMobile();

  const bottomContent = isMobile ? <BottomContentMobile {...memoizedProps} /> : <VideoCommentsList {...memoizedProps} />;

  const rightContent = isMobile ? <></> : <RightContentDesktop />;

  return (
    <>
      <ErrorWrapper errorData={error}>
        <ModerationStatusWrapper videoData={videoData}>
          <VideoByIdPageLayout
            player={<VideoPlayerWithDetails videoData={videoData} isLoading={isLoading} startTime={String(startTime)} />}
            bottomContent={bottomContent}
            rightContent={rightContent}
          />
        </ModerationStatusWrapper>
      </ErrorWrapper>
      <ConfirmationModal
        dti="comment-delete-modal"
        title={translate('Video_By_Id_Page_Confirmation_Modal_Title')}
        subTitle={translate('Video_By_Id_Page_Confirmation_Modal_Sub_Title')}
        isOpen={!!deletedComment.id}
        isLoading={isCommentsLoading}
        submitButtonLabel={translate('Video_By_Id_Page_Confirmation_Modal_Submit_Button_Label')}
        cancelButtonLabel={translate('Video_By_Id_Page_Confirmation_Modal_Cancel_Button_Label')}
        handleOnSubmit={confirmDeleteComment}
        handleOnCancel={closeDeleteModal}
        handleOnClose={closeDeleteModal}
        playlistId={deletedComment?.id as string}
      />
    </>
  );
};

export default VideoByIdPage;
