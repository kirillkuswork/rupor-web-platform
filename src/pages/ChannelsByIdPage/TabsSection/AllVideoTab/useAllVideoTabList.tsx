import { useEffect, useState } from 'react';
import { IVideoCardWithDetailsProps, mapVideoProps } from '@/entities/Video';
import { useLazyGetChannelVideosByIdQuery } from '@/redux/services/channels';
import { convertToNewSortType } from '@/shareds/lib/helpers/convertToNewSortType';
import { SortType } from '@/shareds/types/sortTypes';
import { IGetChannelVideosByIdRequest } from '@/redux/services/channels/requestModel';
import { IVideo } from '@/redux/services/video/baseModel';

interface IProps {
  limit?: number;
  channelId?: string;
  sortType?: SortType;
}

export const useAllVideoTabList = (props: IProps) => {
  const {
    channelId = '',
    limit = 20,
    sortType = 'SORT_DIRECTION_UNDEFINED',
  } = props;

  const [cursor, setCursor] = useState<string | null>(null);
  const [videos, setVideos] = useState<IVideoCardWithDetailsProps[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  const isLastPage = !cursor?.length;

  const requestPayload = {
    channelId,
    limit,
    cursor,
    sortPublishedAt: convertToNewSortType(sortType),
  } as IGetChannelVideosByIdRequest;

  const [getVideos, { isFetching, isError }] = useLazyGetChannelVideosByIdQuery();

  const loadInitialVideos = async () => {
    const res = await getVideos({
      channelId,
      limit: 20,
      sortPublishedAt: convertToNewSortType(sortType),
    });
    const videosWithChannel = (res?.data?.videos || []).map((video: IVideo) => ({
      ...video,
      channel: {
        ...video.channel,
        id: res?.data?.channel?.id,
        title: res.data?.channel?.title,
        logoUrl: res.data?.channel?.logoUrl,
      },
    }));
    const transformedVideos = mapVideoProps(videosWithChannel);
    setVideos(transformedVideos || []);
    setCursor(res?.data?.pagination?.cursor || null);
    setTotal(res?.data?.pagination?.total || null);
  };

  // Загрузка новых видео в конце страницы
  const onEndReached = async () => {
    if (!cursor || isFetching) return;
    const res = await getVideos(requestPayload);
    const videosWithChannel = (res?.data?.videos || []).map((video: IVideo) => ({
      ...video,
      channel: {
        ...video.channel,
        id: res?.data?.channel?.id,
        title: res.data?.channel?.title,
        logoUrl: res.data?.channel?.logoUrl,
      },
    }));
    const transformedVideos = mapVideoProps(videosWithChannel);
    setVideos((prevState) => [...prevState, ...(transformedVideos || [])]);
    setCursor(res?.data?.pagination?.cursor || null);
  };

  // Начальная загрузка списка видео
  useEffect(() => {
    loadInitialVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  return {
    videos,
    isFetching,
    isError,
    onEndReached,
    loadInitialVideos,
    total,
    isLastPage,
  };
};
