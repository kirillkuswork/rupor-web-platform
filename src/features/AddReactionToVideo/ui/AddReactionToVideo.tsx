import {
  EmotionName, IReactions,
  TEmotionIds,
} from '@/redux/services/common/reactions/reactionResponse';
import { Reactions } from '@/entities/Reaction';
import { useLazyToggleVideoReactionQuery } from '@/redux/services/video';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useAuthWarning } from '@/shareds/hooks/useAuthWarning';
import { useTranslation } from 'next-i18next';

interface IAddReactionToVideoProps {
  reactions?: IReactions;
  videoId: string;
}

export const AddReactionToVideo = (props: IAddReactionToVideoProps) => {
  const { reactions, videoId } = props;
  const { t } = useTranslation();
  const [toggleVideoReaction] = useLazyToggleVideoReactionQuery();
  const { openAuthWarning } = useAuthWarning();

  const { isAuth } = useSelector(selectors.userSelector);

  const onClickReaction = (emotionId: TEmotionIds) => {
    if (!isAuth) {
      openAuthWarning(
        `${t('Add_Reaction_To_Video_Auth_Warning')} ${EmotionName[emotionId]}`,
        'not-auth-like',
      );

      return;
    }
    toggleVideoReaction({
      emotionId,
      videoId,
    });
  };

  return (
    <Reactions
      reactions={reactions}
      flexClassNames={{ gap: '24' }}
      itemClassName="w-7 h-7"
      onClickReaction={onClickReaction}
      dti="video-info"
    />
  );
};
