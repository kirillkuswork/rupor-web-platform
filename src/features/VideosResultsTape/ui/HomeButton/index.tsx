import Link from 'next/link';
import { Button } from 'rupor-ui-kit';

import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useTranslation } from 'next-i18next';

export const HomeButton = () => {
  const { t } = useTranslation();

  return (
    <Link href={APP_PATHS_PAGES.home} passHref>
      <Button label={t('Videos_Results_Tape_Home_Button')} />
    </Link>
  );
};
