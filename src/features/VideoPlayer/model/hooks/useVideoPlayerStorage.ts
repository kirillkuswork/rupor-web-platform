import { useSelector } from 'react-redux';
import { videoPlayerSelectors } from '@/redux/selectors/videoPlayerSelectors';
import { useEffect, useState } from 'react';
import { isEmptyObj } from '@/shareds/lib/helpers/isEmptyObj';
import { IMapKeyToData, localStorageHandler } from '@/shareds/lib/helpers/localStorageHandler';
import { useTranslation } from 'next-i18next';
import { TLanguages } from '@/entities/Video/model/types/videoPlayer';
import { PLAYER_PARAMS_LOCAL_STORAGE_KEY } from '@/shareds/constants/localStorage';

// Хук для обновления параметров в/из localStorage
export const useVideoPlayerStorage = (videoId: string) => {
  const currentPlayer = useSelector(videoPlayerSelectors.getVideoPlayerStateSelector(videoId));

  const players = useSelector(videoPlayerSelectors.getAllPlayers);

  const { i18n } = useTranslation();

  const [playerParams, setPlayerParams] = useState<{ time?: number, volume?: number }>({});

  // Забираем параметры из плеера
  useEffect(() => {
    if (!currentPlayer) return;
    const { playerInstance } = currentPlayer;

    playerInstance.subscribeToEvent('time_update', ({ currentTime }) => {
      setPlayerParams((prevState) => ({ ...prevState, time: currentTime }));
    });

    playerInstance.subscribeToEvent('volume_update', (volume) => {
      setPlayerParams((prevState) => ({ ...prevState, volume }));
    });
    return () => {
      setPlayerParams({});
    };
  }, [currentPlayer?.videoId]);

  // Получаем параметры из localStorage и сетаем в плеер
  useEffect(() => {
    if (!currentPlayer) return;
    const storageState = localStorageHandler.getValueFromStorage({ key: 'platformParams' });

    const storageVolumeValue = storageState?.playerVolume;

    if (!storageVolumeValue) return;

    currentPlayer.playerInstance.setVolume(storageVolumeValue);
  }, [currentPlayer?.videoId]);

  // Сетаем параметры в localStorage
  useEffect(() => {
    if (isEmptyObj(playerParams) || !currentPlayer) return;

    const { time = 0, volume = 1 } = playerParams;
    const payload: IMapKeyToData[typeof PLAYER_PARAMS_LOCAL_STORAGE_KEY] = {
      [videoId]: {
        time,
        date: Date.now(),
      },
    };
    localStorageHandler.updateValueToStorage({ key: 'playerParams', value: payload });

    localStorageHandler.updateValueToStorage({ key: 'platformParams', value: { playerVolume: volume } });
  }, [playerParams]);

  useEffect(() => {
    if (!players) return;
    players.forEach(({ playerInstance }) => {
      playerInstance?.setLanguage(i18n.language as TLanguages);
    });
  }, [i18n.language, players]);
};
