import {
  FC,
  memo,
} from 'react';

import { useTranslation } from 'next-i18next';

import useTimer from '@/shareds/hooks/useTimer';

import formatTimer from '@/shareds/lib/utils/formatTimer/formatTimer';
import { CountdownTimerProps } from './types';

export const CountdownTimerComponent: FC<CountdownTimerProps> = memo(({
  onStart,
  onEnd,
  isPhone,
}) => {
  const { t } = useTranslation();

  const time = useTimer('60000', 1000, onStart, onEnd);

  return (
    <div
      data-testid={isPhone ? 'otp-phone-timer' : 'otp-email-timer'}
      className="text-white-40 text-paragraph-l-m font-semibold text-center mt-2 mb-4"
    >
      {t('Modal_OTP_Countdown_Timer', {
        time: formatTimer(time / 1000),
      })}
    </div>
  );
});

CountdownTimerComponent.displayName = 'CountdownTimerComponent';
