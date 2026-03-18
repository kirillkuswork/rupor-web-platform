import { TAgeRating } from '@/shareds/types/ageRating';
import { TDropdownOption } from '@/shareds/ui/Dropdown/types';
import { TUploadingSource } from '@/redux/services/video/baseModel';

export type TVideoCardVariants = 'vertical' | 'horizontal';

type TChangeState = (newState: Partial<IVideoCardWithDetailsProps>) => void;

export type TVideoAction = TDropdownOption;

export interface IGetActions {
  videoData: IVideoCardWithDetailsProps
  changeState?: TChangeState
}

export type TGetActions = (data: IGetActions) => TVideoAction[];

export interface IVideoCardWithDetailsProps {
  /* Идентификатор канала */
  channelId?: string;
  /* Ссылка на логотип канала */
  channelLogo?: string;
  /* Название канала */
  channelTitle?: string;
  /* Количество просмотров */
  viewsCount?: string;
  /* Дата удаления видеоролика */
  deletedAt?: string;
  /* Дата публикации видеоролика */
  publishedAt?: string;
  /* Id видеоролика */
  videoId: string;
  /* Флаг показывать ли логотип канала */
  isShowChannelLogo?: boolean;
  /* Класс на контейнер */
  className?: string;
  /* Флаг добавлен ли видеоролик в плейлист Смотреть позже */
  watchLater?: boolean
  /* Флаг добавлен ли видеоролик в плейлист Сохраненные */
  saved?: boolean
  /* Показывать ли кнопку Добавить/Удалить в/из плейлиста смотреть позже */
  isShowWatchLaterButton?: boolean
  /* Продолжительность видео в миллисекундах */
  duration?: number
  /* Ссылка на постер видеоролика */
  thumbnailUrl?: string
  /* Название видеоролика */
  videoTitle: string;
  /* Ограничение по возрасту на просмотр видео */
  ageRating?: TAgeRating;
  /* Хендлер нажатия на кнопку смотреть позже */
  onWatchLaterClick?: () => void;
  /* Прогресс просмотра видеоролика пользователем */
  userViewProgress?: number;
  /* Вариант отображения карточки */
  variant?: TVideoCardVariants
  /* Время просмотра */
  viewedAt?: string;
  /* id плейлиста, в которое добавлено видео */
  playlistId?: string;
  /* data-testid */
  dti?: string;
  /* Источник, откуда было взято видео */
  uploadingSource?: TUploadingSource

  getVideoActions?: TGetActions

  parentIndex?: number

  index?: number

  contentListId?: string
}
