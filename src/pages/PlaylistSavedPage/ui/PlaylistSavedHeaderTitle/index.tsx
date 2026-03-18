import { FC, MouseEvent } from 'react';

import {
  AdditionalHorizontalIcon,
  BlockHeaderInner,
  Button,
} from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import { PlaylistSavedTitle } from '../PlaylistSavedTitle';

type PlaylistSavedHeaderTitleProps = {
  handleCreatePlaylistClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleDropdownButtonClick: () => void;
};

export const PlaylistSavedHeaderTitle: FC<PlaylistSavedHeaderTitleProps> = ({
  handleCreatePlaylistClick,
  handleDropdownButtonClick,
}) => {
  const { t } = useTranslation();

  return (
    <BlockHeaderInner.Container split>
      <>
        <PlaylistSavedTitle />
        <BlockHeaderInner.RightBlock>
          <Button
            dti="saved-playlist-create-button"
            size="small"
            onClick={handleCreatePlaylistClick}
          >
            {t('Playlist_Saved_Header_Title_Button')}
          </Button>
        </BlockHeaderInner.RightBlock>
        <BlockHeaderInner.RightBlockMobile>
          <AdditionalHorizontalIcon
            color="grey"
            onClick={handleDropdownButtonClick}
          />
        </BlockHeaderInner.RightBlockMobile>
      </>
    </BlockHeaderInner.Container>
  );
};
