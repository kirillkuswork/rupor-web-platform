import { useTranslation } from 'next-i18next';
import { ICommentSortData } from '@/widgets/VideoByIdComments';
import { BlockHeaderInner, formatCount, Skeleton } from 'rupor-ui-kit';
import { VideoCommentsListHeaderActions } from './VideoCommentsListHeaderActions';

interface IVideoCommentsListHeaderProps {
  commentsCount?: number
  isLoading?: boolean
  commentSort: ICommentSortData
  onChangeSort: (sort: ICommentSortData) => void
  isCommentsOpen?: boolean
  openCommentsHandler?: () => void
  closeCommentsHandler?: () => void
}

export const VideoCommentsListHeader = (props: IVideoCommentsListHeaderProps) => {
  const {
    commentsCount = 0,
    isLoading,
  } = props;

  const { t } = useTranslation();

  return (
    <BlockHeaderInner.Container className="px-6 sm:px-0" split>
      <BlockHeaderInner.TitleWrapper>
        <BlockHeaderInner.Title className="mr-3 text-paragraph-xl">
          {t('Common_comments')}
        </BlockHeaderInner.Title>
        <BlockHeaderInner.Subtitle className="!text-paragraph-m-s">
          {isLoading ? <Skeleton className="h-10 max-w-[550px] rounded" /> : formatCount(commentsCount)}
        </BlockHeaderInner.Subtitle>
      </BlockHeaderInner.TitleWrapper>
      <VideoCommentsListHeaderActions {...props} />
    </BlockHeaderInner.Container>
  );
};
