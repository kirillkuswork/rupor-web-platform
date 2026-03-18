import {
  FC,
  memo,
} from 'react';

import { useTranslation } from 'next-i18next';
import { Button } from 'rupor-ui-kit';

type Props = {
  isLoading: boolean;
  isDisabled: boolean;
  isVisible: boolean;
  onClick: () => void;
};

export const RetryCodeButton: FC<Props> = memo(({
  isLoading,
  isDisabled,
  isVisible,
  onClick: handleOnClick,
}) => {
  const { t } = useTranslation();

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      className="mt-1 mb-1"
      type="button"
      variant="secondary"
      label={t('Modal_OTP_Retry_Button_Title')}
      disabled={isDisabled}
      loading={isLoading}
      onClick={handleOnClick}
      fullWidth
    />
  );
});

RetryCodeButton.displayName = 'RetryCodeButton';
