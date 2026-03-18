import { ReactNode, useEffect } from 'react';
import { generateVisitorId } from '@/shareds/helpers/getUnicUID';
import { useLazyNewDeviceQuery } from '@/redux/services/auth';
import { useLazyGetMeInfoQuery } from '@/redux/services/users';
import checkAuth from '@/shareds/helpers/checkAuth';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { MainLayout as Layout } from 'rupor-ui-kit';

export const AuthAdapter = ({ children }: { children: ReactNode }) => {
  const [setDevice] = useLazyNewDeviceQuery();
  const [getUser] = useLazyGetMeInfoQuery();

  const { isUserInited } = useSelector(selectors.userSelector);

  useEffect(() => {
    const handleGenerateVisitorId = () => {
      generateVisitorId().then((visitorId) => {
        setDevice({ uid: visitorId });
      });
    };
    if (!checkAuth()) {
      return handleGenerateVisitorId();
    }

    getUser();
  }, []);

  if (!isUserInited) {
    return <Layout.Page className="dark:text-white" />;
  }

  return children;
};
