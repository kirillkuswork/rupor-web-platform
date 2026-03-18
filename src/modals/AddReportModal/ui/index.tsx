import { AddTechnicalReportModal } from './AddTechnicalReportModal/AddTechnicalReportModal';
import { useAddReportModal } from '../model/hooks/useAddReportModalContext';
import { AddReportToVideoModal } from './AddReportToVideoModal/AddReportToVideoModal';

export const AddReportModal = () => {
  const { isModalOpen, modalState } = useAddReportModal();

  if (!isModalOpen) return null;

  switch (modalState?.modalType) {
    case 'videoComplain':
      return <AddReportToVideoModal />;
    case 'technicalComplain':
      return <AddTechnicalReportModal />;
    default:
      return null;
  }
};
