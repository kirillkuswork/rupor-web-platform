import { useTranslation } from 'next-i18next';
import { RightArrowIcon } from 'rupor-ui-kit/dist';
import { useCreateUserPlaylistModal } from '@/modals/CreateUserPlaylistModal';
import { ModalItem } from './ModalItem';
import { useChooseUserPlaylistModal } from '../model/hooks/useChooseUserPlaylistModalContext';

interface ICreatePersonalPlaylistButtonProps {
  onCreatePlaylist: (playlistId?: string, playlistName?: string) => void;
}

export const CreatePersonalPlaylistButton = ({ onCreatePlaylist }: ICreatePersonalPlaylistButtonProps) => {
  const { t } = useTranslation();

  const { openModal: setIsPlaylistModalOpen, setModalState } = useCreateUserPlaylistModal();
  const { closeModal } = useChooseUserPlaylistModal();

  const onClickHandler = () => {
    closeModal();
    setIsPlaylistModalOpen();
    setModalState({ onFinish: onCreatePlaylist });
  };

  return (
    <ModalItem
      title={t('Playlist_Create_Button_Title')}
      icon={(
        <div className="color-white opacity-40">
          <RightArrowIcon />
        </div>
        )}
      onClick={onClickHandler}
    />
  );
};
