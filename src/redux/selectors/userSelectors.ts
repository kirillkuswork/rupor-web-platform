import { AppStateType } from '@/redux/store/store';

export const userSelector = (state: AppStateType) => state.user;
