import { AppStateType } from '@/redux/store/store';

export const commentsSelector = (state: AppStateType) => state.comments;
