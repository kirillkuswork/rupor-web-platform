import { FC, useCallback, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'rupor-ui-kit';

import {
  EmptyContainer, Paper,
} from '@/shareds/ui';
import { Route } from '@/shareds/ui/BreadCrumbs';
import { SortType } from '@/shareds/types/sortTypes';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useGetMyPlaylistByIdQuery } from '@/redux/services/playlist';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { VideoList } from '@/entities/Video';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useGetVideoActions } from '@/temporal/useGetVideoActions';
import { useTranslation } from 'next-i18next';
import { PlaylistByIdHeader } from './ui/PlaylistByIdHeader';
import { HeaderSkeleton } from './ui/PlaylistByIdHeaderSkeleton';
import { useGetPlaylistByIdVideos } from './model/hooks/useGetPlaylistByIdVideos';
import { PlaylistByIdEmpty } from './ui/PlaylistByIdEmpty';
import { PlaylistSavedSkeleton } from '../PlaylistSavedPage/ui/PlaylistSavedSkeleton';

type Props = {
  route?: Route;
  playlistId: string;
};

export const PlaylistByIdPage: FC<Props> = ({
  route,
  playlistId,
}) => {
  const { isAuth } = useSelector(selectors.userSelector);
  const { pathname } = useRouter();
  const [sortType, setSortType] = useState<SortType>('SORT_DIRECTION_CREATED_AT_DESC');
  const { t } = useTranslation();

  const handleToggleSortType = useCallback((value: string) => {
    setSortType(value as SortType);
  }, []);

  const {
    data: playlistData, isLoading: isPlaylistLoading, error, isUninitialized: isPlaylistUninitialized,
  } = useGetMyPlaylistByIdQuery({ playlistId }, { skip: !isAuth });

  const playlist = playlistData?.playlist;

  const {
    videos, onEndReached, isLoading: isVideosLoading, isLastPage, isUninitialized: isVideosUninitialized,
  } = useGetPlaylistByIdVideos({ playlistId, sortType });

  const amountOfVideo = videos?.length || 0; // TODO: переделать, не приходит total
  const dti = pathname.includes(APP_PATHS_PAGES.saved) ? 'saved-playlist-page' : 'playlist-page';
  const err = error as FetchBaseQueryError;
  const isDeleted = err?.status === 404 || (!playlist && !isPlaylistLoading);
  const showSkeleton = isPlaylistUninitialized || isVideosUninitialized;

  const actions = useGetVideoActions({ actionsList: ['addToWatchLater', 'addToQueue', 'deleteVideoFromPlaylist', 'addReportToVideo'] });

  const dataGrid = {
    data: videos,
    hasNextPage: !isLastPage && !isVideosLoading,
    isLoading: isVideosLoading,
    onEndReached,
  };

  if (showSkeleton) {
    return (
      <div className="flex flex-col h-full">
        <HeaderSkeleton />
        <PlaylistSavedSkeleton />
      </div>
    );
  }

  if (isDeleted) {
    return (
      <Paper className="mb-0 h-full">
        <EmptyContainer
          text={t('Playlist_By_Id_Page_Empty_Container_Text')}
          subtitleText={t('Playlist_By_Id_Page_Empty_Container_Subtitle_Text')}
          isPage
          button={(
            <Link href={APP_PATHS_PAGES.home} passHref>
              <Button className="text-center" variant="primary">{t('Channels_Suggestions_Page_Empty_Container_Button')}</Button>
            </Link>
          )}
        />
      </Paper>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {isPlaylistLoading ? (
        <HeaderSkeleton />
      ) : (
        <PlaylistByIdHeader
          dti={`${dti}-header`}
          playlistData={playlist}
          amountOfVideo={amountOfVideo}
          route={route}
          currentValue={sortType}
          onToggleSortType={handleToggleSortType}
        />
      )}
      <Paper data-testid={`${dti}-grid_${playlist?.id}`}>
        <VideoList.Grid
          NotFoundComponent={() => PlaylistByIdEmpty({ playlistType: playlist?.type || '' })}
          getVideoActions={actions}
          {...dataGrid}
        />
      </Paper>
    </div>
  );
};
