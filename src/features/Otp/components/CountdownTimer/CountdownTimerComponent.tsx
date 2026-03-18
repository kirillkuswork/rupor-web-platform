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
  time,
}) => {
  const { t } = useTranslation();

  const expiredTime = useTimer(time, 1000, onStart, onEnd);

  return (
    <div
      data-testid={isPhone ? 'otp-phone-timer' : 'otp-email-timer'}
      className="text-white-40 text-paragraph-l-m font-semibold text-center mt-3 mb-3"
    >
      {t('Modal_OTP_Countdown_Timer', {
        time: formatTimer(expiredTime),
      })}
    </div>
  );
});

CountdownTimerComponent.displayName = 'CountdownTimerComponent';
