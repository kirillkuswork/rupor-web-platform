import { Notification, Preview } from 'rupor-ui-kit';

interface IPlaylistNotification {
  preview: string,
  actionType: 'add' | 'remove',
  videoId: string,
  text?: string,
}

export const playlistNotification = ({
  preview,
  actionType,
  videoId,
  text = '',
}: IPlaylistNotification) => {
  Notification.add({
    containerClassName: 'dark:!bg-white',
    content: (
      <div className="max-w-[375px] md:max-w-none flex items-center">
        <Preview id={videoId} className="h-10 mr-6 min-w-18" src={preview} />
        <div
          data-testid={`saved-playlist-slider-notification-${actionType === 'add' ? 'added-to-saved' : 'removed-from-saved'}`}
          className="mr-2 text-black truncate text-paragraph-l-m"
        >
          {text}
        </div>
      </div>
    ),
    duration: 3000,
    dti: `saved-playlist-notification-${actionType === 'add' ? 'added-to-saved' : 'removed-from-saved'}_${videoId}`,
  });
};
