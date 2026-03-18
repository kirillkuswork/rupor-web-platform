import { FC, memo, FocusEvent } from 'react';

import {
  Controller,
  Control,
  UseFormRegister,
  UseFormClearErrors,
} from 'react-hook-form';

import { Input } from 'rupor-ui-kit';
import { BLACK_LIST_ERROR_MESSAGE } from '@/shareds/constants/blackList';
import { isInitialBlackListError } from '@/shareds/lib/utils/balcklist/isInitialBlackListError';
import { isBlackListError } from '@/shareds/lib/utils/balcklist/isBlackListError';

type Props = {
  control: Control<any, any>;
  label: string;
  isLoading: boolean;
  form?: string;
  isCounterError: boolean;
  enableLettersCount: boolean;
  maxLettersCount: number;
  onChange: (name: string) => void;
  onBlur?: (event: any) => void;
  register: UseFormRegister<any>;
  clearErrors: UseFormClearErrors<any>;
  onPressEnter: () => void;
};

export const NameInputFormField: FC<Props> = memo(
  ({
    control,
    label,
    isLoading,
    form,
    isCounterError,
    enableLettersCount,
    maxLettersCount,
    onChange,
    register,
    clearErrors,
    onPressEnter: handleOnPressEnter,
    onBlur: handleBlur,
  }) => {
    const getErrorMessage = (error: any) => {
      if (isBlackListError(error?.type)) {
        return BLACK_LIST_ERROR_MESSAGE;
      }

      return error?.message;
    };

    const handleInputBlur = (
      event: FocusEvent<HTMLInputElement>,
      handleDefaultBlur?: (event: FocusEvent<HTMLInputElement>) => void,
    ) => {
      const trimmedValue = event.target.value.trim();
      if (trimmedValue !== event.target.value) {
        onChange(trimmedValue);
      }
      (handleBlur || handleDefaultBlur!)(event);
    };

    return (
      <Controller
        name="name"
        control={control}
        render={({
          field: { value, onBlur: handleDefaultBlur, onChange: handleChange },
          fieldState: { error },
        }) => (
          <Input
            data-testid="registration-input"
            {...register('name')}
            label={label}
            value={value}
            disabled={isLoading}
            error={isInitialBlackListError(error?.type) ? false : !!error}
            errorMsg={getErrorMessage(error) as string}
            onPressEnter={handleOnPressEnter}
            onBlur={(event) => handleInputBlur(event, handleDefaultBlur)}
            onChange={(event) => {
              if (error && !isBlackListError(error?.type)) {
                clearErrors();
              }
              handleChange(event);
              onChange(event.target.value);
            }}
            countError={isCounterError}
            className="sm:mt-4 mt-8"
            form={form}
            maxLettersCount={maxLettersCount}
            enableLettersCount={enableLettersCount}
            highlights={
              isBlackListError(error?.type) && error?.message
                ? JSON.parse(error?.message)
                : undefined
            }
          />
        )}
      />
    );
  },
);

NameInputFormField.displayName = 'NameInputFormField';
