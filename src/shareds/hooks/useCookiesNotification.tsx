import clsx from 'clsx';
import { getCookie, setCookie } from 'cookies-next';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useCallback, useEffect, useState } from 'react';
import { Button, Notification } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
// eslint-disable-next-line import/order
import { env } from '@/app/utils/getEnv';

interface IUseUnacceptedCookiesNotification {
  showNotification?: boolean;
}

export const useUnacceptedCookiesNotification = (props: IUseUnacceptedCookiesNotification) => {
  const { showNotification = true } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  const cookiesKey = 'X-RUPOR-ACCEPT-COOKIE';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  const cookieDomain = env.API_COOKIE_DOMAIN;
  const hasUnacceptedCookies = !getCookie(cookiesKey);
  const { isMobile } = useIsMobile();
  const { t } = useTranslation();

  const showCookiesNotification = useCallback(() => {
    if (isLoaded && showNotification && hasUnacceptedCookies) {
      // закрытие для корректного отображения при смене локали
      Notification.close(cookiesKey);

      const acceptanceMessage = t('Unaccepted_Cookies_Notification_Message');

      const notification = (
        <div className={clsx(
          'flex items-center justify-between',
          isMobile ? 'flex-col w-full' : 'flex-row w-[808px]',
        )}
        >
          <div
            style={{ maxWidth: isMobile ? '100%' : '80%' }}
            className={clsx(
              isMobile && 'text-center',
              'text-paragraph-l-m font-normal text-black',
            )}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: acceptanceMessage }}
            data-testid="unaccepted-cookies-Notification-message"
          />
          <Button
            label={t('Unaccepted_Cookies_Notification_Button')}
            className={clsx(
              isMobile && 'w-full mt-4',
            )}
            onClick={() => {
              Notification.close(cookiesKey);
              setCookie(
                cookiesKey,
                true,
                { domain: cookieDomain, maxAge: 31536000 },
              );
            }}
            data-testid="unaccepted-cookies_notification_button"
          />
        </div>
      );

      Notification.add({
        key: cookiesKey,
        duration: Infinity,
        containerClassName: 'dark:!bg-white',
        content: notification,
      });
    }
  }, [isLoaded,
    showNotification,
    hasUnacceptedCookies,
    isMobile,
    t,
    cookieDomain]);

  useEffect(() => {
    // без этого правильно определять устройство не будет
    if (window) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    showCookiesNotification();
  }, [showCookiesNotification]);
};
