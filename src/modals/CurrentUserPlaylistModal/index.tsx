import { FC } from 'react';

import clsx from 'clsx';
import { BaseModal } from 'rupor-ui-kit';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { ModalForm, PlaylistFormData } from './ModalForm';

type Props = {
  isOpen: boolean;
  title: string;
  submitButtonTitle: string;
  defaultValues: PlaylistFormData,
  isLoading?: boolean,
  handleOnSubmit: (data: PlaylistFormData) => void;
  // handleOnCancel: () => void;
  handleOnClose: () => void;
  dti?: string
  playlistId?: string
};

export const CurrentUserPlaylistModal: FC<Props> = ({
  isOpen,
  title,
  submitButtonTitle,
  defaultValues,
  isLoading = false,
  handleOnSubmit,
  handleOnClose,
  dti,
  playlistId = '',
}) => {
  const { isMobile } = useIsMobile();
  const id = playlistId && `_${playlistId}`;

  return (
    <BaseModal.Wrapper
      data-testid={`${dti}-wrapper${id}`}
      className={clsx(!isMobile && 'modal-close-icon-alignment')}
      onClose={handleOnClose}
      ariaLabelledby={title}
      open={isOpen}
    >
      <BaseModal.Header>
        <BaseModal.Title
          dti={`${dti}-${id}`}
        >
          {title}
        </BaseModal.Title>
      </BaseModal.Header>

      <BaseModal.Content
        className="min-w-[min(80vw,480px)] mx-auto"
      >
        <ModalForm
          dti={dti}
          id={playlistId}
          submitButtonTitle={submitButtonTitle}
          isLoading={isLoading}
          defaultValues={defaultValues}
          onSubmit={handleOnSubmit}
          onCancel={handleOnClose}
        />
      </BaseModal.Content>
    </BaseModal.Wrapper>
  );
};
