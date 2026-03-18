import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { IVideo } from '@/redux/services/video/baseModel';
import { useLazyGetVideoListSearchQuery } from '@/redux/services/video';

export const useGetVideoResults = () => {
  const router = useRouter();
  const queryText = useMemo(() => router.query.query as string, [router.query]);

  // Состояние для хранения курсора
  const [cursor, setCursor] = useState<string | null>(null);

  // Состояние для хранения списка видео
  const [videos, setVideos] = useState<IVideo[]>([]);

  const isLastPage = !cursor?.length;

  const requestPayload = useMemo(() => ({
    query: queryText,
    limit: 20,
    cursor,
  }), [cursor, queryText]);

  const [getVideos, { isFetching, isError, isSuccess }] = useLazyGetVideoListSearchQuery();

  const loadInitialVideos = async () => {
    if (!isFetching) {
      const res = await getVideos({
        query: queryText,
        limit: 20,
      });
      setVideos(res?.data?.videos || []);
      setCursor(res?.data?.pagination?.cursor || null);
    }
  };

  // Загрузка новых видео в конце страницы
  const onEndReached = async () => {
    if (!cursor || isFetching) return;
    const res = await getVideos(requestPayload);
    setVideos((prevState) => [...prevState, ...(res?.data?.videos || [])]);
    setCursor(res?.data?.pagination?.cursor || null);
  };

  // Начальная загрузка списка видео и по смене queryText
  useEffect(() => {
    loadInitialVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryText]);

  return {
    videos,
    isLoading: isFetching,
    isError,
    onEndReached,
    refetch: loadInitialVideos,
    isLastPage,
    isReady: isError || isSuccess,
  };
};
