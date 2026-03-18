import { IGetActions, TVideoAction } from '@/entities/Video';
import { useTranslation } from 'next-i18next';
import { AnnotationInfoIcon } from 'rupor-ui-kit';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { useAddReportModal } from '../../../modals/AddReportModal';
import { useAuthWarning } from '@/shareds/hooks/useAuthWarning';

export const useAddReportToVideoOption = ({
  videoData,
}: IGetActions): TVideoAction => {
  const { isAuth } = useSelector(selectors.userSelector);

  const { setModalState, openModal } = useAddReportModal();

  const { t } = useTranslation();

  const { openAuthWarning } = useAuthWarning();

  const label = t('Video_Option_Report');

  const addReportHandler = () => {
    if (!isAuth) {
      openAuthWarning(
        t('Video_Option_Report_Warning_Not_Auth'),
        'not-auth-add-subscribe',
      );

      return;
    }
    setModalState({ videoId: videoData.videoId, modalType: 'videoComplain' });
    openModal();
  };

  return {
    label,
    icon: <AnnotationInfoIcon opacity={0.7} />,
    onClick: addReportHandler,
  };
};
