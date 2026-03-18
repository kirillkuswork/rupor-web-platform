import {
  FC,
  memo,
} from 'react';

import {
  Controller,
  Control,
} from 'react-hook-form';
import { Button } from 'rupor-ui-kit';

type Props = {
  title: string;
  form?: string;
  isLoading: boolean;
  control: Control<any, any>;
  disabled?: boolean;
};

export const SubmitButtonFormField: FC<Props> = memo(({
  title,
  form,
  isLoading,
  control,
  disabled,
}) => (
  <Controller
    name="name"
    control={control}
    render={() => (
      <Button
        data-testid="registration-submit-button"
        type="submit"
        form={form}
        label={title}
        disabled={disabled}
        loading={isLoading}
        fullWidth
      />
    )}
  />
));

SubmitButtonFormField.displayName = 'SubmitButtonFormField';
