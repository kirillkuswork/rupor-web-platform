// eslint-disable-next-line import/no-extraneous-dependencies
import {
  differenceInYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';
import { type TFunction } from 'i18next';
import { createDeclensions } from '../createDeclensions';

const years = ['Format_Year_1', 'Format_Year_2', 'Format_Year_3'];
const month = ['Format_Month_1', 'Format_Month_2', 'Format_Month_3'];
const weeks = ['Format_Week_1', 'Format_Week_2', 'Format_Week_3'];
const days = ['Format_Day_1', 'Format_Day_2', 'Format_Day_3'];
const hours = ['Format_Hour_1', 'Format_Hour_2', 'Format_Hour_3'];
const minutes = ['Format_Minute_1', 'Format_Minute_2', 'Format_Minute_3'];

export function formatDateAgo(date: string | number | Date, t?: TFunction) {
  const currentDate = new Date();
  const propsDate = new Date(date);
  const ago = t?.('Format_Ago');

  const diffYears = differenceInYears(currentDate, propsDate);
  if (diffYears >= 1) {
    return `${diffYears} ${t?.(createDeclensions(diffYears, years))} ${ago}`;
  }

  const diffMonths = differenceInMonths(currentDate, propsDate);
  if (diffMonths >= 1) {
    return `${diffMonths} ${t?.(createDeclensions(diffMonths, month))} ${ago}`;
  }

  const diffWeeks = differenceInWeeks(currentDate, propsDate);
  if (diffWeeks >= 2) {
    return `${diffWeeks} ${t?.(createDeclensions(diffWeeks, weeks))} ${ago}`;
  }

  const diffDays = differenceInDays(currentDate, propsDate);
  if (diffDays >= 1) {
    return `${diffDays} ${t?.(createDeclensions(diffDays, days))} ${ago}`;
  }

  const diffHours = differenceInHours(currentDate, propsDate);
  if (diffHours >= 1) {
    return `${diffHours} ${t?.(createDeclensions(diffHours, hours))} ${ago}`;
  }

  const diffMinutes = differenceInMinutes(currentDate, propsDate);
  if (diffMinutes >= 1) {
    return `${diffMinutes} ${t?.(createDeclensions(diffMinutes, minutes))} ${ago}`;
  }

  return t?.('Format_LessThanMinuteAgo');
}
