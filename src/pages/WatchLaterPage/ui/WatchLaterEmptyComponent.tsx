import { FC } from 'react';

import Link from 'next/link';
import { Button } from 'rupor-ui-kit';
import { EmptyContainer } from '@/shareds';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useTranslation } from 'next-i18next';

export const WatchLaterEmptyComponent: FC = () => {
  const { t } = useTranslation();

  return (
    <EmptyContainer
      dti="watch-later-empty"
      text={t('Watch_Later_Empty_Component_Empty_Container_Text')}
      subtitleText={t('Watch_Later_Empty_Component_Empty_Container_Subtitle_Text')}
      button={(
        <Link href={APP_PATHS_PAGES.home} passHref>
          <Button
            label={t('Watch_Later_Empty_Component_Empty_Container_Button')}
            data-testid="watch-later-empty-home-button"
          />
        </Link>
    )}
    />
  );
};
