import { BlockHeaderInner } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

export const PlaylistSavedTitle = () => {
  const { t } = useTranslation();

  return (
    <BlockHeaderInner.TitleWrapper>
      <BlockHeaderInner.Title
        data-testid="saved-playlist-title"
        className="my-4 md:text-headline-xs md:m-0 text-headline-s"
      >
        {t('Playlist_Saved_Title_Title')}
      </BlockHeaderInner.Title>
    </BlockHeaderInner.TitleWrapper>
  );
};
