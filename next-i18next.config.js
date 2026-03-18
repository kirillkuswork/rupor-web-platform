/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  ns: ['common'],
  defaultNS: 'common',
};
