import { ModalItem } from '@/modals/ChoosePlaylistModal/ui/ModalItem';
import { IPlaylist } from '@/redux/services/video/baseModel';

interface IPlaylistItemProps extends IPlaylist {
  onClick: (id?: string, title?: string) => void
}

export const PlaylistItem = ({ title, onClick, id }: IPlaylistItemProps) => {
  const onClickHandler = () => {
    onClick(id, title);
  };

  return (
    <ModalItem title={title} onClick={onClickHandler} />
  );
};
