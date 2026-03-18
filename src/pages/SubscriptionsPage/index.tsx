import { Paper } from '@/shareds';
import { SubscriptionsList } from '@/sections/SubscriptionsList';
import { memo } from 'react';
import { Header } from './Header';

export const SubscriptionsPage = memo(() => (
  <div className="flex flex-col h-full">
    <Paper className="py-10 md:py-4" data-testid="subscriptions-header-wrapper">
      <Header />
    </Paper>
    <SubscriptionsList />
  </div>
));

SubscriptionsPage.displayName = 'SubscriptionsPage';
