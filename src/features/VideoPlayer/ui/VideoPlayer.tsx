import { IVideo } from '@/redux/services/video/baseModel';
import { LEGAL_AGE } from '@/shareds/constants/restrictions';
import { useCallback, useEffect, useState } from 'react';
import { Skeleton } from 'rupor-ui-kit';
import { Paper } from '@/shareds';
import { localStorageHandler } from '@/shareds/lib/helpers/localStorageHandler';
import { TAutoplayValues } from '@/entities/Video';
import imgProxy from '@/shareds/lib/utils/imgProxy';
import { AgeRatingPlug } from './AgeRatingPlug';
import { PlayerComponent } from './PlayerComponent';

interface IVideoPlayerProps {
  videoData?: IVideo
  isLoading?: boolean
  startTime?: string
  autoplay?: TAutoplayValues
}

export const VideoPlayer = (props: IVideoPlayerProps) => {
  const {
    videoData,
    isLoading,
    startTime,
    autoplay,
  } = props;

  const [isShowAgeRatingPlug, setIsShowAgeRatingPlug] = useState(false);

  useEffect(() => {
    const params = localStorageHandler.getValueFromStorage({ key: 'platformParams' });

    if (videoData?.ageRating && !params?.isAdult) {
      setIsShowAgeRatingPlug(videoData?.ageRating === LEGAL_AGE);
    }
  }, [videoData?.ageRating]);

  const onAdultHandler = useCallback(() => {
    localStorageHandler.setValueToStorage({ key: 'platformParams', value: { isAdult: true } });
    setIsShowAgeRatingPlug(false);
  }, []);

  if (isShowAgeRatingPlug) {
    return <AgeRatingPlug onAdultHandler={onAdultHandler} thumbnailUrl={imgProxy({ imgUrl: videoData?.thumbnail?.url })} />;
  }

  if (isLoading || !videoData?.id) {
    return (
      <Paper>
        <Skeleton template="videoPlayerSkeleton" />
      </Paper>
    );
  }

  return (
    <PlayerComponent id={videoData.id} startTime={startTime} autoPlay={autoplay} />
  );
};
