import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SubscriptionsPage } from '@/pages/SubscriptionsPage';
import withAuthProtection from '@/hoc/withAuthProtection';
import nextI18NextConfig from '../../next-i18next.config';

const Subscriptions = () => <SubscriptionsPage />;

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

export default withAuthProtection(Subscriptions);
