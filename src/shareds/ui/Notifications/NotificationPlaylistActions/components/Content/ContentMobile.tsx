import { FC, memo } from 'react';

type Props = {
  message: string;
};

export const NotificationPlaylistActionsContentMobile: FC<Props> = memo(({ message }) => (
  <div className="truncate">
    <span className="text-paragraph-m-s font-normal text-black">
      {message}
    </span>
  </div>
));

NotificationPlaylistActionsContentMobile.displayName = 'NotificationPlaylistActionsContentMobile';
