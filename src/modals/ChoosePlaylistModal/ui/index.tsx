import { ChoosePlaylistModalContent } from '@/modals/ChoosePlaylistModal/ui/ChoosePlaylistModalContent';
import clsx from 'clsx';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { BaseModal } from 'rupor-ui-kit/dist';
import { useChooseUserPlaylistModal } from '@/modals/ChoosePlaylistModal';

export const ChoosePlaylistModal = () => {
  const { isModalOpen, closeModal } = useChooseUserPlaylistModal();
  const { isMobile } = useIsMobile();

  if (!isModalOpen) return null;

  return (
    <BaseModal.Wrapper
      className={clsx(!isMobile && 'max-w-[480px]', 'modal-close-icon-alignment')}
      onClose={closeModal}
      open={isModalOpen}
    >
      <ChoosePlaylistModalContent />
    </BaseModal.Wrapper>
  );
};
