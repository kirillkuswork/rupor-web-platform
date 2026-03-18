/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, memo, useMemo } from 'react';

import { ModalParams } from '@/providers/AuthModalProvider';
import { FORM_IDS } from '@/features/Auth/consts';
import { CommonLanguageType } from '@/features/Auth/types';
import { authApi } from '@/redux/services';
import { TCredentialServiceTypes } from '@/shareds/constants/globalTypes';
import { LoginForm } from './ui/Form';
import { LoginInputFormField } from './ui/Form/LoginInputFormField';
import { SubmitButtonFormField } from './ui/Form/SubmitButtonFormField';

import { Header, Wrapper } from '../ui';
import { getIsPhone } from '../utils';

export type LoginModalProps = {
  title: string;
  description: string;
  // language: CommonLanguageType;
  submitButtonTitle: string;
  inputLabel: string;
  onSubmit: (params: ModalParams) => void;
  onClose: () => void;
};

export const LoginModalRightSide: FC<LoginModalProps> = memo(
  ({
    title,
    description,
    // language,
    submitButtonTitle,
    inputLabel,
    onSubmit,
    onClose: handleOnClose,
  }) => {
    const [checkExists, { isFetching }] = authApi.useLazyExistsQuery();
    const [declare] = authApi.useLazyDeclareQuery();
    // убрать функцию когда будет новый хук с новым апи
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOnLogin = (login: string): any => {
      const service: TCredentialServiceTypes = getIsPhone(login) ? 'CREDENTIAL_SERVICE_TYPE_PHONE' : 'CREDENTIAL_SERVICE_TYPE_EMAIL';

      return checkExists({
        service,
        value: login,
      }).then(({ data: exist, error: errExist }) => {
        const isPhone = getIsPhone(login);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!exist && !Number.isInteger((errExist as any)?.status)) {
          //  ToDo обработать после
        }
        if (exist) {
          const isAttemptsEnabled = !exist.blocked;
          const isUserAlreadyRegistered = exist.exists;
          if (!isUserAlreadyRegistered) {
            onSubmit({
              login,
              isPhone,
              isUserAlreadyRegistered: false,
              confirmCodeId: '',
              isAttemptsEnabled,
              isTooManyRequestsFor1Min: false,
            });
            return;
          }
          declare({
            service,
            input: login,
            language: 'LANGUAGE_RU', // ToDo сделать правильно определение языка платформы
          }).then(({ data, error }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (!data && !Number.isInteger((error as any)?.status)) {
              //  ToDo обработать после
            }
            if (data) {
              onSubmit({
                login,
                isPhone,
                isUserAlreadyRegistered: true,
                confirmCodeId: data.confirmCodeId,
                isAttemptsEnabled,
                isTooManyRequestsFor1Min: false,
              });
            }
          });
        }
      });
    };

    return (
      <Wrapper onClose={handleOnClose} ariaLabelledby={title}>
        <Header
          titleDti="login"
          descriptionDti="login-description"
          title={title}
          description={description}
        >
          <LoginForm id={FORM_IDS.login} onSubmit={handleOnLogin}>
            {(params) => (
              <>
                <LoginInputFormField
                  register={params.register}
                  clearErrors={params.clearErrors}
                  label={inputLabel}
                  control={params.control}
                  // isLoading={isLoading}
                  isLoading={false}
                  form={FORM_IDS.login}
                  onPressEnter={params.handleFormSubmitExternal}
                />

                <SubmitButtonFormField
                  title={submitButtonTitle}
                  form={FORM_IDS.login}
                  disabled={isFetching}
                  isLoading={isFetching}
                  control={params.control}
                />
              </>
            )}
          </LoginForm>
        </Header>
      </Wrapper>
    );
  },
);

LoginModalRightSide.displayName = 'LoginModalRightSide';
