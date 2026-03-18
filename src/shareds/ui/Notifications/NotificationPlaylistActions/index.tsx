import {
  FC,
  memo,
  useEffect,
} from 'react';

import useIsMobile from '@/shareds/hooks/useIsMobile';
import { NotificationPlaylistActionsContentDesktop } from './components/Content/ContentDesktop';
import { NotificationPlaylistActionsContentMobile } from './components/Content/ContentMobile';

type NotificationPlaylistActionsProps = {
  message: string;
  handleOnClose?: () => void;
  id?: string
};

const NotificationPlaylistActionsComponent: FC<NotificationPlaylistActionsProps> = ({
  message,
  handleOnClose,
  id,
}) => {
  const { isMobile } = useIsMobile();

  useEffect(() => (() => {
    handleOnClose?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <div data-testid={`saved-playlist-notification-successfully-edited_${id}`} className="flex flex-row items-center dark:bg-white/0">
      {
        isMobile
          ? <NotificationPlaylistActionsContentMobile message={message} />
          : <NotificationPlaylistActionsContentDesktop id={id} message={message} />
      }
    </div>
  );
};

export const NotificationPlaylistActions = memo(NotificationPlaylistActionsComponent);
