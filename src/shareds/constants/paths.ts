// Роуты должны быть без последнего слэша на конце.
export const APP_PATHS_PAGES = {
  home: '/',
  channels: '/channels',
  channelsSuggestions: '/subscriptions/channels',
  videos: '/videos',
  categories: '/categories',
  subscriptions: '/subscriptions',
  playlist: '/playlist',
  watchLater: '/playlist/watchlater',
  history: '/playlist/history',
  saved: '/playlist/saved',
  tvBattle: '/tvbattle',
  tvBattleVideos: '/tvbattle/videos',
  tvBattleResults: '/tvbattle/results',
  kickStarter: '/kickstarter',
  contact: '/contact',
  info: '/info',
  tvBattleCategory: '/tvbattlecategory',
  searchResults: '/search-results',
  settings: '/settings',
  dynamicChannels: '/channels/[[...slug]]',
  categoriesChannels: '/categories/channels/[id]',
  error404: '/404',
  studio: '/studio',
};

export const YANDEX_ISSUE_FORM_BASE_URL = 'https://forms.yandex.ru/cloud/6268f0b96c86c266975309fc';
export const supportEmail = 'overseas@rutube.ru';
