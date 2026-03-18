import useIsMobile from '@/shareds/hooks/useIsMobile';
import clsx from 'clsx';
import { wrapHtml } from '@/shareds/lib/utils/wrapHtml';
import { BaseModal, Button } from 'rupor-ui-kit';
import { useDialogModal } from '../model/hooks/useDialogModal';

export const DialogModal = () => {
  const { isMobile } = useIsMobile();

  const { closeModal, isModalOpen, modalState } = useDialogModal();

  if (!isModalOpen || !modalState) return null;

  const { modalContent } = modalState;

  return (
    <BaseModal.Wrapper
      className={clsx(
        '!bg-black-old',
        !isMobile && 'max-w-[480px] modal-close-icon-alignment',
      )}
      onClose={closeModal}
      ariaLabelledby={modalContent?.title}
      open={isModalOpen}
      data-testid={`${modalContent?.dti}-wraper`}
    >
      <BaseModal.Header>
        <BaseModal.Title
          className="!pr-0"
          dti={modalContent?.dti}
        >
          {modalContent?.title}
        </BaseModal.Title>
        <BaseModal.SubTitle data-testid={`${modalContent?.dti}-description`}>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={wrapHtml(modalContent?.description ?? '')} />
        </BaseModal.SubTitle>
      </BaseModal.Header>

      <BaseModal.Content
        className="min-w-[min(80vw,480px)] mx-auto"
      >
        <Button
          onClick={closeModal}
          fullWidth
          data-testid={`${modalContent?.dti}-button`}
        >
          {modalContent?.buttonTitle}
        </Button>
      </BaseModal.Content>
    </BaseModal.Wrapper>
  );
};
