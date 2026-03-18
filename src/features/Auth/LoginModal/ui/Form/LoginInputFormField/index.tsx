import {
  ChangeEvent,
  FC,
  memo,
  useRef,
} from 'react';

import {
  Controller,
  Control,
  UseFormRegister,
  UseFormClearErrors,
} from 'react-hook-form';
import { Input } from 'rupor-ui-kit';
import { useLoginSerializer } from '@/shareds/hooks/useLoginSerializer';

type Props = {
  control: Control<any, any>;
  label: string;
  isLoading: boolean;
  form?: string;
  register: UseFormRegister<any>;
  clearErrors: UseFormClearErrors<any>;
  onPressEnter: () => void;
};

export const LoginInputFormField: FC<Props> = memo(({
  control,
  label,
  isLoading,
  form,
  register,
  clearErrors,
  onPressEnter: handleOnPressEnter,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { serialize } = useLoginSerializer(inputRef);

  return (
    <Controller
      name="login"
      control={control}
      render={({
        field: {
          value,
          onBlur: handleBlur,
          onChange: handleChange,
        },
        formState: { errors },
      }) => {
        const error = errors.login;

        return (
          <Input
            data-testid="login-input"
            {...register('login')}
            inputRef={inputRef}
            label={label}
            value={value}
            disabled={isLoading}
            error={!!error}
            errorMsg={error?.message as string}
            onPressEnter={handleOnPressEnter}
            onBlur={handleBlur}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (error) {
                clearErrors();
              }

              const serializedValue = serialize(event.target.value);

              // eslint-disable-next-line no-param-reassign
              event.target.value = serializedValue;

              handleChange(event);
            }}
            className="sm:mt-4 mt-6"
            form={form}
          />
        );
      }}
    />
  );
});

LoginInputFormField.displayName = 'LoginInputFormField';
