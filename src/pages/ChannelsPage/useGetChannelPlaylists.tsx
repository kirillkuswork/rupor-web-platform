import { useEffect, useState } from 'react';
import { useLazyGetChannelsQuery } from '@/redux/services/channels';
import { convertToNewSortType } from '@/shareds/lib/helpers/convertToNewSortType';
import { IGetChannelsRequest } from '@/redux/services/channels/requestModel';
import { SortType } from '@/shareds/types/sortTypes';
import { IChannel } from '@/redux/services/channels/responseModel';
import useIntersectionObserver from '@/shareds/hooks/useIntersectionObserver';

interface IProps {
  sortType?: SortType;
}

export const useGetChannelPlaylists = ({
  sortType = 'SORT_DIRECTION_CREATED_AT_DESC',
}: IProps) => {
  const [cursor, setCursor] = useState<string | null>(null);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const [ref, isIntersecting] = useIntersectionObserver({
    root: null,
    rootMargin: '400px',
    threshold: 0.1,
  });

  const isLastPage = !cursor?.length;

  const requestPayload = {
    limit: 10,
    preloadVideos: 10,
    cursor,
    sortCreatedAt: convertToNewSortType(sortType),
  } as IGetChannelsRequest;

  const [getChannels, { isFetching, isError, isSuccess }] = useLazyGetChannelsQuery();

  // Начальная загрузка списка каналов и по сортировке
  const loadInitialChannels = async () => {
    const res = await getChannels({
      limit: 10,
      preloadVideos: 10,
      sortCreatedAt: convertToNewSortType(sortType),
    });
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
  }, [sortType]);

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
