import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITokenResponse } from '@/redux/services/auth/baseTypes';
import { AuthType } from '@/providers/AuthModalProvider';
import { ICurrentCredentialsResponse, IMeResponse } from '../services/users/responseModel';
import { usersService } from '../services/users';
import { authApi, videoApi } from '../services';
import { IConfirmResponse, ICurrentCredential, INewRefreshResponse } from '../services/auth/responseModel';
import { ACCESS_TOKEN_EXPIRESAT, USER_ID_COOKIE } from '@/shareds/constants/auth';
import { setCookie, deleteCookie } from 'cookies-next';

interface IUserState {
  isAuth: boolean;
  hasControls: boolean,
  // флаг указывает - произошел ли заброс по проверке инициализации пользователя
  // если false - значит инициализация произошла и мы точно знаем авторизован пользователь либо нет
  isInitial: boolean,
  isGetUserInfoLoading: boolean,
  authModalType: AuthType | null
  user: IMeResponse
  currentCredentials: ICurrentCredential[] | null
  // версия авторизации нужна для принудительного размонтирования
  // и обновления данных страницы, на которой мы находимся в момент авторизации/логаута
  authVersion: number

  /* Проинициализирована ли информация об авторизации пользователя */
  isUserInited: boolean
}

const initialState: IUserState = {
  isAuth: false,
  isInitial: true,
  hasControls: false,
  isGetUserInfoLoading: false,
  user: {} as IMeResponse,
  authVersion: 0,
  currentCredentials: null,
  authModalType: null,
  isUserInited: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
      if (!action.payload) {
        localStorage.removeItem(ACCESS_TOKEN_EXPIRESAT);
        deleteCookie(USER_ID_COOKIE);
      }
    },
    setAuthModalType: (state, action) => {
      state.authModalType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      usersService.endpoints.getMeInfo.matchPending,
      (state) => {
        state.isGetUserInfoLoading = true;
      },
    );
    builder.addMatcher(
      usersService.endpoints.getMeInfo.matchRejected,
      (state) => {
        state.isGetUserInfoLoading = false;
      },
    );
    builder.addMatcher(
      usersService.endpoints.getMeInfo.matchFulfilled,
      (state, { payload }: PayloadAction<IMeResponse>) => {
        if (!payload) return;
        state.user = payload;
        state.isGetUserInfoLoading = false;
        state.isUserInited = true;
        state.isAuth = true;
        // Mock
        state.user.isAdult = false;
        payload.id && setCookie(USER_ID_COOKIE, payload.id, {
          path: '/',
          sameSite: 'lax',
          // @ts-ignore
          domain: window.cookieDomain ?? undefined,
        });
      },
    );

    builder.addMatcher(
      authApi.endpoints.newDevice.matchFulfilled,
      (state) => {
        state.isUserInited = true;
      },
    );

    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<IConfirmResponse>) => {
        if (payload?.tokenType === 1) {
          state.isAuth = true;
          if (payload.expiredAt) localStorage.setItem(ACCESS_TOKEN_EXPIRESAT, payload.expiredAt);
        }
        state.isInitial = false;
      },
    );
    builder.addMatcher(
      authApi.endpoints.confirm.matchFulfilled,
      (state, { payload }: PayloadAction<ITokenResponse>) => {
        if (payload?.tokenType === 1) {
          state.isAuth = true;
          localStorage.setItem(ACCESS_TOKEN_EXPIRESAT, payload.expiredAt);
        } else {
          deleteCookie(USER_ID_COOKIE);
          localStorage.removeItem(ACCESS_TOKEN_EXPIRESAT);
        }
        if (state.authModalType !== 'resetConfirmationInfo') {
          state.isInitial = false;
        }
      },
    );

    // REFRESH
    builder.addMatcher(
      authApi.endpoints.newRefresh.matchPending,
      (state) => {
        state.isGetUserInfoLoading = true;
      },
    );
    builder.addMatcher(
      authApi.endpoints.newRefresh.matchFulfilled,
      (state, { payload }: PayloadAction<INewRefreshResponse>) => {
        state.isGetUserInfoLoading = false;
        if (payload?.tokenType === 1) {
          state.isAuth = true;
          state.isInitial = false;
          localStorage.setItem(ACCESS_TOKEN_EXPIRESAT, payload.expiredAt);
        } else {
          state.isAuth = false;
          state.isInitial = true;
          deleteCookie(USER_ID_COOKIE);
          localStorage.removeItem(ACCESS_TOKEN_EXPIRESAT);
        }
      },
    );
    builder.addMatcher(
      authApi.endpoints.newRefresh.matchRejected,
      (state) => {
        state.isAuth = false;
        state.isInitial = true;
        state.isGetUserInfoLoading = false;
        deleteCookie(USER_ID_COOKIE);
        localStorage.removeItem(ACCESS_TOKEN_EXPIRESAT);
      },
    );

    builder.addMatcher(
      usersService.endpoints.logout.matchFulfilled,
      (state) => {
        state.isAuth = false;
        state.isInitial = true;
        state.user = {};
        deleteCookie(USER_ID_COOKIE);
        localStorage.removeItem(ACCESS_TOKEN_EXPIRESAT);
      },
    );

    builder.addMatcher(
      videoApi.endpoints.getVideoListAfterLogout.matchFulfilled,
      (state) => {
        state.authVersion += 1;
      },
    );
    builder.addMatcher(
      usersService.endpoints.currentCredentials.matchFulfilled,
      (state, { payload }: PayloadAction<ICurrentCredentialsResponse>) => {
        state.currentCredentials = payload.items;
      },
    );
  },
});

export const { setIsAuth, setAuthModalType } = userSlice.actions;

export default userSlice.reducer;
