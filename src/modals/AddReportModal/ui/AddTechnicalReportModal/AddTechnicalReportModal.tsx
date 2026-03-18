import clsx from 'clsx';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useTranslation } from 'next-i18next';
import { BaseModal } from 'rupor-ui-kit/dist';
import { AddTechnicalReportForm } from './AddTechnicalReportForm';
import { useAddReportModal } from '../../model/hooks/useAddReportModalContext';

export const AddTechnicalReportModal = () => {
  const { isModalOpen, closeModal, modalState } = useAddReportModal();

  const { isMobile } = useIsMobile();

  const { t } = useTranslation();

  if (!modalState?.videoId) return null;

  return (
    <BaseModal.Wrapper
      className={clsx(!isMobile && 'modal-close-icon-alignment')}
      onClose={closeModal}
      open={isModalOpen}
    >
      <BaseModal.Header>
        <BaseModal.Title dti="technical-complain-modal">
          {t('Modal_Complain_Technical_Title')}
        </BaseModal.Title>
        <BaseModal.SubTitle data-testid="technical-complain-subtitle">
          {t('Modal_Complain_Technical_Subtitle')}
        </BaseModal.SubTitle>
      </BaseModal.Header>

      <BaseModal.Content className="min-w-[min(80vw,480px)] mx-auto">
        <AddTechnicalReportForm />
      </BaseModal.Content>
    </BaseModal.Wrapper>
  );
};
