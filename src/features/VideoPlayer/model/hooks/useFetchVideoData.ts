import { useLazyGetVideoByIdQuery } from '@/redux/services/video';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { IRequestErrors } from '@/shareds/types/requestError';

interface IUseFetchVideoDataProps {
  videoId?: string
  skip?: true
}

export const useFetchVideoData = (props: IUseFetchVideoDataProps) => {
  const { isAuth } = useSelector(selectors.userSelector);

  const { videoId } = props;
  // TODO:: Переписать на обычный rtk запрос, чтобы можно было селектить результат
  // в дочерних компонентах
  const [getVideoById, {
    isError, isFetching, error, data: videoData,
  }] = useLazyGetVideoByIdQuery();

  const getVideoDataById = async (id: string) => {
    await getVideoById({ videoId: id });
  };

  useEffect(() => {
    if (videoId) {
      getVideoDataById(videoId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, videoId]);

  // @ts-expect-error ...
  const errorData = error?.data as IRequestErrors;

  return {
    videoData: videoData?.video,
    isLoading: isFetching,
    isError,
    error: errorData,
  };
};
