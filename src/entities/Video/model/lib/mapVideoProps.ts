import { IVideo } from '@/redux/services/video/baseModel';
import { mapProps } from '@/shareds/lib/helpers/mapProps';
import { IVideoCardWithDetailsProps } from '../types/videoCardWithDetailsProps';

export const mapVideoProps = (videos: IVideo[]) => videos.map((item) => mapProps<IVideo, IVideoCardWithDetailsProps>(item, {
  videoId: (video) => video.id,
  channelId: (video) => video.channel?.id,
  channelLogo: (video) => video.channel?.logoUrl,
  channelTitle: (video) => video.channel?.title,
  watchLater: (video) => video.playlists?.watchLater,
  duration: (video) => video.duration,
  publishedAt: (video) => video.publishedAt,
  thumbnailUrl: (video) => video.thumbnail?.url,
  videoTitle: (video) => video.title,
  ageRating: (video) => video.ageRating || video.age,
  viewsCount: (video) => video.views?.count,
  viewedAt: (video) => video.viewedAt,
  saved: (video) => video.playlists?.saved,
  uploadingSource: (video) => video.uploadingSource,
}));
