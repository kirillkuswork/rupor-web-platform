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

export const BackButton: FC<Props> = memo(({
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
      data-testid="otp-back-button"
      type="button"
      variant="tertiary"
      label={t('Modal_OTP_Back_Button_Title')}
      disabled={isDisabled}
      loading={isLoading}
      onClick={handleOnClick}
      fullWidth
    />
  );
});

BackButton.displayName = 'BackButton';
