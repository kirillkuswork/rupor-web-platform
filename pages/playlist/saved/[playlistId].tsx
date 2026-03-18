import { PlaylistByIdPage } from '@/pages/PlaylistByIdPage';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import withAuthProtection from '@/hoc/withAuthProtection';
import nextI18NextConfig from '../../../next-i18next.config';

const PlaylistSaved = ({ playlistId }: { playlistId: string }) => (
  <PlaylistByIdPage
    playlistId={playlistId}
    route={{ text: 'Playlist_By_Id_Page_Route_Text', href: APP_PATHS_PAGES.saved }}
  />
);

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

export default withAuthProtection(PlaylistSaved);
