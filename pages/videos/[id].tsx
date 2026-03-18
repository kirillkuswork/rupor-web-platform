import { GetServerSideProps, NextPage } from 'next';
import { VideoByIdPage } from '@/pages/VideoByIdPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withAuthProtection from '@/hoc/withAuthProtection';
import nextI18NextConfig from '../../next-i18next.config';

const VideoById: NextPage = () => <VideoByIdPage />;

export default withAuthProtection(VideoById);

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const videoId = params?.id;

  return {
    props: {
      ...(await serverSideTranslations(
        locale as string,
        ['common'],
        nextI18NextConfig,
        nextI18NextConfig.i18n.locales,
      )),
      videoId,
    },
  };
};
