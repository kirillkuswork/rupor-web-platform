/* eslint-disable no-restricted-syntax */

/**
 * Функция преобразует милисекунды в формат hh:mm:ss
 * @param duration
 */
export const msToHMSFormat = (duration: number): string => {
  const s = Math.floor((duration / 1000) % 60);
  const m = Math.floor((duration / (1000 * 60)) % 60);
  const h = Math.floor((duration / (1000 * 60 * 60)) % 24);

  // eslint-disable-next-line no-nested-ternary
  const hours = h ? (h < 10) ? `0${h}:` : `${h}:` : '';
  // eslint-disable-next-line no-nested-ternary
  const minutes = m ? (m < 10) ? `0${m}:` : `${m}:` : '00:';
  // eslint-disable-next-line no-nested-ternary
  const seconds = s ? (s < 10) ? `0${s}` : s : '00';

  return hours + minutes + seconds;
};
