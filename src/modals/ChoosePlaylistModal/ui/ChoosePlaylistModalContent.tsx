import { useTranslation } from 'next-i18next';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { BaseModal } from 'rupor-ui-kit/dist';
import { renderSkeletons } from '@/shareds/lib/helpers/renderSkeletons';
import { VFlex } from '@/shareds/ui/Flex';
import { useGetUserPlaylists } from '../model/hooks/useGetUserPlaylists';
import { CreatePersonalPlaylistButton } from './CreatePersonalPlaylistButton';
import { useChooseUserPlaylistModal } from '../model/hooks/useChooseUserPlaylistModalContext';
import { PlaylistItem } from './PlaylistItem';

export const ChoosePlaylistModalContent = () => {
  const { t } = useTranslation();

  const { modalState, closeModal, type } = useChooseUserPlaylistModal();

  const { playlists, ref, isLoading } = useGetUserPlaylists();
  const playlistsFiltered = playlists.filter((item) => item.type !== 'saved');

  const onPlaylistClickHandler = (playlistId?: string, playlistName?: string) => {
    closeModal();
    modalState?.onFinish?.(playlistId, playlistName);
  };

  const isEmpty = !playlists?.length && !isLoading;
  const isInitialLoading = !playlists?.length && isLoading;

  const title = type === 'move' ? t('Playlist_Move_Video_Title') : t('Playlist_Save_Video_Title');
  const subtitle = () => {
    if (type === 'move') {
      return isEmpty ? t('Playlist_Move_Video_Description_Empty') : t('Playlist_Move_Video_Description');
    }

    return isEmpty ? t('Playlist_Save_Video_Description_Empty') : t('Playlist_Save_Video_Description');
  };

  const skeletonsList = renderSkeletons({
    limit: 5,
    className: 'w-full h-[50px] rounded-xl',
  });

  const skeletons = (
    <VFlex gap="4">
      {skeletonsList}
    </VFlex>
  );

  const { Element: Playlists } = arrayRender({
    items: playlistsFiltered,
    renderItem: PlaylistItem,
    additionalProps: {
      onClick: onPlaylistClickHandler,
    },
    listKey: 'id',
  });

  return (
    <>
      <BaseModal.Header>
        <BaseModal.Title>
          {title}
        </BaseModal.Title>
        <BaseModal.SubTitle>
          {subtitle()}
        </BaseModal.SubTitle>
      </BaseModal.Header>

      <BaseModal.Content
        className="min-w-[min(80vw,480px)] mx-auto"
      >
        {
          isInitialLoading ? (
            skeletons
          )
            : (
              <>
                <Playlists />
                {isLoading && skeletons}
                <div ref={ref} />
                <CreatePersonalPlaylistButton onCreatePlaylist={onPlaylistClickHandler} />
              </>
            )
        }

      </BaseModal.Content>
    </>
  );
};
