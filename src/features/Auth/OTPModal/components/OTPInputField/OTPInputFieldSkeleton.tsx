import {
  FC,
  memo,
} from 'react';

import { OTPInput } from 'rupor-ui-kit';

type Props = {
  length: number;
};

export const OTPInputFieldSkeleton: FC<Props> = memo(({ length }) => (
  <div
    className="mt-6 sm:mt-2 mb-8 sm:mb-4"
  >
    <OTPInput
      inputsCount={length}
      inputProps={{
        disabled: true,
      }}
    />
  </div>
));

OTPInputFieldSkeleton.displayName = 'OTPInputFieldSkeleton';
