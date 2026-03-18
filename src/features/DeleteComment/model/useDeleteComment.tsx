import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { TrashIcon } from 'primereact/icons/trash';
import { useActions } from '@/shareds/hooks/useActions';
import { commentsActions } from '@/redux/actions/commentsActions';

export const useDeleteComment = (commentId: string, replyTo?: string) => {
  const { isAuth } = useSelector(selectors.userSelector);

  const { setDeletingComment } = useActions(commentsActions);

  const { t } = useTranslation();

  const label = t('Delete_Comment_Label_Delete');

  const addReportHandler = () => {
    if (!isAuth) return;
    setDeletingComment({ id: commentId, replyTo });
  };

  return {
    label,
    icon: <TrashIcon />,
    onClick: addReportHandler,
  };
};
