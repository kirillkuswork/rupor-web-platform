import { EmptyPage } from '@/shareds/ui';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';

type Props = {
  emptyText?: string;
  dti?: string
};

export const PlaylistEmpty: FC<Props> = ({ emptyText = 'Playlist_Empty_Empty_Page_Default_Subtitle', dti }) => {
  const { t } = useTranslation();

  return (
    <EmptyPage
      dti={dti}
      title={t('Playlist_Empty_Empty_Page_Title')}
      subTitle={t(emptyText)}
      className="mt-18 md:!mt-6"
      isIconShown={false}
      isButtonShown={false}
    />
  );
};
