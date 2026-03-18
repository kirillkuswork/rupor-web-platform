import { FC, memo } from 'react';

import { Button } from 'rupor-ui-kit';

type Props = {
  title: string;
  isDisabled: boolean;
  onClick?: () => void;
  dti?: string
};

export const BackButton: FC<Props> = memo(
  ({
    title, isDisabled, onClick: handleOnClick, dti,
  }) => (
    <Button
      data-testid={dti}
      type="reset"
      variant="tertiary"
      label={title}
      disabled={isDisabled}
      onClick={handleOnClick}
      fullWidth
    />
  ),
);

BackButton.displayName = 'BackButton';
