import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import WatchLaterPage from '@/pages/WatchLaterPage';
import withAuthProtection from '@/hoc/withAuthProtection';
import nextI18NextConfig from '../../next-i18next.config';

const WatchLaterPlaylistPage = () => <WatchLaterPage />;

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

export default withAuthProtection(WatchLaterPlaylistPage);
