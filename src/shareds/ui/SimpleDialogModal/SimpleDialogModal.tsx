import NiceModal, { useModal } from '@ebay/nice-modal-react';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useCallback } from 'react';
import clsx from 'clsx';
import { wrapHtml } from '@/shareds/lib/utils/wrapHtml';
import { BaseModal, Button } from 'rupor-ui-kit/dist';

export interface IModalContentType {
  title: string
  description: string
  buttonTitle: string
  dti?: string;
}

interface ISimpleDialogModalProps {
  modalContent: IModalContentType;
}

export const SimpleDialogModal = NiceModal.create<ISimpleDialogModalProps>((
  { modalContent },
) => {
  const { isMobile } = useIsMobile();
  const { remove, resolve, visible } = useModal();

  const closeModal = useCallback(<T extends never>(resolveData?: T) => {
    resolve(resolveData);
    remove();
  }, [remove, resolve]);
  const handleClose = useCallback(() => closeModal(), [closeModal]);

  return (
    <BaseModal.Wrapper
      className={clsx(
        !isMobile && 'max-w-[480px] modal-close-icon-alignment',
      )}
      onClose={handleClose}
      ariaLabelledby={modalContent?.title}
      open={visible}
      data-testid={`${modalContent.dti}-wraper`}
    >
      <BaseModal.Header>
        <BaseModal.Title
          className="!pr-0"
          dti={modalContent.dti}
        >
          {modalContent?.title}
        </BaseModal.Title>
        <BaseModal.SubTitle data-testid={`${modalContent.dti}-description`}>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={wrapHtml(modalContent?.description)} />
        </BaseModal.SubTitle>
      </BaseModal.Header>

      <BaseModal.Content
        className="min-w-[min(80vw,480px)] mx-auto"
      >
        <Button
          onClick={handleClose}
          fullWidth
          data-testid={`${modalContent.dti}-button`}
        >
          {modalContent?.buttonTitle}
        </Button>
      </BaseModal.Content>
    </BaseModal.Wrapper>
  );
});
