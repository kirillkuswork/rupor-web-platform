import Link from 'next/link';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { Button } from 'rupor-ui-kit';
import { EmptyContainer } from '@/shareds';
import { useTranslation } from 'react-i18next';

export const VideoBlocked = () => {
  const { t } = useTranslation();

  return (
    <EmptyContainer
      text="Video_Status_Blocked_Title"
      subtitleText="Video_Status_Blocked_Subtitle"
      button={(
        <Link href={APP_PATHS_PAGES.home} passHref>
          <Button label={t('Empty_Home_Tab_Empty_Container_Button')} />
        </Link>
      )}
    />
  );
};

VideoBlocked.displayName = 'VideoBlocked';
