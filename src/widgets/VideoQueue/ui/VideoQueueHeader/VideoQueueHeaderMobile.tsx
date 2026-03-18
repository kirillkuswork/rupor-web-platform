import { TrashIcon } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

interface IVideoQueueHeaderMobileProps {
  currentVideoIndex: number
  videoQueueLength: number
  onDeleteQueueHandler: () => void
}

export const VideoQueueHeaderMobile = ({ currentVideoIndex, videoQueueLength, onDeleteQueueHandler }: IVideoQueueHeaderMobileProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <span className="text-[18px] font-bold pr-3">{t('Video_Queue_Header_Mobile_Title')}</span>
        <span className="text-[12px] font-semibold text-[rgba(255,255,255,.4)]">
          {`${currentVideoIndex}/${videoQueueLength}`}
        </span>
      </div>
      <div className="cursor-pointer" onClick={onDeleteQueueHandler}>
        <TrashIcon color="#767678" />
      </div>
    </div>
  );
};
