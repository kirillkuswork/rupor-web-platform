import { useEffect, useMemo, useState } from 'react';
import { Option } from '@/entities/SortBtn';
import { convertToNewSortType } from '@/shareds/lib/helpers/convertToNewSortType';
import { SortType } from '@/shareds/types/sortTypes';
import { IGetMyPlaylistsRequest } from '@/redux/services/playlist/requestModel';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { getMyPlaylistsSelectors } from '@/redux/selectors/getMyPlaylistsSelectors';
import { AppDispatchType } from '@/redux/store/store';
import { fetchMyPlaylists } from '@/redux/slices/getMyPlaylistsSlice';
import { Order } from '@/shareds/types/sortOrder';

interface IProps {
  limit?: number;
  sortType: Option['value'];
}

export const useGetPlaylists = (props: IProps) => {
  const {
    limit = 20,
    sortType = 'SORT_DIRECTION_CREATED_AT_DESC',
  } = props;
  const { isAuth } = useSelector(selectors.userSelector);

  const [cursor, setCursor] = useState<string | null>(null);

  const playlists = useSelector(getMyPlaylistsSelectors.getMyPlaylistsSelector);
  const { deletedVideoFromPlaylistId } = useSelector(selectors.playlistSelector);
  const videosSortOrder = Order.SortOrderDesc;

  const { isLoading, isSuccess, isError } = useSelector(getMyPlaylistsSelectors.getFetchParams);

  const { createdPlaylistId } = useSelector(selectors.playlistSelector);
  const convertedSortType = useMemo(() => convertToNewSortType(sortType as SortType), [sortType]);

  const isLastPage = !cursor?.length;

  const requestPayload = {
    limit,
    cursor,
    sortVideos: videosSortOrder,
    preloadVideos: 20,
    sortPlaylistsCreatedAt: convertedSortType,
  } as IGetMyPlaylistsRequest;

  const dispatch = useDispatch<AppDispatchType>();

  const loadInitialPlaylists = async () => {
    const res = await dispatch(fetchMyPlaylists({
      limit,
      sortVideos: videosSortOrder,
      preloadVideos: 20,
      sortPlaylistsCreatedAt: convertedSortType,
    })).unwrap();
    setCursor(res?.pagination?.cursor || null);
  };

  // Загрузка новых плейлистов в конце страницы
  const onEndReached = async () => {
    if (!cursor || isLoading) return;
    const res = await dispatch(fetchMyPlaylists(requestPayload)).unwrap();
    setCursor(res?.pagination?.cursor || null);
  };

  // Начальная загрузка списка плейлистов
  // Обновление на сортировку, авторизацию, удаления из сохраненных и создание нового плейлиста
  useEffect(() => {
    if (isAuth) loadInitialPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, isAuth, createdPlaylistId, deletedVideoFromPlaylistId]);

  return {
    playlists,
    isLoading,
    isError,
    onEndReached,
    refetch: loadInitialPlaylists,
    isLastPage,
    isSuccess,
  };
};
