import { FC, memo } from 'react';

import clsx from 'clsx';
import {
  BaseModal,
  Button,
} from 'rupor-ui-kit';
import useIsMobile from '@/shareds/hooks/useIsMobile';

type Props = {
  title?: string,
  subTitle?: string,
  submitButtonLabel: string,
  cancelButtonLabel: string,
  isOpen: boolean,
  isLoading?: boolean,
  handleOnSubmit: () => void,
  handleOnCancel: () => void,
  handleOnClose: () => void,
  dti?: string
  playlistId?: string
};

export const ConfirmationModal: FC<Props> = memo(({
  title,
  subTitle,
  submitButtonLabel,
  cancelButtonLabel,
  isOpen,
  isLoading = false,
  handleOnSubmit,
  handleOnCancel,
  handleOnClose,
  dti,
  playlistId,
}) => {
  const { isMobile } = useIsMobile();

  return (
    <BaseModal.Wrapper
      data-testid={`${dti}-wrapper_${playlistId}`}
      className={clsx(!isMobile && 'max-w-[480px] modal-close-icon-alignment')}
      onClose={handleOnClose}
      ariaLabelledby={title}
      open={isOpen}
    >
      <BaseModal.Header>
        <BaseModal.Title
          dti={`${dti}_${playlistId}`}
          style={{ wordBreak: 'break-word' }}
        >
          {title}
        </BaseModal.Title>
        {subTitle && (
          <BaseModal.SubTitle data-testid={`${dti}-subtitle_${playlistId}`}>
            {subTitle}
          </BaseModal.SubTitle>
        )}
      </BaseModal.Header>
      <BaseModal.Content
        className="min-w-[min(80vw,480px)] mx-auto"
      >
        <div
          className="flex justify-between md:flex-col md:flex-col-reverse"
        >
          <Button
            data-testid={`${dti}-cancel-button_${playlistId}`}
            label={cancelButtonLabel}
            className="mr-4"
            variant="secondary"
            onClick={handleOnCancel}
            fullWidth
          />
          <Button
            data-testid={`${dti}-submit-button_${playlistId}`}
            label={submitButtonLabel}
            className="md:mb-4"
            onClick={handleOnSubmit}
            disabled={isLoading}
            loading={isLoading}
            fullWidth
          />
        </div>
      </BaseModal.Content>
    </BaseModal.Wrapper>
  );
});

ConfirmationModal.displayName = 'ConfirmationModal';
