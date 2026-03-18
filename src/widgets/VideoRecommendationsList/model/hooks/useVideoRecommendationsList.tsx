import { useEffect, useState } from 'react';
import { mapVideoProps } from '@/entities/Video';
import { useLazyGetVideoListQuery } from '@/redux/services/video';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { recommendationListActions } from '@/redux/slices/recommendationListSlice';
import useIsMobile from '@/shareds/hooks/useIsMobile';

interface IUseVideoRecommendationsList {
  limit?: number
  categoryId?: number
}

export const useVideoRecommendationsList = (props: IUseVideoRecommendationsList) => {
  const { limit = 20, categoryId } = props;

  const { isMobileInitialized } = useIsMobile();

  const { isAuth } = useSelector(selectors.userSelector);
  const [cursor, setCursor] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);
  const { recommendationListVideos } = useSelector(selectors.recommendationListSelectors);
  const { setRecommendationList } = useActions(recommendationListActions);

  const [isLastPage, setIsLastPage] = useState(false);

  const [getVideos, {
    isFetching, isError,
  }] = useLazyGetVideoListQuery();

  const isLoading = isFetching || !isInitialized || !isMobileInitialized;

  const initialLoading = async () => {
    const res = await getVideos({ limit, categoryId });
    setIsInitialized(true);
    const videoList = res.data?.videos ?? [];
    const paginationCursor = res.data?.pagination?.cursor ?? '';

    const transformedVideos = mapVideoProps(videoList);

    setRecommendationList(transformedVideos);
    setIsLastPage(!paginationCursor.length);
    setCursor(paginationCursor);
  };

  const fetchVideoList = async () => {
    const res = await getVideos({ limit, cursor, categoryId });
    setIsInitialized(true);
    const videoList = res.data?.videos ?? [];
    const paginationCursor = res.data?.pagination?.cursor ?? '';

    const transformedVideos = mapVideoProps(videoList);

    setRecommendationList([...recommendationListVideos, ...transformedVideos]);
    setIsLastPage(!paginationCursor.length);
    setCursor(paginationCursor);
  };

  const onEndReached = async () => {
    if (isLastPage) return;
    await fetchVideoList();
  };

  useEffect(() => {
    if (isMobileInitialized) initialLoading();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, isMobileInitialized]);

  useEffect(() => () => {
    // чистим стейт, чтобы при следующем маунте рендерились актуальные данные
    setRecommendationList([]);
  }, [setRecommendationList]);

  return {
    videos: recommendationListVideos,
    isFetching: isLoading,
    isError,
    onEndReached,
    isLastPage,
    fetchVideoList: initialLoading,
  };
};
