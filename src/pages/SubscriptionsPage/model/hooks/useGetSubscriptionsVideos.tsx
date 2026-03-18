import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useLazyGetVideosSubscriptionsQuery } from '@/redux/services/subscriptions';
import { SortOrder } from '@/shareds/types/sortTypes';
import { IVideoCardWithDetailsProps, mapVideoProps } from '@/entities/Video';
import { Order } from '@/shareds/types/sortOrder';

export const useGetSubscriptionsVideos = () => {
  const { isAuth } = useSelector(selectors.userSelector);
  const [cursor, setCursor] = useState<string | null>(null);
  const [videos, setVideos] = useState<IVideoCardWithDetailsProps[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const limit = 100;

  const isLastPage = !cursor?.length;

  const [getVideosSubscriptions, { isFetching, isSuccess, isError }] = useLazyGetVideosSubscriptionsQuery();

  const loadInitialVideos = async () => {
    const res = await getVideosSubscriptions({ limit, sortPublishedAt: Order.SortOrderDesc as SortOrder });
    const transformedVideos = mapVideoProps(res.data?.videos || []);
    setVideos(transformedVideos || []);
    setCursor(res?.data?.pagination?.cursor || null);
    setTotal(res?.data?.total || null);
  };
  // TODO выставил лимит в 100, чтобы не использовать виртуозо, пока не решится вопрос с загрузкой данных для каждого блока
  const onEndReached = async () => {
    if (!cursor || isFetching) return;
    const res = await getVideosSubscriptions({ limit, sortPublishedAt: Order.SortOrderDesc as SortOrder, cursor });
    const transformedVideos = mapVideoProps(res.data?.videos || []);
    setVideos((prevState) => [...prevState, ...(transformedVideos || [])]);
    setCursor(res?.data?.pagination?.cursor || null);
  };

  useEffect(() => {
    if (isAuth) loadInitialVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return {
    videos,
    isFetching,
    isError,
    limit,
    total,
    refetch: loadInitialVideos,
    isLastPage,
    isSuccess,
  };
};
