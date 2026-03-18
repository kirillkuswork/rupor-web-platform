import { EmotionName, emotionTitle, IReactions, TEmotionIds } from '@/redux/services/common/reactions/reactionResponse';
import { Reactions } from '@/entities/Reaction';
import { usePostCommentReactionMutation } from '@/redux/services/comments';
import { useCallback } from 'react';
import { useAuthWarning } from '@/shareds/hooks/useAuthWarning';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useTranslation } from 'next-i18next';

interface ICommentReaction {
  reactions?: IReactions
  commentId: string
  dti?: string
}

export const AddReactionToComment = (props: ICommentReaction) => {
  const { reactions, commentId, dti } = props;
  const { t } = useTranslation();
  const [postReaction] = usePostCommentReactionMutation();

  const { openAuthWarning } = useAuthWarning();

  const { isAuth } = useSelector(selectors.userSelector);

  const handlePostReaction = useCallback(
    (emotionId: TEmotionIds) => {
      if (!isAuth) {
        openAuthWarning(
          `${t('Add_Reaction_To_Comment_Auth_Warning')} ${t(EmotionName[emotionId])}`,
          `not-auth-${emotionTitle[emotionId]}`,
        );

        return;
      }
      postReaction({ commentId, emotionId });
    },
    [postReaction],
  );

  return (
    <Reactions
      dti={dti}
      reactions={reactions}
      itemClassName="w-4 h-4"
      flexClassNames={{ gap: '16' }}
      onClickReaction={handlePostReaction}
    />
  );
};
