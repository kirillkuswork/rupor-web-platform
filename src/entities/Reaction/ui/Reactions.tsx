/* eslint-disable import/no-cycle */
import { DislikedIcon, formatCount, LikedIcon } from 'rupor-ui-kit';
import { IIconsProps } from 'rupor-ui-kit/dist/types/interfaces';
import { FC, useEffect, useState } from 'react';
import { typedObjectEntries } from '@/shareds/lib/utils/typedObjectEntries';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import {
  dtiEmotion, dtiEmotionCount,
  IReactions,
  TEmotionIds,
} from '@/redux/services/common/reactions/reactionResponse';
import { HFlex, HFlexProps } from '@/shareds/ui/Flex';
import { IReactionProps, Reaction } from './Reaction';

interface IReactionsProps {
  reactions?: IReactions;
  flexClassNames?: Omit<HFlexProps, 'children'>;
  itemClassName?: string;
  onClickReaction?: (emotionId: TEmotionIds) => void;
  dti?: string;
}

type TUserVideoReaction = TEmotionIds | undefined | null;

const reactionsList: Record<TEmotionIds, FC<IIconsProps>> = {
  1: LikedIcon,
  2: DislikedIcon,
};

export const Reactions = (props: IReactionsProps) => {
  const {
    reactions,
    flexClassNames,
    itemClassName,
    onClickReaction,
    dti = '',
  } = props;

  const [userVideoReaction, setUserVideoReaction] = useState<TUserVideoReaction>();
  const [videoLikesCount, setVideoLikesCount] = useState<number>(0);
  const [videoDislikesCount, setVideoDislikesCount] = useState<number>(0);

  const reactionsCalculate = (emotionId: '1' | '2' | null) => {
    if (!emotionId) return;
    // Если реакции юзера не было до нажатия на лайк,
    // то записываем id реакции юзера и прибавляем 1 к соответствующей
    if (!userVideoReaction) {
      setUserVideoReaction(emotionId);
      if (emotionId === '1') setVideoLikesCount((prev) => prev + 1);
      if (emotionId === '2') setVideoDislikesCount((prev) => prev + 1);
      return;
    }
    // Если кликаем по уже активной реакции,
    // то обнуляем id реакции и убавляем 1 у соответствующей
    if (userVideoReaction === emotionId) {
      setUserVideoReaction(null);
      if (emotionId === '1' && videoLikesCount) setVideoLikesCount((prev) => prev - 1);
      if (emotionId === '2' && videoDislikesCount) setVideoDislikesCount((prev) => prev - 1);
      return;
    }
    // Если реакция уже стоит и мы меняем на другую,
    // то записываем id реакции в стейт, прибавляем и убавляем 1 у нужных реакций
    if (userVideoReaction !== emotionId) {
      setUserVideoReaction(emotionId);
      if (emotionId === '1') {
        setVideoLikesCount((prev) => prev + 1);
        if (videoDislikesCount) setVideoDislikesCount((prev) => prev - 1);
      }
      if (emotionId === '2') {
        setVideoDislikesCount((prev) => prev + 1);
        if (videoLikesCount) setVideoLikesCount((prev) => prev - 1);
      }
    }
  };

  const mapEmotionsToProps = typedObjectEntries(reactionsList).map(
    ([key, value]): IReactionProps => {
      const emotionsCount = key === '1' ? videoLikesCount : videoDislikesCount;

      const hasUserEmotion = userVideoReaction === key;
      const Icon = value;

      const onClickReactionHandler = () => {
        reactionsCalculate(key);
        onClickReaction?.(key);
      };

      const iconDataTestId = dti ? `${dti}_${dtiEmotion[key]}` : dtiEmotion[key];
      const countDtaTestId = dti ? `${dti}_${dtiEmotionCount[key]}` : dtiEmotionCount[key];

      return {
        icon: <Icon data-testid={iconDataTestId} className={hasUserEmotion ? itemClassName : ''} isFilled={hasUserEmotion} />,
        isFilled: hasUserEmotion,
        title: formatCount(emotionsCount),
        onClick: onClickReactionHandler,
        dti: countDtaTestId,
      };
    },
  );

  const { elementsArray } = arrayRender({
    items: mapEmotionsToProps,
    renderItem: Reaction,
  });

  useEffect(() => {
    setUserVideoReaction(reactions?.userReaction?.emotionId ? String(reactions?.userReaction?.emotionId) as TUserVideoReaction : null);
    setVideoLikesCount(Number(reactions?.all?.filter((item) => String(item.emotionId) === '1')[0]?.count) || 0);
    setVideoDislikesCount(Number(reactions?.all?.filter((item) => String(item.emotionId) === '2')[0]?.count) || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HFlex maxWidth={false} maxHeight={false} gap="24" {...flexClassNames}>
      {elementsArray}
    </HFlex>
  );
};
