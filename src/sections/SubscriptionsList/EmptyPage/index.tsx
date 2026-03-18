import Link from 'next/link';
import { Button } from 'rupor-ui-kit';
import { EmptyContainer, Paper } from '@/shareds';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useTranslation } from 'next-i18next';

export const SubscriptionsEmptyComponent = () => {
  const { t } = useTranslation();

  return (
    <Paper className="h-full" data-testid="subscriptions-empty-content">
      <EmptyContainer
        text="Subscriptions_Empty_Component_Empty_Container_Text"
        subtitleText="Subscriptions_Empty_Component_Empty_Container_Subtitle_Text"
        button={(
          <Link
            data-testid="subscriptions-find-content-button"
            href={APP_PATHS_PAGES.channelsSuggestions}
            passHref
          >
            <Button label={t('Subscriptions_Empty_Component_Empty_Container_Button')} />
          </Link>
      )}
        dti="subscriptions"
      />
    </Paper>
  );
};
