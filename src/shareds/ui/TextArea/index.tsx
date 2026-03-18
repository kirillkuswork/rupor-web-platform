import {
  Controller,
  FieldValues,
  Control,
  UseControllerProps,
  UseFormRegister,
} from 'react-hook-form';

import { TextArea as TextAreaUI } from 'rupor-ui-kit';
import { BLACK_LIST_ERROR_MESSAGE, INITIAL_BLACK_LIST_ERROR } from '@/shareds/constants/blackList';
import { isBlackListError } from '@/shareds/lib/utils/balcklist/isBlackListError';

import { handleOpenNotification } from '@/shareds/lib/utils/handleOpenNotification';
import { IFormSubmitData } from '@/modals/FAQFormModal/utils/types';
import { useTranslation } from 'react-i18next';

type TextAreaParameter = Parameters<typeof TextAreaUI>[0];

interface Props<TFieldValues extends FieldValues>
  extends TextAreaParameter {
  rules?: UseControllerProps['rules'];
  control: Control<TFieldValues>;
  register?: UseFormRegister<IFormSubmitData>;
}

export function TextArea<TFieldValues extends FieldValues>(
  {
    rules,
    control,
    name = '',
    required,
    register,
    ...otherProps
  }: Props<TFieldValues>,
) {
  const registeredProps = register ? register(name as never) : {};
  const { t } = useTranslation();

  const getErrorMessage = (errorType: string) => {
    if (errorType === 'too_small') {
      return t('Zod_Faq_Comment_Validation_Message');
    }

    if (isBlackListError(errorType)) {
      return t(BLACK_LIST_ERROR_MESSAGE);
    }

    if (errorType === 'too_big') {
      return t('Zod_Faq_Comment_Validation_Limit');
    }

    return '';
  };

  return (
    <Controller
      name={name}
      rules={rules}
      control={control as Control<FieldValues>}
      render={({ field, fieldState: { error } }) => {
        const isError = error?.type !== INITIAL_BLACK_LIST_ERROR && !!error;
        const highlights = isBlackListError(error?.type) && error?.message
          ? JSON.parse(error?.message)
          : undefined;

        return (
          <TextAreaUI
            {...otherProps}
            {...field}
            required={!!rules?.required || required}
            error={isError}
            errorMsg={getErrorMessage(error?.type || '')}
            onCopy={handleOpenNotification}
            highlights={highlights}
            {...registeredProps}
          />
        );
      }}
    />
  );
}
