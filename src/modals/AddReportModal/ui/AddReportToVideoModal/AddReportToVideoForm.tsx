import { useDialogModal } from '@/modals/DialogModal';
import { useAddVideoComplainMutation, useGetVideoComplainsQuery } from '@/redux/services/report';
import { TVideoComplainType } from '@/redux/services/report/responseModel';
import { useTranslation } from 'next-i18next';
import { ReportForm } from '../components/ReportForm';
import { useAddReportModal } from '../../model/hooks/useAddReportModalContext';
import { FormSubmitData } from '../../model/types/formSubmitData';

export const AddReportToVideoForm = () => {
  const { modalState, closeModal } = useAddReportModal();
  const { t } = useTranslation();

  const modalContent = {
    title: t('Report_Form_Title'),
    description: t('Report_Form_Description'),
    buttonTitle: t('Report_Form_Button_Title'),
    dti: 'content-complain-modal',
  };

  const { openModal: openDialogModal, setModalState: setDialogModalState } = useDialogModal();

  const { data, isLoading: isComplaintsLoading } = useGetVideoComplainsQuery();

  const [addVideoComplain, { isLoading }] = useAddVideoComplainMutation();

  const onSubmitHandler = async (valuesForm: FormSubmitData<TVideoComplainType>) => {
    const res = await addVideoComplain({
      videoId: modalState?.videoId,
      complaints: valuesForm.complaints,
      comment: valuesForm.description,
    }).unwrap();
    if (res) {
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
