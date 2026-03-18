import { MobileDropdown } from '@/shareds/ui/Dropdown';
import { TDropdownOption } from '@/shareds/ui/Dropdown/types';
import { FC, memo } from 'react';
import { PenIcon, TrashIcon } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

type Props = {
  isOpen: boolean;
  handleOnClose: () => void;
  handleEditMenuClick: () => void;
  handleDeleteMenuClick: () => void;
};

export const PlaylistByIdMobileDropdown: FC<Props> = memo(({
  isOpen,
  handleOnClose,
  handleEditMenuClick,
  handleDeleteMenuClick,
}) => {
  const handleMenuClickProxy = (fn: () => void) => () => {
    fn();
    handleOnClose();
  };
  const { t } = useTranslation();

  const options: TDropdownOption[] = [
    {
      onClick: handleMenuClickProxy(handleEditMenuClick),
      // TODO: translate
      label: t('Playlist_By_Id_Mobile_Dropdown_Options_Edit'),
      icon: <PenIcon color="grey" />,
    },
    {
      onClick: handleMenuClickProxy(handleDeleteMenuClick),
      // TODO: translate
      label: t('Playlist_By_Id_Mobile_Dropdown_Options_Delete'),
      icon: <TrashIcon color="grey" />,
    },
  ];

  return (
    <MobileDropdown
      options={options}
      isOpen={isOpen}
      onCancel={handleOnClose}
    />
  );
});

PlaylistByIdMobileDropdown.displayName = 'PlaylistByIdMobileDropdown';
