import { FC, memo } from 'react';

import { Button } from 'rupor-ui-kit';

type Props = {
  title: string;
  onClick: () => void;
};

export const SubmitButton: FC<Props> = memo(
  ({ title, onClick: handleOnClick }) => (
    <div className="flex justify-between sm:mt-8 mt-12 md:flex-col flex-row">
      <Button type="button" label={title} onClick={handleOnClick} fullWidth />
    </div>
  ),
);

SubmitButton.displayName = 'SubmitButton';
