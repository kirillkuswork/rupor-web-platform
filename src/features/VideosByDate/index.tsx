import { useCallback, useMemo } from 'react';
import { IVideoCardWithDetailsProps, TGetActions, VideoList } from '@/entities/Video';
import { arrayRender } from '@/shareds/lib/helpers/arrayRender';
import { BlockHeaderInner } from 'rupor-ui-kit';
import { Paper } from '@/shareds';
import { useTranslation } from 'next-i18next';
import { getTimePeriodsWithTitleDate, VideoData } from './helpers';

type Props = {
  data: IVideoCardWithDetailsProps[];
  onEndReached?: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
  fromHistoryPage?: boolean;
  limit: number;
  dti?: string;
  getVideoActions?: TGetActions
};

const VideosByDate = (props: Props) => {
  const {
    data,
    isLoading,
    limit,
    fromHistoryPage,
    onEndReached,
    hasNextPage,
    dti,
    getVideoActions,
  } = props;
  const { t, i18n } = useTranslation();
  const videos = useMemo(() => {
    const totalItems = data.length || 0;

    const remainder = totalItems > limit ? totalItems % limit : 0;
    return data?.slice(0, totalItems - remainder) || [];
  }, [data, limit]);

  const currentLanguage = i18n.language;

  const videosByPeriod = useCallback(
    (timePeriod: VideoData) => videos.filter(({ publishedAt }) => {
      const publishedAtFormatted = new Date(publishedAt || 0).getTime();
      return (
        publishedAtFormatted > timePeriod.sorting.min
          && publishedAtFormatted <= timePeriod.sorting.max
      );
    }),
    [videos],
  );

  const historyVideosByPeriod = useCallback(
    (timePeriod: VideoData) => videos.filter(({ viewedAt }) => {
      const viewedAtFormatted = new Date(viewedAt || 0).getTime();
      return (
        viewedAtFormatted > timePeriod.sorting.min
          && viewedAtFormatted <= timePeriod.sorting.max
      );
    }),
    [videos],
  );

  const videosHandler = useMemo(
    () => (fromHistoryPage ? historyVideosByPeriod : videosByPeriod),
    [fromHistoryPage, videosByPeriod, historyVideosByPeriod],
  );

  const filteredPeriodsWithCount = useMemo(
    () => getTimePeriodsWithTitleDate(currentLanguage)
      ?.map((timePeriod) => {
        const videosInPeriod = videosHandler(timePeriod);
        return {
          ...timePeriod,
          data: videosInPeriod,
          videoCount: videosInPeriod.length,
        };
      })
      ?.filter((timePeriod) => timePeriod.videoCount > 0),
    [currentLanguage, videosHandler],
  );

  const videoItems = useCallback(
    (timePeriod: VideoData) => {
      const dataGrid = {
        hasNextPage,
        isLoading,
      };

      const timePeriodName = timePeriod.title.split(', ')[0];
      const dayName = timePeriod.title.split(', ')[1];

      return (
        <Paper data-testid={`${dti}-wrapper`} className="py-4.5 md:!p-4">
          <BlockHeaderInner.Title
            data-testid={`${dti}-title`}
            className="mb-4.5"
          >
            {dayName ? t(timePeriodName, { dayName }) : t(timePeriod.title)}
            <span
              data-testid={`${dti}-title-videos-count`}
              className="ml-3 font-semibold text-paragraph-m-s opacity-40"
            >
              {timePeriod?.videoCount}
              {' '}
              {t('Videos_By_Date_Video_Count')}
            </span>
          </BlockHeaderInner.Title>
          <VideoList.Grid
            dti={dti}
            key={timePeriod.title}
            data={timePeriod.data as unknown as IVideoCardWithDetailsProps[]}
            onEndReached={onEndReached}
            getVideoActions={getVideoActions}
            {...dataGrid}
          />
        </Paper>
      );
    },
    [hasNextPage, isLoading, dti, t, onEndReached, getVideoActions],
  );

  const { Element: VideosList } = arrayRender({
    items: filteredPeriodsWithCount,
    renderItem: videoItems,
  });

  return (
    <VideosList />
  );
};

export default VideosByDate;
