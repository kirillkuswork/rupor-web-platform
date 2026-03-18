import { playlistActions } from '@/redux/actions/playlistActions';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useMobileDropdownActionsModal = (channelOwnerId: string) => {
  const { isMobile } = useIsMobile();

  const { user } = useSelector(selectors.userSelector);
  const currentUserId = user?.id;

  const isVisible = useMemo(() => {
    if (!channelOwnerId || !currentUserId) {
      return false;
    }

    if (currentUserId !== channelOwnerId) {
      return false;
    }

    return true;
  }, [channelOwnerId, currentUserId]);

  const { isMobileDropdownOpen } = useSelector(selectors.playlistSelector);
  const { setIsMobileDropdownOpen } = useActions(playlistActions);

  const handleOpenMobileDropdown = () => {
    if (!isMobile) {
      return;
    }

    setIsMobileDropdownOpen(true);
  };

  const handleCloseMobileDropdown = () => setIsMobileDropdownOpen(false);

  return {
    isVisible,
    isMobileDropdownOpen,
    handleOpenMobileDropdown,
    handleCloseMobileDropdown,
  };
};
