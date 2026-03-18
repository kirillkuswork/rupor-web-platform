import { useEffect, useState } from 'react';
import { useLazyGetChannelsQuery } from '@/redux/services/channels';
import { IGetChannelsRequest } from '@/redux/services/channels/requestModel';
import { IChannel } from '@/redux/services/channels/responseModel';
import useIntersectionObserver from '@/shareds/hooks/useIntersectionObserver';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';

interface IProps {
  categoryId: number;
}

export const useGetChannelByCategoryPlaylists = ({
  categoryId,
}: IProps) => {
  const { isAuth } = useSelector(selectors.userSelector);
  const [cursor, setCursor] = useState<string | null>(null);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '400px',
    threshold: 0.1,
  });

  const isLastPage = !cursor?.length;

  const requestPayload = {
    category: categoryId,
    limit: 10,
    preloadVideos: 10,
    cursor,
  } as IGetChannelsRequest;

  const [getChannels, { isFetching, isError, isSuccess }] = useLazyGetChannelsQuery();

  // Начальная загрузка списка каналов и по сортировке
  const loadInitialChannels = async () => {
    const res = await getChannels(requestPayload);
    setChannels(res?.data?.channels || []);
    setCursor(res?.data?.pagination?.cursor || null);
  };

  // Загрузка новых каналов
  const onEndReached = async () => {
    if (!cursor || isFetching) return;
    const res = await getChannels(requestPayload);
    setChannels((prevState) => [...prevState, ...(res?.data?.channels || [])]);
    setCursor(res?.data?.pagination?.cursor || null);
  };

  useEffect(() => {
    if (isIntersecting) onEndReached();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  // Начальная загрузка списка видео
  useEffect(() => {
    loadInitialChannels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return {
    channels,
    isFetching,
    isError,
    isSuccess,
    refetch: loadInitialChannels,
    isLastPage,
    ref,
    isReady: isError || isSuccess,
  };
};
