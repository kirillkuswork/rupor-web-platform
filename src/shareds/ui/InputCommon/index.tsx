// eslint-disable-next-line import/no-cycle
import { isBlackListError } from '@/entities/Comment/model/hooks/useCommentValidation';
import { BLACK_LIST_ERROR_MESSAGE } from '@/shareds/constants/blackList';
import { handleOpenNotification } from '@/shareds/lib/utils/handleOpenNotification';
import {
  Control,
  Controller,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import { Input as InputUI } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

type InputParameter = Parameters<typeof InputUI>[0];

interface Props<TFieldValues extends FieldValues>
  extends InputParameter {
  rules?: UseControllerProps['rules'];
  control: Control<TFieldValues, unknown>;
}

export function InputCommon<TFieldValues extends FieldValues>({
  label,
  control,
  name = '',
  allowCopy,
  outerLabel,
  rules,
  enableLettersCount,
  placeholder,
  maxLettersCount,
  readOnly,
  required,
  onBlur,
  ...otherProps
}: Props<TFieldValues>) {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      rules={rules}
      control={control as Control<FieldValues>}
      render={({ field, fieldState: { error } }) => (
        <InputUI
          {...otherProps}
          maxLettersCount={maxLettersCount}
          enableLettersCount={enableLettersCount}
          required={!!rules?.required || required}
          readOnly={readOnly}
          outerLabel={outerLabel}
          label={label}
          allowCopy={allowCopy}
          error={!!error}
          errorMsg={isBlackListError(error?.type)
            ? t(BLACK_LIST_ERROR_MESSAGE)
            : t(error?.message ? error?.message : '')}
          {...field}
          onCopy={handleOpenNotification}
          placeholder={placeholder}
          highlights={isBlackListError(error?.type) && error?.message
            ? JSON.parse(error?.message) : undefined}
          onBlur={onBlur}
        />

      )}
    />
  );
}
