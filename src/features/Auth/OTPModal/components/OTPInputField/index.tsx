import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { OTPInput } from 'rupor-ui-kit';

type Props = {
  length: number;
  isSubmit: boolean;
  errorMsg: string;
  onFullFilled: (code: string) => void;
};

export const OTPInputField: FC<Props> = memo(({
  length,
  isSubmit,
  errorMsg,
  onFullFilled,
}) => {
  const [error, setError] = useState<string>('');

  const clearErrors = useCallback(() => {
    setError('');
  }, []);

  useEffect(() => {
    setError(errorMsg);
  }, [errorMsg]);

  return (
    <div
      className="mt-6 sm:mt-2 mb-8 sm:mb-4"
    >
      <OTPInput
        data-testid="otp-input"
        error={!!error}
        errorMsg={error}
        inputsCount={length}
        onChange={(code: string) => {
          if (error) {
            clearErrors();
          }

          if (code.length === length) {
            onFullFilled(code);
          }
        }}
        inputProps={{
          disabled: isSubmit,
        }}
      />
    </div>
  );
});

OTPInputField.displayName = 'OTPInputField';
