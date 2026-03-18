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
  disabled?: boolean;
  control: Control<any, any>;
};

export const SubmitButtonFormField: FC<Props> = memo(({
  title,
  form,
  isLoading,
  disabled,
  control,
}) => (
  <Controller
    name="login"
    control={control}
    render={({
      fieldState: { error },
    }) => (
      <div
        className="flex justify-between sm:mt-8 mt-12 md:flex-col flex-row"
      >
        <Button
          data-testid="login-submit-button"
          type="submit"
          form={form}
          label={title}
          disabled={!!error || disabled}
          loading={isLoading}
          fullWidth
        />
      </div>
    )}
  />
));

SubmitButtonFormField.displayName = 'SubmitButtonFormField';
