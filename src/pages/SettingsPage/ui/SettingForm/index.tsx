import React, {
  FC,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useValidationBlacklist } from '@/shareds/hooks/useValidationBlacklist';
import {
  useLazyGetMeInfoQuery,
  useUpdateUserMutation,
} from '@/redux/services/users';
import { InputCommon } from '@/shareds';
import { useTranslation } from 'next-i18next';
import { Input, Notification } from 'rupor-ui-kit';
import { useSettingsModal } from '@/app/providers/SettingsProvider';
import { PostfixComponent } from '@/pages/SettingsPage/ui/SettingForm/Postfix';
import { ButtonGroup } from '@/pages/SettingsPage/ui/SettingForm/ButtonGroup';
import { z } from 'zod';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { CommonCredentialServiceTypes } from '@/features/Auth/consts';
import { useConnectionStatus } from 'rupor-common';
import AvatarField from './AvatarField';
import { EditPen } from './EditPen';
import {
  UserContactsFormValues,
  UserInfoFormValues,
  userInfoResolver,
} from './entities';

interface ISettingForm {
  defaultValues: UserInfoFormValues & UserContactsFormValues;
}

type ChangeNameFormData = z.infer<typeof userInfoResolver>;

const fieldNames: (keyof ChangeNameFormData)[] = ['name'];

const SettingForm: FC<ISettingForm> = ({ defaultValues }) => {
  const [isChange, setIsChange] = useState(false);
  const [pendingName, setPendingName] = useState<string | null>(null);
  const { t } = useTranslation();
  const { isOnline } = useConnectionStatus();
  const { currentCredentials, user } = useSelector(selectors.userSelector);
  const {
    control: userInfoControl,
    resetField: userInfoResetField,
    reset: userInfoReset,
    formState: userInfoFormState,
    getValues: userInfoGetValues,
    setError: userInfoSetError,
    clearErrors: userInfoClearErrors,
    trigger: userInfoTrigger,
  } = useForm<ChangeNameFormData>({
    resolver: userInfoResolver,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { name: defaultValues.name },
  });

  const {
    disabledSubmit,
    handleChange,
    handleBlur,
    handleSubmit,
    loadingSubmit,
  } = useValidationBlacklist({
    fieldNames,
    setError: userInfoSetError,
    clearErrors: (field) => {
      if (userInfoFormState.errors[field]?.message) {
        return;
      }
      userInfoClearErrors(field);
    },
    errors: userInfoFormState.errors,
    trigger: userInfoTrigger,
    getValues: userInfoGetValues,
  });

  const [updateUser] = useUpdateUserMutation();
  const [updateUserInfo] = useLazyGetMeInfoQuery();
  const { openModal } = useSettingsModal();
  const values = useWatch({ control: userInfoControl });

  useEffect(() => {
    const currentName = pendingName ?? values.name;
    setIsChange(currentName !== defaultValues.name);
  }, [defaultValues.name, values.name, pendingName]);

  useEffect(() => {
    if (!pendingName) {
      userInfoReset({ name: defaultValues.name });
    }
  }, [defaultValues.name, userInfoReset, pendingName]);

  const handleNameBlur = useCallback(() => {
    const currentValue = userInfoGetValues('name');
    if (!currentValue?.trim()) {
      userInfoResetField('name');
      setIsChange(false);
      setPendingName(null);
    }
  }, [userInfoGetValues, userInfoResetField]);

  const onSubmit = useCallback(
    async (valuesForm: ChangeNameFormData) => {
      if (!isOnline) {
        return Notification.add({
          containerClassName: '!bg-red !text-white',
          content: t('Offline_State_Error'),
        });
      }
      setPendingName(valuesForm.name);
      await updateUser({
        name: valuesForm.name,
        about: 'name',
        avatarFileId: user?.avatar?.id,
      }).then(async (res) => {
        if (!res.error) {
          await updateUserInfo();
          Notification.add({
            content: t('Settings_Modal_Notification_Changes_Saved'),
            duration: 3000,
          });
          setIsChange(false);
          setPendingName(null);
        } else {
          setPendingName(null);
          userInfoResetField('name');
        }
      });
    },
    [isOnline, user, updateUser, updateUserInfo, t, userInfoResetField],
  );

  const handleReset = useCallback(() => {
    userInfoResetField('name');
    setPendingName(null);
  }, [userInfoResetField]);

  const isNameCounterEnabled = useMemo(() => {
    const name = pendingName ?? userInfoGetValues()?.name;
    return name ? name.length >= 25 : false;
  }, [userInfoGetValues, pendingName]);

  const email = useMemo(
    () => currentCredentials?.find(
      ({ service }) => service === CommonCredentialServiceTypes.Email,
    )?.value,
    [currentCredentials],
  );

  const handleNameChange = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      const nameValue = e.currentTarget;
      if (nameValue.length >= 2) {
        handleChange(e);
      } else {
        userInfoClearErrors('name');
        userInfoTrigger('name');
      }
    },
    [handleChange, userInfoClearErrors, userInfoTrigger],
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <AvatarField />

      <form
        onChange={handleNameChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[416px] w-full gap-6 flex flex-col"
      >
        <InputCommon
          control={userInfoControl}
          label={t('Setting_Form_Input_Common_Label')}
          name="name"
          onBlur={handleNameBlur}
          errorMsg={userInfoFormState.errors.name ? userInfoFormState.errors.name.message : ''}
          maxLettersCount={30}
          enableLettersCount={isNameCounterEnabled}
          value={pendingName ?? values.name}
        />
        <Input
          readOnly
          label="Email"
          value={email}
          postfix={(
            <PostfixComponent
              openModal={() => openModal('email')}
              postfix={<EditPen />}
            />
          )}
        />
        <Input
          readOnly
          label={t('Settings_Form_Change_Password_Input_Label')}
          postfix={(
            <PostfixComponent
              openModal={() => openModal('password')}
              postfix={<EditPen />}
            />
          )}
        />
        <ButtonGroup
          isChange={isChange}
          onReset={handleReset}
          isLoading={loadingSubmit}
          disabled={disabledSubmit || !values.name}
        />
      </form>
    </div>
  );
};

export default memo(SettingForm);

SettingForm.displayName = 'SettingForm';
