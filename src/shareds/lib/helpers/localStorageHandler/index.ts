import { PLATFORM_PARAMS_KEY, PLAYER_PARAMS_LOCAL_STORAGE_KEY } from '@/shareds/constants/localStorage';

type TStorageKeys = typeof PLAYER_PARAMS_LOCAL_STORAGE_KEY | typeof PLATFORM_PARAMS_KEY;

export interface IMapKeyToData {
  [PLAYER_PARAMS_LOCAL_STORAGE_KEY]?: Record<string, {
    time: number
    date: number
  }>
  [PLATFORM_PARAMS_KEY]?: {
    isAdult?: boolean
    playerVolume?: number
  }
}

interface ILocalStorageHandler<T extends TStorageKeys> {
  key: T;
  value: IMapKeyToData[T]
}

export const localStorageHandler = {
  /* Метод для сеттинга новых значений в localStorage */
  setValueToStorage<T extends TStorageKeys>({ key, value }: ILocalStorageHandler<T>) {
    const stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  },
  /* Метод для обновления существующих значений в localStorage */
  updateValueToStorage<T extends TStorageKeys>({ key, value }: ILocalStorageHandler<T>) {
    const prevValue = this.getValueFromStorage({ key });
    const formatValue = prevValue ? { ...prevValue, ...value } : value;
    this.setValueToStorage({ key, value: formatValue });
  },
  /* Метод для получения значений из localStorage */
  getValueFromStorage<T extends TStorageKeys>({ key }: { key: T }): IMapKeyToData[T] | undefined {
    const value = localStorage.getItem(key);
    if (!value) return;
    return JSON.parse(value);
  },
};
