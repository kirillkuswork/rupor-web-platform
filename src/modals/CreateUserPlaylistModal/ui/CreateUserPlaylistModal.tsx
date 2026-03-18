import { CurrentUserPlaylistModal } from '@/modals';
import { useTranslation } from 'next-i18next';
import { useModal } from '../model/hooks/useModal';

export const CreateUserPlaylistModal = () => {
  const { t } = useTranslation();

  const {
    isModalOpen,
    closeModal,
    handleSubmitCreatePlaylist,
    isLoading,
  } = useModal();

  return (
    <CurrentUserPlaylistModal
      dti="playlist-create-modal"
      title={t('Playlist_Modal_New_Playlist')}
      submitButtonTitle={t('Playlist_Modal_Create')}
      defaultValues={{
        title: '',
        description: '',
      }}
      isOpen={isModalOpen}
      isLoading={isLoading}
      handleOnSubmit={handleSubmitCreatePlaylist}
      handleOnClose={closeModal}
    />
  );
};
