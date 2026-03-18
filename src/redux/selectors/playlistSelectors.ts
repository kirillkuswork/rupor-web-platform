import { AppStateType } from '@/redux/store/store';

export const playlistSelector = (state: AppStateType) => state.playlist;
