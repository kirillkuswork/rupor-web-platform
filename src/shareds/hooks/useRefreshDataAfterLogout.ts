import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { useLazyGetVideoListAfterLogoutQuery } from '@/redux/services/video';

// определяем какую именно функцию необходимо использовать в случае логаута или авторизации
// для обновления данных страницы
export const useRefreshDataAfterLogout = () => {
  const [getVideos] = useLazyGetVideoListAfterLogoutQuery();
  const router = useRouter();

  return useMemo(() => {
    switch (router.pathname) {
      case APP_PATHS_PAGES.home:
        return getVideos;
      default:
        return null;
    }
  }, [router.pathname, getVideos]);
};
