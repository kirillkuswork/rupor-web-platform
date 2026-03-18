import {
  useCallback,
  useState,
  memo,
  FC,
} from 'react';

import { Button } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

type Props = {
  onClick: () => void;
};

export const NotificationPlaylistActionsButton: FC<Props> = memo(({
  onClick,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { t } = useTranslation();
  const handleOnClick = useCallback(() => {
    setIsDisabled(true);
    onClick();
  }, [onClick]);

  return (
    <div className="w-[102px]">
      <Button
        variant="tertiary"
        className="dark:!text-black dark:!border-black/10 hover:dark:!border-black/20"
        label={t('Notification_Playlist_Actions_Button_Label')}
        onClick={handleOnClick}
        loading={isDisabled}
        disabled={isDisabled}
        fullWidth
      />
    </div>
  );
});

NotificationPlaylistActionsButton.displayName = 'NotificationPlaylistActionsButton';
