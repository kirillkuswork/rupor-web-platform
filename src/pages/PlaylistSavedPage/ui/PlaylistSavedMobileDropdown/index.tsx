import { FC, memo, useCallback } from 'react';

import { useTranslation } from 'next-i18next';
import { PlusIcon } from 'rupor-ui-kit';
import { TDropdownOption } from '@/shareds/ui/Dropdown/types';
import { MobileDropdown } from '@/shareds/ui/Dropdown';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { playlistActions } from '@/redux/actions/playlistActions';
import { useCreateUserPlaylistModal } from '@/modals/CreateUserPlaylistModal';

export const PlaylistSavedMobileDropdown: FC = memo(() => {
  const { t } = useTranslation();
  const { isMobileDropdownOpen } = useSelector(selectors.playlistSelector);
  const { setIsMobileDropdownOpen } = useActions(playlistActions);
  const { openModal } = useCreateUserPlaylistModal();

  const handleOnClose = useCallback(() => setIsMobileDropdownOpen(false), [setIsMobileDropdownOpen]);

  const handleMenuClickProxy = (fn: () => void) => () => {
    fn();
    handleOnClose();
  };

  const options: TDropdownOption[] = [
    {
      onClick: handleMenuClickProxy(openModal),
      label: t('Common_Create_Playlist') as string,
      icon: <PlusIcon color="grey" />,
    },
  ];

  return (
    <MobileDropdown
      options={options}
      isOpen={isMobileDropdownOpen}
      onCancel={handleOnClose}
    />
  );
});

PlaylistSavedMobileDropdown.displayName = 'PlaylistSavedMobileDropdown';
