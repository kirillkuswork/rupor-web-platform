import { useLogout } from '@/features/Auth/LoginModal/hooks/useLogout';
import { APP_PATHS_PAGES } from '@/shareds/constants/paths';
import { TDropdownOption } from '@/shareds/ui/Dropdown/types';
import { NewSettingsIcon, OptionRutubeIcon, SignOutIcon } from 'rupor-ui-kit';
import { useCallback, useMemo } from 'react';
import { useRefreshDataAfterLogout } from '@/shareds/hooks/useRefreshDataAfterLogout';

type Props = {
  onCancel: () => void;
};

export const useGetDropdownOptions = ({ onCancel }: Props) => {
  const { mutationAuthLogout } = useLogout();
  const callback = useRefreshDataAfterLogout();

  const handleLogout = useCallback(async (): Promise<void> => {
    onCancel();
    await mutationAuthLogout();
    callback?.();
  }, [mutationAuthLogout, onCancel]);

  const commonOptions: TDropdownOption[] = useMemo(
    () => [
      {
        icon: <OptionRutubeIcon />,
        label: 'Rupor_Studio',
        href: window?.__APP_ENV__?.STUDIO_URL,
        isTargetOutside: true,
      },
      {
        icon: <NewSettingsIcon color="#BEBEBE" />,
        label: 'Common_settings',
        href: APP_PATHS_PAGES.settings,
        isUnderlined: true,
      },
      {
        icon: <SignOutIcon color="#BEBEBE" width={22} height={22} />,
        label: 'Common_exit',
        onClick: handleLogout,
      },
    ],
    [handleLogout],
  );

  return commonOptions;
};
