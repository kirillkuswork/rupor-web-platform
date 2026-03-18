import { IReaction, IReactions, TEmotionIds } from '@/redux/services/common/reactions/reactionResponse';

export const addCommentsLikes = (
  reactions: IReactions,
  emotionId: TEmotionIds,
  userReaction?: TEmotionIds,
): IReaction[] => {
  const isAddedLikeExists = reactions?.all?.find(
    (reaction) => String(reaction.emotionId) === emotionId,
  );

  if (isAddedLikeExists) {
    return reactions.all?.map((reaction) => {
      if (String(reaction.emotionId) === emotionId) {
        return {
          ...reaction,
          count:
            String(userReaction) === emotionId
              ? (reaction.count as number) - 1
              : (reaction.count as number) + 1,
        };
      }

      return {
        ...reaction,
        count:
          String(userReaction) === emotionId
            ? (reaction.count as number) - 1
            : (reaction.count as number) + 1,
      };
    }) as IReaction[];
  }

  return [
    {
      emotionId,
      count: 1,
    },
  ];
};
