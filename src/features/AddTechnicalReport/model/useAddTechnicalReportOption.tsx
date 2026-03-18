import { IGetActions, TVideoAction } from '@/entities/Video';
import { useTranslation } from 'next-i18next';
import { WrenchIcon } from 'rupor-ui-kit';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useAddReportModal } from '../../../modals/AddReportModal';

export const useAddTechnicalReportOption = ({ videoData }: IGetActions): TVideoAction => {
  const { isAuth } = useSelector(selectors.userSelector);

  const { setModalState, openModal } = useAddReportModal();

  const { t } = useTranslation();

  const label = t('Video_Option_Report_Tech');

  const addReportHandler = () => {
    if (!isAuth) return;
    setModalState({ videoId: videoData.videoId, modalType: 'technicalComplain' });
    openModal();
  };

  return {
    label,
    icon: <WrenchIcon />,
    onClick: addReportHandler,
  };
};
