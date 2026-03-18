
type EnvType = {
  PRODUCTION?: boolean,
  API_URL?: string,
  IMG_PROXY_KEY?: string,
  IMG_PROXY_SALT?: string,
  IMG_PROXY_URL?: string,
  API_COOKIE_DOMAIN?: string,
  AUTH_MODE_TYPE?: string,
  STUDIO_URL?: string,
  VERSION_ID?: string,
  LOCALIZE_URL?: string,
  METRICS_API_URL?: string,
  // env for studio:
  PUBLIC_API_URL?: string,
  PLATFORM_URL?: string,
  UPLOADER_SERVER_URL?: string,
  I18_LANGUAGE_FOLDER?: string,
  METRICS_URL_FOR_OPENAPI?: string,
  LOCALIZE_VERSION_ID?: string,
}

// To prevent accidentally leaking env variables to the client,
// only variables prefixed with VITE_ are exposed to your Vite-processed code
// (https://vite.dev/guide/env-and-mode)

export const env: EnvType = global?.window && {
  ...window?.__APP_ENV__,
};
