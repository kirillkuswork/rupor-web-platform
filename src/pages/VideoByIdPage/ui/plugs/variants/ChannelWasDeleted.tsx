import { Button } from 'rupor-ui-kit';
import { EmptyContainer } from '@/shareds';
import Link from 'next/link';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const ChannelWasDeleted = memo(() => {
  const { t } = useTranslation();

  return (
    <EmptyContainer
      text="Channel_Status_Deleted_Title"
      subtitleText="Channel_Status_Deleted_Subtitle"
      button={(
        <Link href={APP_PATHS_PAGES.home} passHref>
          <Button label={t('Empty_Home_Tab_Empty_Container_Button')} />
        </Link>
      )}
    />
  );
});

ChannelWasDeleted.displayName = 'ChannelWasDeleted';
