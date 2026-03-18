import { useLazyGetMyPlaylistsQuery } from '@/redux/services/playlist';
import { useEffect, useMemo, useState } from 'react';
import { IPlaylist } from '@/redux/services/video/baseModel';
import useIntersectionObserver from '@/shareds/hooks/useIntersectionObserver';
import { Order } from '@/shareds/types/sortOrder';

interface IFetchMyPlaylistsQuery {
  fetchCursor: string
}

export const useGetUserPlaylists = () => {
  const [fetchMyPlaylist, { isFetching }] = useLazyGetMyPlaylistsQuery();

  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [cursor, setCursor] = useState('');

  // const hasNextPage = Boolean(cursor.length);

  const [ref] = useIntersectionObserver({
    root: null,
    rootMargin: '400px',
    threshold: 0.1,
  });

  const fetchMyPlaylistsQuery = async ({ fetchCursor }: IFetchMyPlaylistsQuery) => {
    const res = await fetchMyPlaylist({
      sortPlaylistsCreatedAt: Order.SortOrderDesc,
      sortVideos: Order.SortOrderDesc,
      preloadVideos: 20,
      cursor: fetchCursor,
    });
    if (res.data) {
      const formatedPlaylists = res.data.playlists ?? [];
      const formatedCursor = res.data?.pagination?.cursor ?? '';
      setPlaylists((prevState) => ([...prevState, ...formatedPlaylists]));
      setCursor(formatedCursor);
    }
  };

  useEffect(() => {
    fetchMyPlaylistsQuery({ fetchCursor: cursor });
  }, []);

  // useEffect(() => {
  //   if (isIntersecting && !isFetching && hasNextPage) {
  //     fetchMyPlaylistsQuery({ fetchCursor: cursor });
  //   }
  // }, [isIntersecting]);

  const memoizedPlaylists = useMemo(() => playlists, [playlists]);

  return {
    playlists: memoizedPlaylists,
    isLoading: isFetching,
    ref,
  };
};
