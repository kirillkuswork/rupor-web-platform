import { useEffect, useState } from 'react';
import { useLazyGetHistoryVideosQuery } from '@/redux/services/playlist';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { getHistoryVideosSelectors } from '@/redux/selectors/getHistoryVideosSelectors';

interface IProps {
  limit?: number;
}

export const useGetHistoryVideos = ({ limit = 0 }: IProps) => {
  const { isAuth } = useSelector(selectors.userSelector);
  const { isHistoryDeleted } = useSelector(selectors.playlistSelector);

  const [cursor, setCursor] = useState<string | null>(null);
  const [total, setTotal] = useState<string | null>(null);

  const isLastPage = !cursor?.length;

  const videos = useSelector(getHistoryVideosSelectors.getHistoryVideosSelector);

  const { isError, isSuccess, isLoading } = useSelector(getHistoryVideosSelectors.getFetchParams);

  const [getVideos] = useLazyGetHistoryVideosQuery();

  const loadInitialVideos = async () => {
    const res = await getVideos({ limit });
    setCursor(res?.data?.pagination?.cursor || null);
    setTotal(res?.data?.totalCount || null);
  };

  // Загрузка новых видео в конце страницы
  const onEndReached = async () => {
    if (!cursor || isLoading) return;
    const res = await getVideos({ limit, cursor });
    setCursor(res?.data?.pagination?.cursor || null);
  };

  // Начальная загрузка списка видео
  useEffect(() => {
    if (isAuth) loadInitialVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  // Рефетч на удаление истории
  useEffect(() => {
    if (isHistoryDeleted) loadInitialVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHistoryDeleted]);

  return {
    videos,
    isFetching: isLoading,
    isError,
    onEndReached,
    refetch: loadInitialVideos,
    total,
    isLastPage,
    isSuccess,
  };
};
