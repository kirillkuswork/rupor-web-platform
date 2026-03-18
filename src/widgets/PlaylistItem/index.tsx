import { FC } from 'react';

import { IPlaylist } from '@/redux/services/video/baseModel';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { TDropdownType } from '@/shareds/types/dropdown';
import { Playlist } from '@/features/Playlist';
import { useTranslation } from 'next-i18next';

type Props = {
  playlist: IPlaylist;
  isLoading: boolean;
  dropDownType?: TDropdownType;
  contentListId?: string;
  index?: number;
};

const PlaylistItem: FC<Props> = ({
  playlist,
  isLoading,
  dropDownType,
  contentListId,
  index,
}) => {
  const dti = 'saved-playlist-slider';
  const { t } = useTranslation();
  return (
    <Playlist
      dti={dti}
      index={index}
      playlist={playlist}
      contentListId={contentListId}
      isLoading={isLoading}
      dropDownType={dropDownType}
      redirectURL={`${APP_PATHS_PAGES.saved}/${playlist?.id}`}
      emptyText={t('Playlist_Item_Empty_Text')}
    />
  );
};

export default PlaylistItem;
