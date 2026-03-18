import { RefObject, useCallback } from 'react';

import { useMask } from 'rupor-ui-kit';
import { Mask } from 'rupor-ui-kit/dist/hooks/useMask';
import { getIsPhone } from '@/features/Auth/utils';

export type Serializer = (value: string) => string;

export const PHONE_NUMBER_MASK_REGEX: Mask = [
  '+', '7', ' ',
  /\d/, /\d/, /\d/, ' ',
  /\d/, /\d/, /\d/, ' ',
  /\d/, /\d/, ' ',
  /\d/, /\d/,
];

export const useLoginSerializer = (inputRef: RefObject<HTMLInputElement>) => {
  const { onMask } = useMask(inputRef);

  const serialize: Serializer = useCallback((value: string, phone?: boolean) => {
    const isPhone = getIsPhone(value.replace(/\s/g, ''));

    // не применять маску телефона, если встретились другие символы
    if (!isPhone && !phone) {
      return value.toLowerCase();
    }

    // https://rstorybook.cyrm.ru/?path=/docs/mask-phonemask--email-mask
    const replacedValue = value.startsWith('8')
      ? onMask(PHONE_NUMBER_MASK_REGEX, value.replace('8', '7'))
      : onMask(PHONE_NUMBER_MASK_REGEX, value);

    return replacedValue;
  }, [onMask]);

  const deserialize: Serializer = useCallback((value: string) => (
    value.replace(/ /g, '')
  ), []);

  return {
    serialize,
    deserialize,
  };
};
