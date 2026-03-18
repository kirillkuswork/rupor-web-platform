import React, { ChangeEvent, FC } from 'react';
import {
  Control, Controller, FieldValues, UseFormProps,
} from 'react-hook-form';
import { BaseModal, Button } from 'rupor-ui-kit';
import { InputCommon, TextArea } from '@/shareds';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import {
  FaqFormData,
  FAQReportToFormFields,
} from '../utils/types';

export interface IModalFormProps extends UseFormProps<FaqFormData> {
  handleBlacklistSubmit: (
    params: (params: FaqFormData) => Promise<void>,
  ) => React.FormEventHandler<HTMLFormElement>;
  onSubmit: (params: FaqFormData) => Promise<void>;
  handleChange: (event: ChangeEvent) => void;
  handleClose: () => void;
  handleBlur: (event: never) => void;
  disabledSubmit: boolean;
  loadingSubmit: boolean;
  isMobile: boolean;
  visible: boolean;
  email: string;
  id: string;
  control: Control<FieldValues>;
}

export const ModalForm: FC<IModalFormProps> = (
  ({
    handleBlacklistSubmit,
    disabledSubmit,
    loadingSubmit,
    handleChange,
    handleClose,
    handleBlur,
    onSubmit,
    isMobile,
    visible,
    control,
    email,
    id,
  }) => {
    const { t } = useTranslation();

    return (
      <BaseModal.Wrapper id={id} open={visible} onClose={handleClose}>
        <BaseModal.Header className="pb-11">
          <BaseModal.Title dti="faq-form-modal">{t('Modal_Form_Title')}</BaseModal.Title>
        </BaseModal.Header>
        <BaseModal.Content className="flex-col gap-6">
          <form onBlur={handleBlur} onSubmit={handleBlacklistSubmit(onSubmit)}>
            <Controller
              name={FAQReportToFormFields.userEmail}
              control={control}
              render={({ field }) => (
                <InputCommon
                  {...field}
                  onChange={(event) => {
                    handleChange(event);
                    field.onChange(event);
                  }}
                  control={control}
                  className={clsx('mb-4', isMobile ? 'w-full' : 'w-96')}
                  label={t('Modal_Form_Label_Email')}
                  required
                  autoFocus={!email}
                />
              )}
            />
            <TextArea
              inputClassName="min-h-[110px]"
              className="mb-12"
              label={t('Modal_Form_Label_Comment')}
              maxLettersCount={1000}
              name={FAQReportToFormFields.comment}
              rows={undefined}
              required
              control={control}
              autoFocus={!!email}
              showLettersCountThreshold={100}
            />
            <Button
              disabled={disabledSubmit}
              loading={loadingSubmit}
              type="submit"
              fullWidth
              size="large"
            >
              {t('Modal_Form_Button_Send')}
            </Button>
          </form>
        </BaseModal.Content>
      </BaseModal.Wrapper>
    );
  }
);
