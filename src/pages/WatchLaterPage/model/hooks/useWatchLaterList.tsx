import { useEffect, useState } from 'react';
import { mapVideoProps } from '@/entities/Video';
import { useLazyGetWatchLaterVideosQuery } from '@/redux/services/playlist';
import { SortType } from '@/shareds/types/sortTypes';
import { convertToNewSortType } from '@/shareds/lib/helpers/convertToNewSortType';
import { IGetWatchLaterVideosRequest } from '@/redux/services/playlist/requestModel';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { watchLaterSliceActions } from '@/redux/slices/watchLaterSlice';

interface IUseWatchLaterList {
  limit?: number;
  sortType?: SortType;
}

export const useWatchLaterList = (props: IUseWatchLaterList) => {
  const { limit = 20, sortType = 'SORT_DIRECTION_CREATED_AT_DESC' } = props;
  const { isAuth } = useSelector(selectors.userSelector);

  const [cursor, setCursor] = useState<string | null>(null);
  // мы не можем использовать встроенный isFetching
  // так как нельзя задать начальное состояние как true
  const [isFetching, setFetching] = useState<boolean>(true);

  const { watchLaterList } = useSelector(selectors.watchLaterSelectors);
  const { setWatchLaterList, setWatchLaterTotalCount } = useActions(watchLaterSliceActions);

  const isLastPage = !cursor?.length;

  const [getVideos, { isError }] = useLazyGetWatchLaterVideosQuery();

  const requestPayload = {
    sortCreatedAt: convertToNewSortType(sortType),
    limit,
    cursor,
  } as IGetWatchLaterVideosRequest;

  const loadInitialVideos = async () => {
    setFetching(true);
    const res = await getVideos({
      limit,
      sortCreatedAt: convertToNewSortType(sortType),
    }).unwrap();
    const transformedVideos = mapVideoProps(res?.videos || []);
    setWatchLaterList(transformedVideos || []);
    setCursor(res?.pagination?.cursor || null);
    setWatchLaterTotalCount(res?.pagination?.totalCount || 0);
    setFetching(false);
  };

  const onEndReached = async () => {
    if (!cursor || isFetching) return;
    setFetching(true);
    const res = await getVideos(requestPayload);
    const transformedVideos = mapVideoProps(res?.data?.videos || []);
    setWatchLaterList([...watchLaterList, ...(transformedVideos || [])]);
    setCursor(res?.data?.pagination?.cursor || null);
    setFetching(false);
  };

  useEffect(() => {
    loadInitialVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, isAuth]);

  return {
    videos: watchLaterList,
    isFetching,
    isError,
    onEndReached,
    isLastPage,
    refetch: loadInitialVideos,
  };
};
