import {
  FC,
  memo,
} from 'react';

import { CountdownTimerComponent } from './CountdownTimerComponent';
import { CountdownTimerProps } from './types';

export const CountdownTimer: FC<CountdownTimerProps> = memo((props) => {
  if (!props.isVisible) {
    return null;
  }

  return (
    <CountdownTimerComponent {...props} />
  );
});

CountdownTimer.displayName = 'CountdownTimer';
