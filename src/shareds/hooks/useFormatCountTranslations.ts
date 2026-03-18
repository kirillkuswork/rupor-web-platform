import { useTranslation } from 'next-i18next';

export const useFormatCountTranslations = () => {
  const { t } = useTranslation();

  const viewsDeclensions = [
    t('Views_Count_Option_1'),
    t('Views_Count_Option_2'),
    t('Views_Count_Option_3'),
  ];
  const subsDeclensions = [
    t('Subscribers_Count_Option_1'),
    t('Subscribers_Count_Option_2'),
    t('Subscribers_Count_Option_3'),
  ];
  const answersDeclensions = [
    t('Answers_Count_Option_1'),
    t('Answers_Count_Option_2'),
    t('Answers_Count_Option_3'),
  ];

  return { viewsDeclensions, subsDeclensions, answersDeclensions };
};
