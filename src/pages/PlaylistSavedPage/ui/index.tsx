import { FC, memo, useCallback, useState } from 'react';

import { SplitPaper } from 'rupor-ui-kit';
import { byNew, Option, SortBtn } from '@/entities/SortBtn';
import { SortType } from '@/shareds/types/sortTypes';
import { useActions } from '@/shareds/hooks/useActions';
import { playlistActions } from '@/redux/actions/playlistActions';
import PlaylistItem from '@/widgets/PlaylistItem';
import { IPlaylist } from '@/redux/services/video/baseModel';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { getPlaylistDropdownType } from '@/shareds/lib/helpers/playlist';
import { EmptyContainer } from '@/shareds';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useCreateUserPlaylistModal } from '@/modals/CreateUserPlaylistModal';
import { useGetPlaylists } from '@/pages/PlaylistSavedPage/model/hooks/useGetPlaylists';
import { useTranslation } from 'next-i18next';
import { PlaylistSavedHeaderTitle } from './PlaylistSavedHeaderTitle';
import { PlaylistSavedMobileDropdown } from './PlaylistSavedMobileDropdown';
import { PlaylistSavedEmpty } from './PlaylistSavedEmpty';
import { PlaylistSavedSkeleton } from './PlaylistSavedSkeleton';

const PlaylistSavedPage: FC = () => {
  const { isInitial } = useSelector(selectors.userSelector);
  const [sortType, setSortType] = useState<Option['value']>(byNew.value);
  const { t } = useTranslation();
  const { setIsMobileDropdownOpen } = useActions(playlistActions);
  const openMobileDropdownActionsModal = () => setIsMobileDropdownOpen(true);

  const { playlists, isSuccess, isError, isLoading, refetch } = useGetPlaylists(
    { sortType },
  );

  const playlistsLength = playlists?.length || 0;
  const isFilterBlockVisible = playlistsLength >= 2;
  const isNotEmpty = Boolean(playlistsLength);
  const isReady = isSuccess && isNotEmpty;

  const { openModal } = useCreateUserPlaylistModal();

  const playlistItem = useCallback(
    (playlist: IPlaylist) => (
      <PlaylistItem
        key={playlist.id}
        contentListId={playlist.id}
        playlist={playlist}
        isLoading={isLoading}
        index={playlist.index}
        dropDownType={getPlaylistDropdownType(playlist)}
      />
    ),
    [isLoading],
  );

  const { Element: Playlists } = arrayRender({
    items: playlists,
    renderItem: playlistItem,
  });

  if (!isLoading && !isNotEmpty && !isInitial) {
    return (
      <>
        <PlaylistSavedEmpty
          openPlaylistModal={openModal}
          openMobileDropdownActionsModal={openMobileDropdownActionsModal}
        />
        <PlaylistSavedMobileDropdown />
      </>
    );
  }

  return (
    <>
      <div className="overflow-hidden">
        <SplitPaper.Wrapper className="mb-6 md:mb-4">
          <SplitPaper.TopBlock className="py-6 md:!p-4">
            <PlaylistSavedHeaderTitle
              handleCreatePlaylistClick={openModal}
              handleDropdownButtonClick={openMobileDropdownActionsModal}
            />
          </SplitPaper.TopBlock>
          {isFilterBlockVisible && (
            <SplitPaper.BottomBlock className="py-3 md:!p-4">
              <div className="my-4 md:m-0">
                <SortBtn
                  dti="saved-playlist-sort-button"
                  onClick={setSortType}
                  value={sortType as SortType}
                />
              </div>
            </SplitPaper.BottomBlock>
          )}
        </SplitPaper.Wrapper>

        {isReady && <Playlists />}

        {(isLoading || isInitial) && !isReady ? <PlaylistSavedSkeleton /> : null}

        {isError && (
          <EmptyContainer
            text={t('Playlist_Saved_Page_Empty_Container_Text')}
            subtitleText={t(
              'Playlist_Saved_Page_Empty_Container_Subtitle_Text',
            )}
            height={300}
            errorHandler={{
              refetch,
              isError,
            }}
          />
        )}
      </div>
      <PlaylistSavedMobileDropdown />
    </>
  );
};

export default memo(PlaylistSavedPage);
