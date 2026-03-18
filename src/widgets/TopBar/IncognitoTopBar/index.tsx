import { appActions } from '@/redux/actions/appActions';
import { selectors } from '@/redux/selectors';
import { useActions } from '@/shareds/hooks/useActions';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { Button, IncognitaIcon, SmallCloseIcon } from 'rupor-ui-kit';

export const IncognitoTopBar = () => {
  const { t } = useTranslation();
  const { isIncognicoBarShown } = useSelector(selectors.appSelector);
  const { setIsIncognicoBarShown, setIsIncognitoMode } = useActions(appActions);

  const handleTurnOffIncognito = () => setIsIncognitoMode(false);
  const handleSkipIncognitoBanner = () => setIsIncognicoBarShown(false);

  if (!isIncognicoBarShown) {
    return null;
  }

  return (
    <div className="flex items-center justify-between h-12 bg-dark">
      <div className="inline-flex">
        <div className="mx-6 my-0"><IncognitaIcon /></div>
        <div className="mt-1 paragraph-l-m">
          {t('MainLayout_aboutIncognito')}
        </div>
      </div>
      <div className="inline-flex">
        <Button
          variant="outlined"
          label={t('MainLayout_setIncognitoModeFalse')}
          onClick={handleTurnOffIncognito}
        />
        <SmallCloseIcon className="ml-6 mr-3 cursor-pointer opacity-40" onClick={handleSkipIncognitoBanner} />
      </div>
    </div>
  );
};
