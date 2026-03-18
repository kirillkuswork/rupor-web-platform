import { FC, memo } from 'react';

type Props = {
  message: string;
  id?: string
};

export const NotificationPlaylistActionsContentDesktop: FC<Props> = memo(({ message, id }) => (
  <div className="max-w-[375px] truncate">
    <span
      data-testid={`saved-playlist-notification-successfully-edited-text_${id}`}
      className="text-paragraph-l-m font-normal text-black"
    >
      {message}
    </span>
  </div>
));

NotificationPlaylistActionsContentDesktop.displayName = 'NotificationPlaylistActionsContentDesktop';
