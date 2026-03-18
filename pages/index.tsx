import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HomePage from '@/pages/HomePage';
import { GetServerSideProps } from 'next';
import nextI18NextConfig from '../next-i18next.config';

const Home = () => <HomePage />;

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

export default Home;
