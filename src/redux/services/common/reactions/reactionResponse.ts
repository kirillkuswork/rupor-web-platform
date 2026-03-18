import { t } from 'i18next';

export type TEmotionIds = '1' | '2';

export const emotionTitle = {
  1: 'like',
  2: 'dislike',
};

export const dtiEmotion = {
  1: 'like-icon',
  2: 'dislike-icon',
};

export const dtiEmotionCount = {
  1: 'like-count',
  2: 'dislike-count',
};

export const EmotionName = {
  1: 'Const_Emotion_Name_Like',
  2: 'Const_Emotion_Name_Dislike',
};

export interface IReaction {
  emotionId: TEmotionIds;
  count?: number;
}

export interface IReactions {
  all?: IReaction[];
  userReaction?: IReaction | null;
}

export type TReactionResponseCodes =
  | 'REACTION_UNDEFINED'
  | 'REACTION_UPDATED'
  | 'REACTION_DELETED'
  | 'REACTION_CREATED';
