import { useTranslation } from 'next-i18next';
import { saveInBuffer } from '@/shareds/lib/utils/saveInBuffer';
import {
  Button, CloseIcon, Modal, TextArea,
} from 'rupor-ui-kit';
import { isBrowser } from '@/shareds/lib/utils/isBrowser';
import { buildPathWithQueryParams } from '@/shareds/lib/helpers/buildPathWithQueryParams';
import { useIntegrateVideoModal } from '../model/hooks/useIntegrateVideoModalContext';

const getIFrameVideoLink = () => {
  const currentLink = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);

  const videoId = currentLink.split('/')?.[2];
  const startTime = searchParams.get('t');

  return buildPathWithQueryParams(`${window.location.origin}/embed`, {
    content: 'player',
    id: videoId,
    t: startTime,
  });
};

export const IntegrateVideoModal = () => {
  const { t } = useTranslation();

  const { isModalOpen, closeModal, modalState } = useIntegrateVideoModal();

  const videoLink = isBrowser ? getIFrameVideoLink() : '';

  const prepareIframeVideoLink = isBrowser ? `<iframe width="384" height="200" src="${videoLink}" title="Rupor video player" frameborder="0" allow=gyroscope; picture-in-picture" allowfullscreen></iframe>` : '';

  const handleSaveLinkInBuffer = () => {
    saveInBuffer(t('Modal_Share_Video_BufferedLink'), prepareIframeVideoLink);
  };

  const goBackHandler = () => {
    closeModal();
    modalState?.onCancel?.();
  };

  return (
    <Modal open={isModalOpen} onClose={closeModal}>
      <div className="flex-col p-12 bg-black-old rounded-lg w-[480px] ">
        <div className="flex items-center justify-between mb-10">
          <span className="font-bold text-paragraph-x-l">{t('Modal_Share_Will_Embed_Video')}</span>
          <CloseIcon
            className="w-5 h-5 cursor-pointer text-grey"
            onClick={closeModal}
          />
        </div>
        <iframe
          title="Rupor video player"
          src={`${videoLink}&autoplay=off`}
          width={384}
          height={200}
          frameBorder="0"
          allow="gyroscope"
          allowFullScreen
        />
        <div className="cursor-pointer mt-7">
          <TextArea
            label={t('Modal_Share_Embed_Code')}
            inputClassName="h-[152px] w-[384px]"
            value={prepareIframeVideoLink}
          />
        </div>
        <div className="flex justify-between mt-8">
          <Button onClick={goBackHandler} className="bg-black w-[184px] h-[42px]" variant="tertiary">
            {t('Modal_Share_GoBack')}
          </Button>
          <Button onClick={handleSaveLinkInBuffer} className="w-[184px] h-[42px]">
            {t('Modal_Share_Copy')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
