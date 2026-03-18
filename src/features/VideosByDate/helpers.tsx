import { IVideo } from '@/redux/services/video/baseModel';

const day = 1000 * 60 * 60 * 24;

export type VideoData = {
  id: number;
  title: string,
  sorting: {
    min: number;
    max: number;
  },
  data: IVideo[],
  isLoading: boolean,
  videoCount?: number
};

const TIME_ZONE_OFFSET_FROM_MOSCOW = (180 + new Date().getTimezoneOffset()) * 60 * 1000;

const startOfDay = (date: Date): Date => {
  const localDate = new Date(date);
  localDate.setHours(0, 0, 0, 0);
  return localDate;
};

const DAY_FROM_START_MOSCOW = startOfDay(new Date()).getTime() - TIME_ZONE_OFFSET_FROM_MOSCOW;

export const timePeriods: VideoData[] = [
  {
    id: 1,
    title: 'Videos_By_Date_Time_Period_1',
    sorting: {
      min: new Date(DAY_FROM_START_MOSCOW).getTime(),
      max: new Date(DAY_FROM_START_MOSCOW + day).getTime(),
    },
    data: [],
    isLoading: true,
  },
  {
    id: 2,
    title: 'Videos_By_Date_Time_Period_2',
    sorting: {
      min: new Date(DAY_FROM_START_MOSCOW - day).getTime(),
      max: new Date(DAY_FROM_START_MOSCOW).getTime(),
    },
    data: [],
    isLoading: true,
  },
  {
    id: 3,
    title: 'Videos_By_Date_Time_Period_3',
    sorting: {
      min: new Date(DAY_FROM_START_MOSCOW - 6 * day).getTime(),
      max: new Date(DAY_FROM_START_MOSCOW - day).getTime(),
    },
    data: [],
    isLoading: true,
  },
  {
    id: 4,
    title: 'Videos_By_Date_Time_Period_4',
    sorting: {
      min: new Date(DAY_FROM_START_MOSCOW - 29 * day).getTime(),
      max: new Date(DAY_FROM_START_MOSCOW - 6 * day).getTime(),
    },
    data: [],
    isLoading: true,
  },
  {
    id: 5,
    title: 'Videos_By_Date_Time_Period_5',
    sorting: {
      min: 0,
      max: new Date(DAY_FROM_START_MOSCOW - 29 * day).getTime(),
    },
    data: [],
    isLoading: true,
  },
];

const todayAndYesterdayTimePeriods = [1, 2];

export const getTimePeriodsWithTitleDate = (currentLang: string) => (timePeriods.map((it) => {
  if (todayAndYesterdayTimePeriods.includes(it.id)) {
    return {
      ...it,
      title: `${it.title}, ${new Date(it.sorting.min).toLocaleString(currentLang, {
        month: 'long',
        day: 'numeric',
      })}`,
    };
  }

  return it;
}));
