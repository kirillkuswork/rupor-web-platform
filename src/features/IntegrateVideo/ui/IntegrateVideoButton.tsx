import { useIntegrateVideoModal } from '@/modals/IntegrateVideoModal';
import { ArrowsXIcon } from 'rupor-ui-kit';
import { useTranslation } from 'next-i18next';

interface IIntegrateVideoButtonProps {
  onClick?: () => void;
  onCancel?: () => void;
}

export const IntegrateVideoButton = ({ onClick, onCancel }: IIntegrateVideoButtonProps) => {
  const { openModal, setModalState } = useIntegrateVideoModal();

  const { t } = useTranslation();

  const onClickHandler = () => {
    onClick?.();
    openModal();
    setModalState({
      onCancel,
    });
  };

  return (
    <button
      type="button"
      onClick={onClickHandler}
      className="flex-col items-center justify-center ml-6 font-thin text-paragraph-s"
      data-testid="integrate-video-button"
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-colorGrey"
      >
        <ArrowsXIcon className="w-7 h-7" />
      </div>
      <span className="block mt-1 text-grey">
        {t('Modal_Share_Video_Embed')}
      </span>
    </button>
  );
};
