import { FC, memo } from 'react';

import { Button } from 'rupor-ui-kit';

type Props = {
  title: string;
  isDisabled: boolean;
  onClick?: () => void;
};

export const BackButtonFormField: FC<Props> = memo(
  ({ title, isDisabled, onClick: handleOnClick }) => (
    <Button
      data-testid="registration-back-button"
      type="reset"
      variant="tertiary"
      className="mt-4"
      label={title}
      disabled={isDisabled}
      onClick={handleOnClick}
      fullWidth
    />
  ),
);

BackButtonFormField.displayName = 'BackButtonFormField';
