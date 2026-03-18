import clsx from 'clsx';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useTranslation } from 'next-i18next';
import { BaseModal } from 'rupor-ui-kit/dist';
import { AddReportToVideoForm } from './AddReportToVideoForm';
import { useAddReportModal } from '../../model/hooks/useAddReportModalContext';

export const AddReportToVideoModal = () => {
  const { isModalOpen, closeModal, modalState } = useAddReportModal();

  const { isMobile } = useIsMobile();

  const { t } = useTranslation();

  if (!modalState?.videoId) return null;

  return (
    <BaseModal.Wrapper
      className={clsx(
        !isMobile && 'modal-close-icon-alignment',
      )}
      onClose={closeModal}
      open={isModalOpen}
    >
      <BaseModal.Header>
        <BaseModal.Title dti="content-complain-modal">
          {t('Modal_Complain_Content_Title')}
        </BaseModal.Title>
        <BaseModal.SubTitle data-testid="content-complain-subtitle">
          {t('Modal_Complain_Content_Subtitle')}
        </BaseModal.SubTitle>
      </BaseModal.Header>

      <BaseModal.Content
        className="min-w-[min(80vw,480px)] mx-auto"
      >
        <AddReportToVideoForm />
      </BaseModal.Content>
    </BaseModal.Wrapper>
  );
};
