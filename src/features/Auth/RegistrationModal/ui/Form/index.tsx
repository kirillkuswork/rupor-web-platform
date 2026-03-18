import {
  FC, memo, useCallback, useEffect,
} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import {
  Control,
  useForm,
  UseFormClearErrors,
  UseFormRegister,
} from 'react-hook-form';

import { z } from 'zod';
import { USER_NAME_LENGTH_MAX, USER_NAME_LENGTH_MIN, USER_NAME_REGEX } from '@/features/Auth/consts/user';
import { useValidationBlacklist } from '@/shareds/hooks/useValidationBlacklist';

type FormData = {
  name: string;
};

type Props = {
  children: (params: {
    control: Control<any, any>;
    register: UseFormRegister<any>;
    clearErrors: UseFormClearErrors<FormData>;
    handleFormSubmitExternal: () => void;
    disabledSubmit?: boolean;
    loadingSubmit?: boolean;
    handleChange?: (event: any) => void;
    handleBlur?: (event: any) => void;
  }) => JSX.Element;
  id: string;
  defaultNameValue: string;
  onSubmit: (name: string) => void;
  onPreSubmit?: (name: string) => void;
};

const NON_EMPTY_ZOD_RESOLVER_VALUE = 1;

export const RegistrationForm: FC<Props> = memo(
  ({
    children, id, defaultNameValue, onSubmit: handleSubmit,
  }) => {
    const { t } = useTranslation();

    const resolver = zodResolver(
      z.object({
        name: z
          .string()
          .min(
            NON_EMPTY_ZOD_RESOLVER_VALUE,
            t('Modal_Registration_Error_Empty_Name') as string,
          )
          .min(
            USER_NAME_LENGTH_MIN,
            t('Modal_Registration_Error_Name_Length_Min', {
              length: USER_NAME_LENGTH_MIN,
            }) as string,
          )
          .max(
            USER_NAME_LENGTH_MAX,
            t('Modal_Registration_Error_Name_Length_Max') as string,
          )
          .trim()
          .regex(
            USER_NAME_REGEX,
            t('Modal_Registration_Error_Name_Incorrect') as string,
          ),
      }),
    );

    const {
      control,
      // handleSubmit: handleSubmitForm,
      setFocus,
      register,
      clearErrors,
      setError,
      getValues,
      formState,
      trigger,
    } = useForm<FormData>({
      resolver,
      reValidateMode: 'onSubmit',
      mode: 'onSubmit',
      defaultValues: {
        name: defaultNameValue,
      },
    });

    const {
      disabledSubmit,
      loadingSubmit,
      handleChange,
      handleBlur,
      handleSubmit: handleSubmitForm,
    } = useValidationBlacklist({
      fieldNames: ['name'],
      setError,
      clearErrors,
      errors: formState.errors,
      trigger,
      getValues,
    });

    useEffect(() => {
      setFocus('name', { shouldSelect: true });
    }, [setFocus]);

    const onFormSubmit = useCallback(
      async (valuesForm: FormData) => {
        handleSubmit(valuesForm.name);
      },
      [handleSubmit],
    );

    const handleFormSubmitExternal = (...args: never[]) => {
      // onPreSubmit?.(getValues('name'));
      // TODO:: разобраться с типами в rupor-common
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      handleSubmitForm(onFormSubmit)(...args);
    };

    return (
      <form onSubmit={handleFormSubmitExternal} onChange={handleChange} id={id}>
        {children({
          register,
          control,
          clearErrors,
          handleFormSubmitExternal,
          disabledSubmit,
          handleChange,
          handleBlur,
          loadingSubmit,
        })}
      </form>
    );
  },
);

RegistrationForm.displayName = 'RegistrationForm';
