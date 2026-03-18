import Link from 'next/link';
import { Button } from 'rupor-ui-kit';

import { FC } from 'react';
import { EmptyContainer } from '@/shareds/ui';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useTranslation } from 'next-i18next';

type Props = {
  playlistType: string;
};

export const PlaylistByIdEmpty: FC<Props> = (({ playlistType }) => {
  const isPersonal = ['personal', 'saved'].includes(playlistType);
  const { t } = useTranslation();

  return (
    <EmptyContainer
      text={t('Playlist_By_Id_Empty_Empty_Container_Text')}
      subtitleText={t('Playlist_By_Id_Empty_Empty_Container_Subtitle_Text')}
      button={(
        <Link href={APP_PATHS_PAGES.home} passHref>
          <Button label={t(isPersonal ? 'Playlist_By_Id_Empty_Empty_Container_Button_1' : 'Playlist_By_Id_Empty_Empty_Container_Button_2')} />
        </Link>
      )}
    />
  );
});
