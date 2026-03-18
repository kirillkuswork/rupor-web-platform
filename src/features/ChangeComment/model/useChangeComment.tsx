import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { selectors } from '@/redux/selectors';
import { PencilIcon } from 'primereact/icons/pencil';

export const useChangeComment = (setIsRedactorOpened?: (param: boolean) => void) => {
  const { isAuth } = useSelector(selectors.userSelector);

  const { t } = useTranslation();

  // TODO использовать переводчик
  const label = t('Change_Comment_Label_Edit');

  const addReportHandler = () => {
    if (!isAuth) return;
    setIsRedactorOpened?.(true);
  };

  return {
    label,
    icon: <PencilIcon />,
    onClick: addReportHandler,
  };
};
