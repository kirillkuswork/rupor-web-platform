import { PlaylistByIdPage } from '@/pages/PlaylistByIdPage';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withAuthProtection from '@/hoc/withAuthProtection';
import nextI18NextConfig from '../../next-i18next.config';

const PlaylistById = function PlaylistById({ playlistId }: { playlistId: string }) {
  return <PlaylistByIdPage playlistId={playlistId} />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => ({
  props: {
    ...(await serverSideTranslations(
      locale as string,
      ['common'],
      nextI18NextConfig,
      nextI18NextConfig.i18n.locales,
    )),
    playlistId: params?.playlistId,
  },
});

export default withAuthProtection(PlaylistById);
