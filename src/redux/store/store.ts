import { configureStore, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import {
  authApi,
  categoryApi,
  channelsApi,
  commentsApi,
  faqApi,
  playlistApi,
  subscriptionsApi,
  videoApi,
} from '@/redux/services';
import { blacklistApi } from '@/redux/services/blacklist';
import { reportApi } from '@/redux/services/report';
import { baseApi } from '../services/baseApi';
import { reducersList } from './reducers';

const rootReducer = combineReducers(reducersList);

export type AppStateType = ReturnType<typeof rootReducer>;

const reducer = (
  state: AppStateType | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: PayloadAction<any>,
): AppStateType => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return rootReducer(state, action as never);
};

const initStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['videoPlayer'],
        ignoredActions: [
          '@/features/videoPlayer/addPlayer',
          '@/features/videoPlayer/removePlayer',
        ],
      },
    }).concat(
      baseApi.middleware,
      faqApi.middleware,
      categoryApi.middleware,
      channelsApi.middleware,
      videoApi.middleware,
      subscriptionsApi.middleware,
      playlistApi.middleware,
      commentsApi.middleware,
      blacklistApi.middleware,
      authApi.middleware,
      reportApi.middleware,
    ),
    devTools: true,
  });

  setupListeners(store.dispatch);

  return store;
};

export type AppDispatchType = ReturnType<typeof initStore>['dispatch'];

export const store = initStore();

export const wrapper = createWrapper(initStore);
