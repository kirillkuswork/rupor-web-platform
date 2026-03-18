import {
  FC, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useRouter } from 'next/router';
import { Control, FieldValues, useForm } from 'react-hook-form';

import {
  FaqFormData, faqFormeSchema,
  FAQReportToFormFields,
  ReportFAQProblemRequest,
} from '@/modals/FAQFormModal/utils/types';
import { useValidationBlacklist } from '@/shareds/hooks/useValidationBlacklist';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { ModalForm } from '@/modals/FAQFormModal/ModalForm';
import {
  useLazyGetFAQAnswerQuery,
  useLazyGetFAQCategoryByIdQuery,
} from '@/redux/services/faq';
import { useAddProblemReportMutation } from '@/redux/services/report';
import { CommonCredentialServiceTypes } from '@/features/Auth/consts';
import { SimpleDialogModal } from '@/shareds/ui/SimpleDialogModal/SimpleDialogModal';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useTranslation } from 'next-i18next';
import { useCurrentCredentialsQuery } from '@/redux/services/users';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { zodResolver } from '@hookform/resolvers/zod';

interface IFAQFormModal {
  visible: boolean;
  onClose: () => void;
}
const fieldNames: (keyof FaqFormData)[] = [FAQReportToFormFields.userEmail, FAQReportToFormFields.comment];

export const FAQFormModal: FC<IFAQFormModal> = ({ visible, onClose }) => {
  const { t, i18n } = useTranslation();

  const modalContent = {
    title: t('FAQ_Form_Modal_Title'),
    description: t('FAQ_Form_Modal_Description'),
    buttonTitle: t('FAQ_Form_Modal_Button_Title'),
  };

  const { query } = useRouter();
  const id = 'faq-form-modal';

  const { isAuth } = useSelector(selectors.userSelector);

  const { isMobile } = useIsMobile();

  const [openModal, setOpenModal] = useState(false);

  const showSimpleDialogModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const { data: credentials } = useCurrentCredentialsQuery(undefined, { skip: !isAuth });
  const [getFAQCategoryById, { data: category }] = useLazyGetFAQCategoryByIdQuery();
  const [getFAQAnswer, { data: question }] = useLazyGetFAQAnswerQuery();
  const [mutationCreateQuestion] = useAddProblemReportMutation();

  const { email } = useMemo(
    () => ({
      email:
        credentials?.items?.find(
          ({ service }) => service === CommonCredentialServiceTypes.Email,
        )?.value || '',
    }),
    [credentials],
  );

  const {
    control,
    formState,
    clearErrors,
    setError,
    trigger,
    getValues,
    resetField,
  } = useForm<FaqFormData>({
    resolver: zodResolver(faqFormeSchema),
    mode: 'onSubmit',
    values: {
      userEmail: isAuth ? email : '',
      comment: '',
    },
  });

  const {
    handleSubmit: handleBlacklistSubmit,
    handleChange,
    handleBlur,
    disabledSubmit,
    loadingSubmit,
  } = useValidationBlacklist({
    setError,
    trigger,
    getValues,
    clearErrors,
    errors: formState.errors,
    fieldNames,
  });

  const handleClose = useCallback(() => {
    resetField(FAQReportToFormFields.userEmail);
    resetField(FAQReportToFormFields.comment);
    onClose?.();
  }, [onClose]);

  const onSubmit = async ({ comment, userEmail }: FaqFormData) => {
    const extraParams: {
      category?: ReportFAQProblemRequest,
      question?: ReportFAQProblemRequest
    } = {
      ...(category && { category: { id: category.id, name: category.name } }),
      ...(question && { question: { id: question.id, name: question.question } }),
    };

    await mutationCreateQuestion({ userEmail, comment, ...extraParams })
      .unwrap()
      .then((res) => {
        if (res) {
          handleClose();
          showSimpleDialogModal();
        }
      });
  };

  useEffect(() => {
    if (query?.category) {
      getFAQCategoryById({ categoryId: query?.category as string, code: i18n.language });
    }
  }, [i18n.language, query?.category]);

  useEffect(() => {
    if (query?.id) {
      getFAQAnswer({ id: query?.id as string, code: i18n.language });
    }
  }, [query?.id, i18n.language]);

  useEffect(() => {
    resetField(FAQReportToFormFields.userEmail);
    resetField(FAQReportToFormFields.comment);
  }, [resetField]);

  const props = {
    handleBlacklistSubmit,
    disabledSubmit,
    loadingSubmit,
    handleChange,
    handleClose,
    handleBlur,
    visible,
    isMobile,
    onSubmit,
    control: control as unknown as Control<FieldValues>,
    email,
    id,
  };

  return (
    <>
      <ModalForm {...props} />
      {openModal && <SimpleDialogModal id={id} modalContent={modalContent} />}
    </>
  );
};
