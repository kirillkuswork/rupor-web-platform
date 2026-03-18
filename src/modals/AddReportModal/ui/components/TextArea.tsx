import {
  Control, Controller, FieldValues, UseControllerProps, UseFormRegister,
} from 'react-hook-form';

import { BLACK_LIST_ERROR_MESSAGE, INITIAL_BLACK_LIST_ERROR } from '@/shareds/constants/blackList';
import { isBlackListError } from '@/shareds/lib/utils/balcklist/isBlackListError';
import { handleOpenNotification } from '@/shareds/lib/utils/handleOpenNotification';
import { TextArea as TextAreaUI } from 'rupor-ui-kit/dist';

import clsx from 'clsx';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useTranslation } from 'next-i18next';
import { FormSubmitData } from '../../model/types/formSubmitData';

type TextAreaParameter = Parameters<typeof TextAreaUI>[0];

interface Props<TFieldValues extends FieldValues, ComplainType extends string>
  extends TextAreaParameter {
  rules?: UseControllerProps['rules'];
  control: Control<TFieldValues>;
  register?: UseFormRegister<FormSubmitData<ComplainType>>;
}

export function TextArea<TFieldValues extends FieldValues, ComplainType extends string>(
  {
    rules,
    control,
    name = '',
    required,
    register,
    ...otherProps
  }: Props<TFieldValues, ComplainType>,
) {
  const { isMobile } = useIsMobile();
  const registeredProps = register ? register(name as keyof FormSubmitData<ComplainType>) : {};
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      rules={rules}
      control={control as Control<FieldValues>}
      render={({ field, fieldState: { error } }) => (
        <TextAreaUI
          {...otherProps}
          {...field}
          className={clsx(isMobile && 'max-h-[130px]')}
          required={!!rules?.required || required}
          error={error?.type === INITIAL_BLACK_LIST_ERROR ? false : !!error}
          errorMsg={isBlackListError(error?.type)
            ? t(BLACK_LIST_ERROR_MESSAGE)
            : error?.message}
          onCopy={handleOpenNotification}
          highlights={isBlackListError(error?.type) && error?.message
            ? JSON.parse(error?.message) : undefined}
          {...registeredProps}
        />

      )}
    />
  );
}
