import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { IsNotAuthorized } from '@/shareds';
import SettingsPage from '@/pages/SettingsPage';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { SettingsProvider } from '@/app/providers/SettingsProvider';
import { SettingsModal } from '@/modals/SettingsModal';
import nextI18NextConfig from '../../next-i18next.config';

const Settings = () => {
  const { isAuth } = useSelector(selectors.userSelector);

  if (!isAuth) return <IsNotAuthorized authButtonText="Not_Authorized_Auth_Button" />;

  return (
    <SettingsProvider>
      <SettingsPage />
      <SettingsModal />
    </SettingsProvider>
  );
};

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

export default Settings;
