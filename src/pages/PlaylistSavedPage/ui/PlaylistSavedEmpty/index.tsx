import { EmptyContainer, Paper } from '@/shareds/ui';
import { memo } from 'react';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import Link from 'next/link';
import { Button } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { PlaylistSavedHeaderTitle } from '../PlaylistSavedHeaderTitle';

type PlaylistSavedEmptyProps = {
  openPlaylistModal: () => void;
  openMobileDropdownActionsModal: () => void;
};

export const PlaylistSavedEmpty = memo(
  ({
    openPlaylistModal,
    openMobileDropdownActionsModal,
  }: PlaylistSavedEmptyProps) => {
    const { t } = useTranslation();

    return (
      <div className="flex flex-col h-full">
        <Paper className="md:py-0">
          <PlaylistSavedHeaderTitle
            handleCreatePlaylistClick={openPlaylistModal}
            handleDropdownButtonClick={openMobileDropdownActionsModal}
          />
        </Paper>

        <Paper className="h-full mb-6">
          <EmptyContainer
            text={t('Playlist_Saved_Empty_Empty_Container_Text')}
            subtitleText={t(
              'Playlist_Saved_Empty_Empty_Container_Subtitle_Text',
            )}
            button={(
              <Link href={APP_PATHS_PAGES.home} passHref>
                <Button
                  label={t('Playlist_Saved_Empty_Empty_Container_Button')}
                />
              </Link>
            )}
          />
        </Paper>
      </div>
    );
  },
);

PlaylistSavedEmpty.displayName = 'PlaylistSavedEmpty';
