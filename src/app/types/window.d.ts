import { IVideoPlayerInstance } from '@/entities/Video';

declare global {
  interface Window {
    wlPlayer: {
      PlayerInstance: new () => IVideoPlayerInstance;
    };
    __APP_ENV__?: {
      PRODUCTION?: boolean
      API_URL?: string
      IMG_PROXY_KEY?: string
      IMG_PROXY_SALT?: string
      IMG_PROXY_URL?: string
      API_COOKIE_DOMAIN?: string
      AUTH_MODE_TYPE?: string
      STUDIO_URL?: string
      VERSION_ID?: string
      LOCALIZE_URL?: string
      METRICS_API_URL?: string
    }
  }
}

declare module '*.png';
