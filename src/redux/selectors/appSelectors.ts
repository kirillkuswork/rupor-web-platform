import { AppStateType } from '@/redux/store/store';

export const appSelector = (state: AppStateType) => state.app;
