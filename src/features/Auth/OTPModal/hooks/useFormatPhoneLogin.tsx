import { useCallback, useMemo, useRef } from 'react';

import { useMask } from 'rupor-ui-kit';
import { Mask } from 'rupor-ui-kit/dist/hooks/useMask';

export const useFormatPhoneLogin = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onMask } = useMask(inputRef);

  const PHONE_NUMBER_MASK_REGEX: Mask = useMemo(() => [
    '+', '7', ' ',
    /\d/, /\d/, /\d/, ' ',
    /\d/, /\d/, /\d/, '-',
    /\d/, /\d/, '-',
    /\d/, /\d/,
  ], []);

  const format = useCallback((phone: string): string => {
    const formatted = phone.startsWith('8')
      ? onMask(PHONE_NUMBER_MASK_REGEX, phone.replace('8', '7'))
      : onMask(PHONE_NUMBER_MASK_REGEX, phone);

    return formatted;
  }, [onMask, PHONE_NUMBER_MASK_REGEX]);

  return { format };
};
