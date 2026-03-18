import { memo } from 'react';

import Link from 'next/link';
import { Button } from 'rupor-ui-kit';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { EmptyContainer, Paper } from '@/shareds/ui';
import { useTranslation } from 'next-i18next';

export const HistoryEmptyComponent = memo(() => {
  const { t } = useTranslation();

  return (
    <Paper className="h-full mb-6">
      <EmptyContainer
        dti="history-views"
        text={t('History_Empty_Component_Empty_Container_Text')}
        subtitleText={t('History_Empty_Component_Empty_Container_Subtitle_Text')}
        button={(
          <Link href={APP_PATHS_PAGES.home} passHref>
            <Button
              dti="history-views-empty-button"
              label={t('History_Empty_Component_Empty_Container_Button')}
            />
          </Link>
        )}
      />
    </Paper>
  );
});

HistoryEmptyComponent.displayName = 'HistoryEmptyComponent';
