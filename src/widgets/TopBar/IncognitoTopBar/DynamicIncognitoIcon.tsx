import { useTranslation } from 'next-i18next';
import { IncognitaIcon } from 'rupor-ui-kit';

export const DynamicIncognitoIcon = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="bg-white backdrop-blur-xl w-44 rounded-md relative left[-36px] p-3 top-2 flex flex-col justify-center items-center">
        <p className="mx-0 my-1 font-bold text-center text-paragraph-l-m text-dark">{t('MainLayout_incognito')}</p>
        <p className="mx-0 my-1 text-center text-paragraph-l-m text-dark">{t('MainLayout_incognito_historyDontSave')}</p>
      </div>
      <div><IncognitaIcon className="absolute w-6 rounded-full top-7 left-12" /></div>
    </div>
  );
};
