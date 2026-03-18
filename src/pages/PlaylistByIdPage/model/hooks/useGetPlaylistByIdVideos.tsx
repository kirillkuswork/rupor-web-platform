import { useEffect, useMemo, useState } from 'react';
import { IVideoCardWithDetailsProps, mapVideoProps } from '@/entities/Video';
import { convertToNewSortType } from '@/shareds/lib/helpers/convertToNewSortType';
import { SortType } from '@/shareds/types/sortTypes';
import { useLazyGetMyPlaylistByIdQuery } from '@/redux/services/playlist';
import { IGetMyPlaylistByIdRequest } from '@/redux/services/playlist/requestModel';
import { selectors } from '@/redux/selectors';
import { useSelector } from 'react-redux';
import { VideoSharedVideoStatus } from '@/shareds/constants/videoStatus';
import { IVideo } from '@/redux/services/video/baseModel';

interface IProps {
  limit?: number;
  playlistId?: string;
  sortType?: SortType;
}

export const useGetPlaylistByIdVideos = (props: IProps) => {
  const {
    playlistId = '',
    limit = 20,
    sortType = 'SORT_DIRECTION_CREATED_AT_DESC',
  } = props;

  const { isAuth } = useSelector(selectors.userSelector);
  const { deletedVideoFromPlaylistId } = useSelector(selectors.playlistSelector);

  const [cursor, setCursor] = useState<string | null>(null);
  const [videos, setVideos] = useState<IVideoCardWithDetailsProps[]>([]);
  const [isUninitialized, setIsUninitialized] = useState(true);

  const isLastPage = !cursor?.length;

  const requestPayload = {
    playlistId,
    limit,
    cursor,
    sortCreatedAt: convertToNewSortType(sortType),
  } as IGetMyPlaylistByIdRequest;

  const [getVideos, { isFetching, isError }] = useLazyGetMyPlaylistByIdQuery();

  const transformVideos = (videoItems: IVideo[]) => {
    const filteredDeletedVideos = videoItems.filter((video) => video.status !== VideoSharedVideoStatus.Deleted);
    return mapVideoProps(filteredDeletedVideos) || [];
  };

  const loadInitialVideos = async () => {
    const res = await getVideos({
      playlistId,
      limit,
      sortCreatedAt: convertToNewSortType(sortType),
    });
    const videosResult = res?.data?.videos || [];
    setVideos(transformVideos(videosResult));
    setCursor(res?.data?.pagination?.cursor || null);
    setIsUninitialized(false);
  };

  // Загрузка новых видео в конце страницы
  const onEndReached = async () => {
    if (!cursor || isFetching) return;
    const res = await getVideos(requestPayload);
    const videosResult = res?.data?.videos || [];
    setVideos((prevState) => [...prevState, ...(transformVideos(videosResult))]);
    setCursor(res?.data?.pagination?.cursor || null);
  };

  // Начальная загрузка списка видео
  useEffect(() => {
    if (isAuth) loadInitialVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType, isAuth]);

  // Рефетч после удаления видео из плейлиста
  useEffect(() => {
    if (deletedVideoFromPlaylistId) loadInitialVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedVideoFromPlaylistId]);

  const formatVideos = useMemo(() => videos.map((el) => ({ ...el, playlistId })), [videos]);

  return {
    videos: formatVideos,
    isLoading: isFetching,
    isError,
    onEndReached,
    loadInitialVideos,
    isLastPage,
    isUninitialized,
  };
};
