import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { ChannelsSuggestionsPage } from '@/pages';
import withAuthProtection from '@/hoc/withAuthProtection';
import nextI18NextConfig from '../../../next-i18next.config';

const routes = [
  {
    text: 'Menu_subscription',
    href: APP_PATHS_PAGES.subscriptions,
  },
];

const ChannelsSuggestions = () => (
  <ChannelsSuggestionsPage routes={routes} />
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale as string,
      ['common'],
      nextI18NextConfig,
      nextI18NextConfig.i18n.locales,
    )),
  },
});

export default withAuthProtection(ChannelsSuggestions);
