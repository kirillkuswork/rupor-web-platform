import { saveInBuffer } from '@/shareds/lib/utils/saveInBuffer';
import {
  CloseIcon, CopyIcon, Input, Modal,
} from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';
import {
  ShareOK, ShareTelegram, ShareVK, ShareWhatsApp,
} from '@/features/ShareVideo';
import { IntegrateVideoButton } from '@/features/IntegrateVideo';
import { useShareVideoModal } from '../model/useShareVideoModalContext';

export const ShareVideoModal = () => {
  const { t } = useTranslation();

  const {
    isModalOpen, closeModal, modalState, openModal, setModalState,
  } = useShareVideoModal();

  if (!modalState?.videoData) return null;

  const prepareVideoLink = window.location.href;

  const { videoData } = modalState;

  const handleSaveLinkInBuffer = () => {
    saveInBuffer(t('Modal_Share_Video_BufferedLink'), prepareVideoLink);
  };

  const integrateButtonClickHandler = () => {
    closeModal();
  };

  const integrateButtonCancelHandler = () => {
    openModal();
    setModalState(modalState);
  };

  return (
    <Modal onClose={closeModal} open={isModalOpen}>
      <div className="flex-col p-6 bg-black-old rounded-lg w-96 ">
        <div className="flex justify-between items-center mb-3.5">
          <span
            data-testid="share-modal-title"
            className="font-bold text-paragraph-xl"
          >
            {t('Modal_Share_Video_Title')}
          </span>
          <CloseIcon
            data-testid="share-modal-icon"
            className="w-5 h-5 cursor-pointer text-grey"
            onClick={closeModal}
          />
        </div>
        <div className="flex justify-start mb-4">
          <ShareTelegram videoTitle={videoData.videoTitle} />
          <ShareOK
            videoTitle={videoData.videoTitle}
            videoImage={videoData.thumbnailUrl}
          />
          <ShareVK />
          <ShareWhatsApp />
          <IntegrateVideoButton
            onClick={integrateButtonClickHandler}
            onCancel={integrateButtonCancelHandler}
          />
        </div>
        <div className="cursor-pointer" onClick={handleSaveLinkInBuffer}>
          <Input
            data-testid="video-copy-input"
            label={t('Modal_Share_Link_Video')}
            inputClassName="w-90 !h-16"
            value={window.location.href}
            postfix={<CopyIcon className="text-grey" />}
          />
        </div>
      </div>
    </Modal>
  );
};
