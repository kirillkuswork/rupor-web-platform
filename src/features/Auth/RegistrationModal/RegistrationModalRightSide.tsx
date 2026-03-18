import { FC, memo } from 'react';

import { FORM_IDS } from '@/features/Auth/consts';
import { USER_NAME_LENGTH_MAX, USER_NAME_LENGTH_MIN, USER_NAME_REGEX } from '@/features/Auth/consts/user';
import { authApi } from '@/redux/services';
import { TCredentialServiceTypes } from '@/shareds/constants/globalTypes';
import { useAuthModal } from '@/providers/AuthModalProvider';
import { Wrapper, Header } from '../ui';
import { ButtonsWrapper } from './ui/ButtonsWrapper';
import { RegistrationForm } from './ui/Form';
import { BackButtonFormField } from './ui/Form/components/BackButtonFormField';
import { NameInputFormField } from './ui/Form/components/NameInputFormField';
import { SubmitButtonFormField } from './ui/Form/components/SubmitButtonFormField';
import { useNameInputCounter } from './ui/Form/hooks/useNameInputCounter';
import { useRulesInfoVisibilityByName } from './ui/Form/hooks/useRulesInfoVisibilityByName';
import { InformationText } from './ui/InformationText';
import { NameRulesInfo } from './ui/NameRulesInfo';

import { RegistrationModalProps } from './types';

export const RegistrationModalRightSide: FC<RegistrationModalProps> = memo(
  ({
    title,
    description,
    language,
    submitButtonTitle,
    cancelButtonTitle,
    inputLabel,
    consentText,
    login,
    name,
    rulesTitle,
    rules,
    isPhone,
    onSubmit,
    onCancel: handleOnCancel,
    onClose: handleOnClose,
  }) => {
    const [declare, { isLoading }] = authApi.useLazyDeclareRegistrationQuery();
    const { updateModalParams, modalParams } = useAuthModal();
    // useRegistration({
    //   isPhone,
    //   language,
    //   login,
    //   onSubmit,
    // });

    const handleOnRegistration = () => {
      const service: TCredentialServiceTypes = isPhone ? 'CREDENTIAL_SERVICE_TYPE_PHONE' : 'CREDENTIAL_SERVICE_TYPE_EMAIL';
      declare({
        user: {
          name,
          age: '18',
          gender: 'GENDER_UNSPECIFIED',
        },
        service,
        input: login,
        language,
      }).then(({ data }) => {
        if (data) {
          updateModalParams({ ...modalParams, confirmCodeId: data.confirmCodeId });
          onSubmit({
            name: login,
            confirmCodeId: data.confirmCodeId!,
            isTooManyRequestsFor1Min: false,
          });
        }
      });
    };

    const {
      isVisible,
      isError,
      onNameInputChange: handleOnNameInputChange,
      onNameInputSubmit: handleOnNameInputSubmit,
    } = useNameInputCounter(USER_NAME_LENGTH_MIN, USER_NAME_LENGTH_MAX);

    const {
      isVisible: isRulesVisible,
      onNameInputSubmit: handleOnRulesNameInputSubmit,
    } = useRulesInfoVisibilityByName(
      USER_NAME_REGEX,
      USER_NAME_LENGTH_MIN,
      USER_NAME_LENGTH_MAX,
    );

    return (
      <Wrapper onClose={handleOnClose} ariaLabelledby={title}>
        <Header
          titleDti="registration"
          descriptionDti="registration-description"
          title={title}
          description={description}
        >
          <RegistrationForm
            id={FORM_IDS.registration}
            defaultNameValue={name}
            onPreSubmit={(newName: string) => {
              handleOnRulesNameInputSubmit(newName);
              handleOnNameInputSubmit(newName);
            }}
            onSubmit={handleOnRegistration}
          >
            {(params) => (
              <>
                <NameInputFormField
                  register={params.register}
                  label={inputLabel}
                  control={params.control}
                  isLoading={isLoading}
                  form={FORM_IDS.registration}
                  onChange={(event) => {
                    handleOnNameInputChange(event);
                  }}
                  onBlur={params?.handleBlur || undefined}
                  isCounterError={isError}
                  enableLettersCount={isVisible}
                  maxLettersCount={USER_NAME_LENGTH_MAX}
                  clearErrors={params.clearErrors}
                  onPressEnter={params.handleFormSubmitExternal}
                />

                <NameRulesInfo
                  isVisible={isRulesVisible}
                  title={rulesTitle}
                  rules={rules}
                />

                <ButtonsWrapper>
                  <SubmitButtonFormField
                    title={submitButtonTitle}
                    isLoading={isLoading || Boolean(params.loadingSubmit)}
                    control={params.control}
                    form={FORM_IDS.registration}
                    disabled={Boolean(params.disabledSubmit)}
                  />

                  <BackButtonFormField
                    title={cancelButtonTitle}
                    isDisabled={isLoading}
                    onClick={handleOnCancel}
                  />
                </ButtonsWrapper>

                <InformationText text={consentText} />
              </>
            )}
          </RegistrationForm>
        </Header>
      </Wrapper>
    );
  },
);

RegistrationModalRightSide.displayName = 'RegistrationModalRightSide';
