const prodRegexp = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
const devRegexp = /^(\+7|7|8)?[\s-]?\(?[0489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
const isDemo = JSON.parse(process.env.NEXT_PUBLIC_IS_DEMO ?? 'false');
// eslint-disable-next-line import/prefer-default-export
export const phoneRegexp = isDemo ? prodRegexp : devRegexp;
export const nonEmptyPhoneRegexp = /^(\+7|7|8)[\s?].{1,}$/;
