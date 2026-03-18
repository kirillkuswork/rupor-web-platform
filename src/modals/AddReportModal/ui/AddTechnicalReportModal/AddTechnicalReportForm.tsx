import { useDialogModal } from '@/modals/DialogModal';
import { useAddTechnicalComplainMutation, useGetTechnicalComplainsQuery } from '@/redux/services/report';
import { TTechnicalComplainType } from '@/redux/services/report/responseModel';
import { useTranslation } from 'next-i18next';
import { ReportForm } from '../components/ReportForm';
import { useAddReportModal } from '../../model/hooks/useAddReportModalContext';
import { FormSubmitData } from '../../model/types/formSubmitData';

export const AddTechnicalReportForm = () => {
  const { modalState, closeModal } = useAddReportModal();

  const { t } = useTranslation();

  const modalContent = {
    title: t('Add_Technical_Report_Form_Title'),
    description: t('Add_Technical_Report_Form_Description'),
    buttonTitle: t('Add_Technical_Report_Form_Button_Title'),
    dti: 'technical-complain-modal',
  };

  const { openModal: openDialogModal, setModalState: setDialogModalState } = useDialogModal();

  const { data, isLoading: isComplaintsLoading } = useGetTechnicalComplainsQuery();

  const [addTechnicalComplain, { isLoading }] = useAddTechnicalComplainMutation();

  const onSubmitHandler = async (valuesForm: FormSubmitData<TTechnicalComplainType>) => {
    const res = await addTechnicalComplain({
      videoId: modalState?.videoId,
      problems: valuesForm.complaints,
      comment: valuesForm.description,
      videoLink: document.location.href,
      userAgent: window.navigator.userAgent,
      // TODO:: Хранить мыло в стейте с пользователем
      userEmail: '',
    });

    if (res.data) {
      setDialogModalState({
        modalContent,
      });
      openDialogModal();
      closeModal();
    }
  };

  return (
    <ReportForm
      isButtonLoading={isLoading}
      onSubmit={onSubmitHandler}
      isLoading={isComplaintsLoading}
      complains={data?.items}
      dti={modalContent.dti}
    />
  );
};
