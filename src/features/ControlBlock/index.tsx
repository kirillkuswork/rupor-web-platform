/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  memo, useCallback, useMemo, useState,
} from 'react';

// import { setCookie } from 'cookies-next';
import { AdditionalHorizontalIcon, Button, PlusIcon } from 'rupor-ui-kit';

import useIsMobile from '@/shareds/hooks/useIsMobile';
import { MobileDropdown } from '@/shareds/ui/Dropdown';
import { TDropdownOption } from '@/shareds/ui/Dropdown/types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useAuthWarning } from '@/shareds/hooks/useAuthWarning';

export const ControlBlock = () => {
  const { isMobile } = useIsMobile();
  const { t } = useTranslation();

  const [isOpen, setOpen] = useState(false);

  const { isAuth } = useSelector(selectors.userSelector);
  const router = useRouter();
  const studioUrl = window?.__APP_ENV__?.STUDIO_URL;
  const goToCreateChannel = useCallback(() => {
    router.push(`${studioUrl}/?action=createChannel`);
  }, [router, studioUrl]);

  const { openAuthWarning } = useAuthWarning();

  const handleAddChannel = useCallback(() => {
    if (isAuth) {
      goToCreateChannel();
    } else {
      openAuthWarning(
        t('Create_Channel_Auth_Warning'),
        'channel-create',
      );
    }
  }, [isAuth, goToCreateChannel, openAuthWarning, t]);

  const options: TDropdownOption[] = useMemo(() => [
    {
      label: t('Control_Block_Create_Channel'),
      icon: <PlusIcon />,
      isTargetOutside: true,
      onClick: handleAddChannel,
    },
  ], [t, handleAddChannel]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return isMobile ? (
    <>
      <button
        type="button"
        onClick={handleOpen}
      >
        <AdditionalHorizontalIcon className="dark:text-white/40 text-dark/40 hover:dark:text-white" />
      </button>
      <MobileDropdown
        options={options}
        isOpen={isOpen}
        onCancel={handleClose}
      />
    </>
  ) : (
    <div className="flex">
      <Button
        data-testid="create-channel-button"
        onClick={handleAddChannel}
        className="ml-3"
        variant="primary"
        label={t('Control_Block_Create_Channel')}
        size="small"
      />
    </div>
  );
};

export default memo(ControlBlock);
