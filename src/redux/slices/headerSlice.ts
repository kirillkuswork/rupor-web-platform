import { createSlice } from '@reduxjs/toolkit';

interface IAppState {
  isLoginModalOpen: boolean;
  isLeftMenuOpen: boolean;
  isLeftMenuThin: boolean;
  isMobileSearchOpen: boolean;
  isResultsDropdownShown: boolean;
  queryString: string;
}

const initialState: IAppState = {
  isLoginModalOpen: false,
  isLeftMenuOpen: false,
  isLeftMenuThin: false,
  isMobileSearchOpen: false,
  isResultsDropdownShown: true,
  queryString: '',
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setIsLoginModalOpen: (state, action) => {
      state.isLoginModalOpen = action.payload;
    },
    setIsLeftMenuOpen: (state, action) => {
      state.isLeftMenuOpen = action.payload;
    },
    setIsLeftMenuThin: (state, action) => {
      state.isLeftMenuThin = action.payload;
    },
    setIsMobileSearchOpen: (state, action) => {
      state.isMobileSearchOpen = action.payload;
    },
    setIsResultsDropdownShown: (state, action) => {
      state.isResultsDropdownShown = action.payload;
    },
    setQueryString: (state, action) => {
      state.queryString = action.payload;
    },
  },
});

export const {
  setIsLoginModalOpen,
  setIsLeftMenuOpen,
  setIsLeftMenuThin,
  setIsMobileSearchOpen,
  setIsResultsDropdownShown,
  setQueryString,
} = headerSlice.actions;

export default headerSlice.reducer;
