import { TPlayerMetric } from './metrics';
import { TPlaybackStates } from './playbackStates';

export type TAutoplayValues = 'off' | 'on' | 'only_with_sound' | 'only_without_sound' | 'unknown';

export type TUiDisplay = 0 | 1 | 2;

export type TApiProviders = 'RUPOR';

export type TLanguages = 'en' | 'ru';

export interface IPlayerOptions {
  /**
     * Автоплей:
     * on - по возможности со звуком, если нет то без звука
     * off - отключен
     * only_with_sound - только если возможно со звуком
     * only_without_sound - без звука
     */
  autoplay?: TAutoplayValues | '';
  /**
     * Отображение UI:
     * 0 - все контролы
     * 1 - скрыты контролы и часть заглушек, лоадер показывается
     * 2 - скрыты контролы и часть заглушек
     */
  ui?: TUiDisplay;
  /**
     * Старт с заданной секунды
     */
  start?: number | null;

  /** Параметр кликабельного взаимодействия с интерфейсом (плей/пауза, фуллскрин и т.д) */
  isClickDisabled: boolean;

  /**
     * Список функций плеера
     */
  features?: string[];
  /**
     * Включение дебаг режима
     */
  debug: boolean;

  /**
     * Идентификатор контейнера для рендера плеера
     */
  containerId: string;

  /**
     * Режим радио (шум)
     */
  audioMode?: boolean;

  /**
     * Провайдер
     */
  provider?: TApiProviders;
}

export interface IVideoSourceDto {
  /**
   * API провадер, строка с ключем провайдера или может быть быть пустым ''
   */
  provider: TApiProviders;
  /**
   * Если API провайдер неизвестен (пустая строка), передаётся ссылка на видео,
   * иначе, считаем, что передаётся строка-ID видеозаписи в системе переданного
   * API провайдера
   */
  src: string;
}

export type TEventTypes =
    'time_update'
    | 'loaded_meta_data'
    | 'video_element_created'
    | 'video_element_destruct'
    | 'initialize_quality'
    | 'buffer_appended'
    | 'video_ended'
    | 'volume_update'
    | 'video_playback_state';

export interface IEventTypesToData {
  'time_update': { currentTime: number; duration: number };
  'loaded_meta_data': boolean;
  'video_element_created': boolean;
  'video_element_destruct': boolean;
  'initialize_quality': (number | undefined)[];
  'buffer_appended': number;
  'video_ended': boolean;
  'volume_update': number;
  'video_playback_state': Exclude<TPlaybackStates, 'initial' | 'ended'>;
}

export interface IVideoPlayerActions {
  play(): void
  pause(): void
  setVolume(volume: number): void
  mute(): void
  unMute(): void
  openFullscreen(): void
  closeFullscreen(): void
  setQuality(bitrate: number): void
  setCurrentTime(time: number): void
  setLanguage(language: TLanguages): void
  setMetricsTemplate(template: TPlayerMetric[]): void;
  subscribeToEvent: <T extends TEventTypes>(eventType: T, handler: (data: IEventTypesToData[T]) => void) => void
}

export interface IVideoPlayerInstance extends IVideoPlayerActions {
  create(options: IPlayerOptions): Promise<void>
  loadVideo(payload: IVideoSourceDto): void
  playerReload?: () => void
  destroy: () => void
}
