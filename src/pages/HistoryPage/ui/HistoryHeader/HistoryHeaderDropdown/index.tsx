/* eslint-disable jsx-a11y/control-has-associated-label */
import { playlistActions } from '@/redux/actions/playlistActions';
import { useDeleteHistoryVideosMutation } from '@/redux/services/playlist';
import { useActions } from '@/shareds/hooks/useActions';
import useIsMobile from '@/shareds/hooks/useIsMobile';
import { DesktopDropdown, MobileDropdown } from '@/shareds/ui/Dropdown';
import { TDropdownOption } from '@/shareds/ui/Dropdown/types';
import {
  FC,
  useCallback,
  useState,
} from 'react';

import {
  AdditionalHorizontalIcon,
  HVideoCard,
  Notification,
  TrashIcon,
} from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

type Props = {
  dti?: string
};

export const HistoryHeaderDropdown: FC<Props> = ({ dti }) => {
  const { isMobile } = useIsMobile();
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [deleteHistory] = useDeleteHistoryVideosMutation();
  const { setIsHistoryDeleted } = useActions(playlistActions);

  const handleDeleteHistory = useCallback(() => {
    deleteHistory().then((res) => {
      if (!res?.error) {
        Notification.add({
          content: t('History_Header_Dropdown_Notification_Success'),
          duration: 1500,
        });
      }
      if (res.error) {
        // TODO: переделать, когда починять запрос
        setIsHistoryDeleted(true);
        Notification.add({
          content: t('History_Header_Dropdown_Notification_Error'),
          duration: 1500,
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteHistory]);

  const options: TDropdownOption[] = [
    {
      label: t('History_Header_Dropdown_Option_Label'),
      icon: <TrashIcon />,
      onClick: handleDeleteHistory,
    },
  ];

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  if (isMobile) {
    <>
      <button
        type="button"
        onClick={handleOpen}
      >
        <AdditionalHorizontalIcon />
      </button>
      <MobileDropdown
        options={options}
        isOpen={isOpen}
        onCancel={handleClose}
      />
    </>;
  }

  return (
    <HVideoCard.DropdownMenu data-testid={dti} alwaysVisible>
      <DesktopDropdown dti={`${dti}-option`} options={options} />
    </HVideoCard.DropdownMenu>
  );
};
