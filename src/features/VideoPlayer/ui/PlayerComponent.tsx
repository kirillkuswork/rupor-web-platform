'use client';

import { useCallback, useEffect } from 'react';
import { useActions } from '@/shareds/hooks/useActions';
import { addPlayer, removePlayer } from '@/redux/slices/videoPlayer';
import useDebouncedCallback from '@/shareds/hooks/useDebounceCallback';
import { isBrowser } from '@/shareds/lib/utils/isBrowser';
import { TAutoplayValues } from '@/entities/Video';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useVideoEvents } from '../model/hooks/useVideoEvents';
import { useVideoPlayerStorage } from '../model/hooks/useVideoPlayerStorage';
import { useLoadVideoPlayer } from '../model/hooks/useLoadVideoPlayer';
import { useMetrics } from '../model/hooks/useMetrics';
import { prepareMetricsTemplate } from '../model/lib/metrics/prepareMetricsTemplate';
import { metricsTemplates } from '../model/const/metrics';
import { useLazyNewRefreshQuery } from '@/redux/services/auth';
import { ACCESS_TOKEN_EXPIRESAT } from '@/shareds/constants/auth';

interface IPlayerComponentProps {
  id: string;
  startTime?: string
  autoPlay?: TAutoplayValues;
}

let refreshInterval: NodeJS.Timeout | null = null;
const refreshThreshold = 60000; // 1 min threshold

export const PlayerComponent = ({ id, startTime = '0', autoPlay = 'on' }: IPlayerComponentProps) => {
  const {
    loadVideoPlayer,
    destroyVideoPlayer,
    initPlayerInstance,
    isMounted,
  } = useLoadVideoPlayer();

  const { isAuth, user: { id: userId } } = useSelector(selectors.userSelector);

  useVideoEvents();
  useVideoPlayerStorage(id);
  useMetrics();

  const { addPlayer: addPlayerAction, removePlayer: removePlayerAction } = useActions({
    addPlayer,
    removePlayer,
  });

  const currentVideoInstance = useSelector(selectors.videoPlayerSelectors.getVideoPlayerStateSelector(id));

  useEffect(() => {
    if (!isBrowser) return;
    // @ts-ignore
    window.ruporApiURl = process.env.NEXT_PUBLIC_API_URL;
    // @ts-ignore
    window.cookieDomain = process.env.NEXT_PUBLIC_API_COOKIE_DOMAIN;
  }, []);

  const initializePlayer = useCallback(async () => {
    if (!isMounted) return;
    const playerInstance = await initPlayerInstance({ start: Number(startTime), autoplay: autoPlay });
    if (!playerInstance) return;
    playerInstance.loadVideo({
      provider: 'RUPOR',
      src: id,
    });
    playerInstance.setMetricsTemplate(prepareMetricsTemplate({
      template: metricsTemplates,
      params: {
        user_id: userId!,
        user_auth: isAuth ? '1' : '0',
        content_id: id,
      },
    }));
    addPlayerAction({
      videoId: id,
      playerInstance,
    });
  }, [id, userId, isAuth, startTime, isMounted, autoPlay]);

  const debouncedInitialized = useDebouncedCallback(initializePlayer, 200);
  const [refreshToken] = useLazyNewRefreshQuery();
  function checkAuthAndRefresh() {
    
    const expireAt = localStorage.getItem(ACCESS_TOKEN_EXPIRESAT);
    const nowDate = Date.now();
    const expireDate = expireAt ? +expireAt * 1000 : nowDate;
    if(expireDate - nowDate < refreshThreshold ){ // 1 min threshold
           // trigger Token refresh
           console.log("TOKEN ", (expireDate - nowDate), ' milliseconds left; need refresh');
           refreshToken();
       }
  }

  useEffect(() => {
    if (id) {
      // TODO: setInterval refreshJWTToken
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
      checkAuthAndRefresh();
      refreshInterval = setInterval(checkAuthAndRefresh, refreshThreshold); // check every minute

      loadVideoPlayer().then(debouncedInitialized);

      return () => {
        removePlayerAction({ videoId: id });
        destroyVideoPlayer();
        // remove setInterval
        if (refreshInterval) {
          clearInterval(refreshInterval);
        }
      };
    }
  }, [id]);

  const playerReload = useCallback((videoId: string) => () => {
    removePlayerAction({ videoId });
    destroyVideoPlayer();
    loadVideoPlayer().then(debouncedInitialized);
  }, [id]);

  useEffect(() => {
    if (!currentVideoInstance) return;
    currentVideoInstance.playerInstance.playerReload = playerReload(id);
  }, [currentVideoInstance, id]);

  if (!isMounted) return null;

  return (
    <div
      id="up-player-root"
      style={{
        position: 'absolute', width: '100%', height: '100%', zIndex: '4',
      }}
    />
  );
};
