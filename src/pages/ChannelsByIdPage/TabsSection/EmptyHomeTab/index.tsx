import Link from 'next/link';
import { Button } from 'rupor-ui-kit';

import { FC } from 'react';
import { EmptyContainer, Paper } from '@/shareds/ui';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useTranslation } from 'next-i18next';

type Props = {
  channelId?: string
};
export const EmptyHomeTab: FC<Props> = ({ channelId }) => {
  const { t } = useTranslation();

  return (
    <Paper className="h-full">
      <EmptyContainer
        id={channelId}
        dti="channel-page-empty-video"
        text={t('Empty_Home_Tab_Empty_Container_Text')}
        subtitleText={t('Empty_Home_Tab_Empty_Container_Subtitle_Text')}
        button={(
          <Link href={APP_PATHS_PAGES.home} passHref>
            <Button dti={`channel-page-empty-video-button-to-main_${channelId}`} label={t('Empty_Home_Tab_Empty_Container_Button')} />
          </Link>
      )}
      />
    </Paper>
  );
};
