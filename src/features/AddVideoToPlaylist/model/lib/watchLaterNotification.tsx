import { Notification, Preview } from 'rupor-ui-kit';

interface IWatchLaterNotification {
  preview: string,
  actionType: 'add' | 'remove',
  dti?: string,
  text: string;
  videoId: string;
}

export const watchLaterNotification = ({
  preview,
  actionType,
  dti,
  text,
  videoId,
}: IWatchLaterNotification) => {
  Notification.add({
    containerClassName: 'dark:!bg-white',
    content: (
      <div className="flex items-center" data-testid={`${dti}_${actionType}`}>
        <Preview data-testid={`${dti}_preview`} id={videoId} className="h-10 mr-6 w-18" src={preview} />
        <div data-testid={`${dti}_text`} className="mr-6 text-black text-paragraph-l-m">
          {text}
        </div>
      </div>
    ),
  });
};
