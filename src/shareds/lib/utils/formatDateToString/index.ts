import { type TFunction } from 'i18next';

export const formatDateToString = ({ date, t }: { date: string, t: TFunction }): string => {
  if (!date) {
    return '';
  }

  const newDate = new Date(date);

  const months = [
    'Date_Month_1',
    'Date_Month_2',
    'Date_Month_3',
    'Date_Month_4',
    'Date_Month_5',
    'Date_Month_6',
    'Date_Month_7',
    'Date_Month_8',
    'Date_Month_9',
    'Date_Month_10',
    'Date_Month_11',
    'Date_Month_12',
  ];

  const day = String(newDate.getDate()).padStart(2, '0');
  const month = months[newDate.getMonth()];
  const year = newDate.getFullYear();

  return `${day} ${t(month)} ${year}`;
};
