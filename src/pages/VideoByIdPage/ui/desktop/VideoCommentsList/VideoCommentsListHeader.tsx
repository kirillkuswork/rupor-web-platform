import { ICommentSortData } from '@/widgets/VideoByIdComments';
import { BlockHeaderInner, formatCount, Skeleton } from 'rupor-ui-kit';
import { CommentsSortButton } from '@/pages/VideoByIdPage/ui/common/CommentsSortButton';
import { useTranslation } from 'next-i18next';
import { IVideo } from '@/redux/services/video/baseModel';

interface IVideoCommentsListHeaderProps {
  commentsCount?: number;
  isLoading?: boolean;
  commentSort: ICommentSortData;
  onChangeSort: (sort: ICommentSortData) => void;
  videoData: IVideo;
}

export const VideoCommentsListHeader = (
  props: IVideoCommentsListHeaderProps,
) => {
  const {
    commentsCount = 0,
    isLoading,
    commentSort,
    onChangeSort,
    videoData,
  } = props;

  const { t } = useTranslation();

  return (
    <BlockHeaderInner.Container className="px-6 sm:px-0" split>
      <BlockHeaderInner.TitleWrapper>
        <BlockHeaderInner.Title
          data-testid={`video-comments-header-title_${videoData?.id}`}
          className="mr-3 text-paragraph-xl"
        >
          {t('Common_comments')}
        </BlockHeaderInner.Title>
        <BlockHeaderInner.Subtitle
          data-testid={`video-comments-header-count_${videoData?.id}`}
          className="!text-paragraph-m-s"
        >
          {isLoading ? (
            <Skeleton className="h-10 max-w-[550px] rounded" />
          ) : (
            formatCount(commentsCount)
          )}
        </BlockHeaderInner.Subtitle>
      </BlockHeaderInner.TitleWrapper>
      <CommentsSortButton
        commentSort={commentSort}
        onChangeSort={onChangeSort}
      />
    </BlockHeaderInner.Container>
  );
};
