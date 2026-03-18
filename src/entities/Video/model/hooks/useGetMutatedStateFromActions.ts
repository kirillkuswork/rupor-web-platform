import { useMemo, useState } from 'react';
import { IVideoCardWithDetailsProps } from '../types/videoCardWithDetailsProps';

export const useGetMutatedStateFromActions = ({ getVideoActions, ...otherState }: IVideoCardWithDetailsProps) => {
  const [videoState, setVideoState] = useState<IVideoCardWithDetailsProps>(otherState);

  const changeStateHandler = (newState: Partial<IVideoCardWithDetailsProps>) => {
    setVideoState((prevState) => ({ ...prevState, ...newState }));
  };

  const videoActions = getVideoActions?.({ videoData: videoState, changeState: changeStateHandler });

  return useMemo(() => ({ videoState, videoActions }), [videoState, videoActions]);
};
