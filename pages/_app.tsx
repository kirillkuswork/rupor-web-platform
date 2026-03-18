import type { AppProps } from 'next/app';
import { FC, useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import '@/shareds/styles/global.css';
import { MainLayout } from '@/shareds/layouts';
import { wrapper } from '@/redux/store/store';
import { LazyGlobalModalContainer } from '@/temporal/LazyGlobalModalContainer';
import { ContextProvider } from '@/app/providers/ContextProvider';
import { useRouter } from 'next/router';
import { AuthAdapter } from '@/app/providers/AuthAdapter';
import { useUnacceptedCookiesNotification } from '@/shareds/hooks/useCookiesNotification';
import {
  ConnectionStatusProvider, useYmMetricController, useYmMetricsContext, YmMetricsProvider,
} from 'rupor-common';
import { Provider, useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { appEnv } from '@/shareds/constants/environments';
import nextI18NextConfig from '../next-i18next.config';

// @ts-expect-error добавляем env в window
globalThis.__APP_ENV__ = appEnv;

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const { pathname, asPath } = useRouter();
  const { isAuth, user: { id: userId } } = useSelector(selectors.userSelector);

  const { setYmMetricsContextValue } = useYmMetricsContext();

  useYmMetricController({ path: asPath });

  useEffect(() => {
    // Проверка на инициализацию пользователя была выше, поэтому isAuthInfoInited всегда true
    setYmMetricsContextValue((prevState) => ({
      ...prevState, isAuthInfoInited: true, isAuth, userId,
    }));
  }, [userId, isAuth]);

  const is404Page = pathname.includes('404');

  const isEmbed = pathname.includes('embed');

  useUnacceptedCookiesNotification({
    showNotification: !isEmbed && !is404Page,
  });

  if (isEmbed || is404Page) {
    return <Component {...pageProps} />;
  }

  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

const withProviders = (Component: FC<AppProps>) => {
  const WrappedApp: FC<AppProps> = (props) => {
    const { store, props: wrapperProps } = wrapper.useWrappedStore(props);
    return (
      <Provider store={store}>
        <YmMetricsProvider>
          <ConnectionStatusProvider>
            <AuthAdapter>
              <ContextProvider>
                <Component {...wrapperProps} />
                <LazyGlobalModalContainer />
              </ContextProvider>
            </AuthAdapter>
          </ConnectionStatusProvider>
        </YmMetricsProvider>
      </Provider>
    );
  };
  return WrappedApp;
};

export default appWithTranslation(withProviders(App), nextI18NextConfig);
