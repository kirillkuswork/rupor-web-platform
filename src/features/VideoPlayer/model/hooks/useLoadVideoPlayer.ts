import { useCallback, useRef, useState } from 'react';
import { IVideoPlayerInstance, TAutoplayValues } from '@/entities/Video';

interface IInitPlayerInstance {
  start?: number,
  autoplay?: TAutoplayValues,
  containerId?: string
}

export const useLoadVideoPlayer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const videoPlayerInstance = useRef<IVideoPlayerInstance | null>(null);

  const destroyVideoPlayer = useCallback(() => {
    if (videoPlayerInstance.current) {
      videoPlayerInstance.current?.destroy?.();
      videoPlayerInstance.current = null;
    }

    const script = document.getElementById('wlPlayer');
    if (script) {
      document.body.removeChild(script);
    }

    setIsMounted(false);
  }, []);

  const loadVideoPlayerSDK = useCallback(() => new Promise<void>((resolve, reject) => {
    const existPlayer = document.getElementById('wlPlayer');
    if (existPlayer) destroyVideoPlayer();
    const script = document.createElement('script');
    script.src = '/static/player/index.js';
    script.async = true;
    script.onload = () => {
      setIsMounted(true);
      resolve();
    };
    script.onerror = () => {
      reject();
    };
    script.id = 'wlPlayer';
    document.body.appendChild(script);
  }), [destroyVideoPlayer]);

  const loadVideoPlayer = useCallback(async () => {
    destroyVideoPlayer();
    await loadVideoPlayerSDK();
  }, [destroyVideoPlayer, loadVideoPlayerSDK]);

  const initPlayerInstance = useCallback(async (params: IInitPlayerInstance) => {
    const { start = 0, containerId = 'up-player-root', autoplay = 'on' } = params;
    const playerInstance = new window.wlPlayer.PlayerInstance();
    await playerInstance.create({
      debug: false,
      audioMode: false,
      autoplay,
      start,
      ui: 0,
      isClickDisabled: false,
      containerId,
      provider: 'RUPOR',
    });
    videoPlayerInstance.current = playerInstance;
    return playerInstance;
  }, []);

  return {
    loadVideoPlayer,
    destroyVideoPlayer,
    initPlayerInstance,
    isMounted,
  };
};
