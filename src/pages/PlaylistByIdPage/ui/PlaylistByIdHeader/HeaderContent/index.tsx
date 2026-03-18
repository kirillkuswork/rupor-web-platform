import { memo, useEffect } from 'react';

import { IPlaylist } from '@/redux/services/video/baseModel';
import { BreadCrumbs, Route } from '@/shareds/ui/BreadCrumbs';
import { getPlaylistName } from '@/shareds/lib/helpers/playlist';
import { useRouter } from 'next/router';
import { useDeleteUserPlaylistModal } from '@/pages/PlaylistByIdPage/model/hooks/useDeleteUserPlaylistModal';
import { useEditUserPlaylistModal } from '@/pages/PlaylistByIdPage/model/hooks/useEditUserPlaylistModal';
import { useMobileDropdownActionsModal } from '@/pages/PlaylistByIdPage/model/hooks/useMobileDropdownActionsModal';
import { ConfirmationModal, CurrentUserPlaylistModal } from '@/modals';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { playlistActions } from '@/redux/actions/playlistActions';
import { useTranslation } from 'next-i18next';
import { PlaylistByIdPageHeaderTitle } from './HeaderTitle';
import { PlaylistByIdMobileDropdown } from '../../PlaylistByIdMobileDropdown';

const deletePlayerlistSubtitle = 'Header_Content_Confirmation_Modal_Subtitle';

type Props = {
  playlistData?: IPlaylist;
  route?: Route;
  amountOfVideo: number;
  dti?: string
};

export const HeaderContent = memo(({
  route,
  amountOfVideo,
  playlistData,
  dti,
}: Props) => {
  const router = useRouter();
  const { playlistId } = router.query as { playlistId: string };
  const { editedPlaylistName } = useSelector(selectors.playlistSelector);
  const { setEditedPlaylistName } = useActions(playlistActions);
  const isSavedPlaylist = playlistData?.type === 'PLAYLIST_TYPE_SAVED';
  const playlistTitle = editedPlaylistName || getPlaylistName(playlistData);
  const playlistDescription = playlistData?.description || '';
  const { t } = useTranslation();

  const {
    handleOpenMobileDropdown,
    handleCloseMobileDropdown,
    isMobileDropdownOpen,
    isVisible,
  } = useMobileDropdownActionsModal(playlistData?.ownerId as string);

  const {
    handleOpenDeletePlaylistModal,
    handleCloseDeletePlaylistModal,
    handleSubmitDeletePlaylist,
    isLoading: deletePlaylistIsLoading,
    isDeletePlaylistModalOpen,
  } = useDeleteUserPlaylistModal({ playlistId, playlistTitle });

  const {
    handleOpenEditPlaylistModal,
    handleCloseEditPlaylistModal,
    handleSubmitEditPlaylist,
    isLoading: editPlaylistIsLoading,
    isEditPlaylistModalOpen,
  } = useEditUserPlaylistModal({ playlistId, playlistTitle });

  const handleResetEditedName = () => {
    setEditedPlaylistName('');
  };

  useEffect(() => {
    setEditedPlaylistName(getPlaylistName(playlistData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => handleResetEditedName, []);

  return (
    <>
      {route && (
        <BreadCrumbs
          dti={`${dti}-bread-crumbs`}
          id={playlistData?.id}
          routes={[route]}
        />
      )}

      <PlaylistByIdPageHeaderTitle
        dti={dti}
        id={playlistData?.id}
        title={playlistTitle || t('Saved_Playlist_Name')}
        handleDropdownButtonClick={handleOpenMobileDropdown}
        handleEditMenuClick={handleOpenEditPlaylistModal}
        handleDeleteMenuClick={handleOpenDeletePlaylistModal}
        isMenuVisible={isVisible && !isSavedPlaylist}
        amountOfVideo={amountOfVideo}
      />

      {isEditPlaylistModalOpen && (
        <CurrentUserPlaylistModal
          playlistId={playlistData?.id}
          dti="playlist-edit-modal"
          title={t('Header_Content_Current_User_Playlist_Modal_Title')}
          submitButtonTitle={t('Header_Content_Current_User_Playlist_Modal_Submit_Button_Title')}
          defaultValues={{
            title: playlistTitle,
            description: playlistDescription,
          }}
          isOpen={isEditPlaylistModalOpen}
          isLoading={editPlaylistIsLoading}
          handleOnSubmit={handleSubmitEditPlaylist}
          handleOnClose={handleCloseEditPlaylistModal}
        />
      )}

      <ConfirmationModal
        playlistId={playlistData?.id}
        dti="playlist-delete-modal"
        title={t('Header_Content_Confirmation_Modal_Title', { playlistTitle })}
        subTitle={t(deletePlayerlistSubtitle)}
        isOpen={isDeletePlaylistModalOpen}
        isLoading={deletePlaylistIsLoading}
        submitButtonLabel={t('Header_Content_Confirmation_Modal_Submit_Button_Label')}
        cancelButtonLabel={t('Header_Content_Confirmation_Modal_Cancel_Button_Label')}
        handleOnSubmit={handleSubmitDeletePlaylist}
        handleOnCancel={handleCloseDeletePlaylistModal}
        handleOnClose={handleCloseDeletePlaylistModal}
      />

      <PlaylistByIdMobileDropdown
        isOpen={isMobileDropdownOpen}
        handleOnClose={handleCloseMobileDropdown}
        handleEditMenuClick={handleOpenEditPlaylistModal}
        handleDeleteMenuClick={handleOpenDeletePlaylistModal}
      />
    </>
  );
});

HeaderContent.displayName = 'HeaderContent';
