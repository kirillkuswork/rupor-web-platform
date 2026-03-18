/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface IAppState {
  isIncognitoMode: boolean;
  isIncognicoBarShown: boolean;
}

const initialState: IAppState = {
  isIncognitoMode: false,
  isIncognicoBarShown: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsIncognitoMode: (state, action) => {
      state.isIncognitoMode = action.payload;
    },
    setIsIncognicoBarShown: (state, action) => {
      state.isIncognicoBarShown = action.payload;
    },
  },
});

export const {
  setIsIncognitoMode,
  setIsIncognicoBarShown,
} = appSlice.actions;

export default appSlice.reducer;
