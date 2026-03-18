/* eslint-disable @typescript-eslint/no-explicit-any */
// ToDO remove Any
import {
  FC, memo, useCallback, useEffect, useRef,
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
import { z, ZodError } from 'zod';

import { getIsCorrectPhoneNumber, getIsPhone } from '@/features/Auth/utils';

import { UseDeclareErrorCode } from '@/features/Auth/types';
import { declareErrorCodes } from '@/features/Auth/consts';
import { NOT_CYRILLIC_EMAIL_REGEX, USER_EMAIL_LENGTH_MAX } from '@/features/Auth/consts/user';
import { useLoginSerializer } from '@/shareds/hooks/useLoginSerializer';

type FormData = {
  login: string;
};

type Props = {
  children: (params: {
    control: Control<any, any>;
    register: UseFormRegister<any>;
    clearErrors: UseFormClearErrors<FormData>;
    handleFormSubmitExternal: () => void;
  }) => JSX.Element;
  id: string;
  onSubmit: (login: string) => Promise<UseDeclareErrorCode>;
};

export const LoginForm: FC<Props> = memo(
  ({ children, id, onSubmit: handleSubmit }) => {
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement>(null);

    const { deserialize } = useLoginSerializer(inputRef);

    const resolver = zodResolver(
      z.object({
        login: z.custom((loginValue) => {
          if (!loginValue) {
            throw new ZodError([
              {
                validation: 'regex',
                code: z.ZodIssueCode.invalid_string,
                message: t('Modal_Login_Input_Error_Empty'),
                path: ['login'],
              },
            ]);
          }

          const deserializedLoginValue = deserialize(loginValue as string);
          const isPhone = getIsPhone(deserializedLoginValue);

          // сначала узнаем, телефон ли это вообще
          // если нет - передаем управление следующей проверке на email ниже
          // это нужно для корректного вывода ошибок
          if (isPhone) {
            // тут уже проверяем сам телефон на корректность
            const isCorrectPhoneNumber = getIsCorrectPhoneNumber(
              deserializedLoginValue,
            );

            if (!isCorrectPhoneNumber) {
              throw new ZodError([
                {
                  validation: 'regex',
                  code: z.ZodIssueCode.invalid_string,
                  message: t('Modal_Login_Input_Error_Phone'),
                  path: ['login'],
                },
              ]);
            }

            return true;
          }

          try {
            z.string()
              .regex(NOT_CYRILLIC_EMAIL_REGEX)
              .email()
              .max(USER_EMAIL_LENGTH_MAX)
              .parse(loginValue);
          } catch (error) {
            throw new ZodError([
              {
                validation: 'email',
                code: z.ZodIssueCode.invalid_string,
                message: t('Modal_Login_Input_Error_Email'),
                path: ['login'],
              },
            ]);
          }

          return true;
        }),
      }),
    );

    const {
      control,
      handleSubmit: handleSubmitForm,
      setFocus,
      setError,
      clearErrors,
      register,
    } = useForm<FormData>({
      resolver,
      reValidateMode: 'onSubmit',
      mode: 'onSubmit',
      defaultValues: {
        login: '',
      },
    });

    useEffect(() => {
      setFocus('login', { shouldSelect: true });
    }, [setFocus]);

    const onFormSubmit = useCallback(
      (valuesForm: FormData) => {
        handleSubmit(deserialize(valuesForm.login)).then((error) => {
          if (error === declareErrorCodes.emailValidationError) {
            setError('login', {
              message: t('Modal_Login_Input_Error_Email') as string,
            });
          }
        });
      },
      [deserialize, handleSubmit],
    );

    const handleFormSubmitExternal = handleSubmitForm(onFormSubmit);

    return (
      <form onSubmit={handleFormSubmitExternal} id={id}>
        {children({
          register,
          clearErrors,
          control,
          handleFormSubmitExternal,
        })}
      </form>
    );
  },
);

LoginForm.displayName = 'LoginForm';
