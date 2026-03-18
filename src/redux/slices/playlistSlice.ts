import { createSlice } from '@reduxjs/toolkit';

interface IAppState {
  isMobileDropdownOpen: boolean;
  isPlaylistModalOpen: boolean;
  isDeletePlaylistModalOpen: boolean;
  isEditPlaylistModalOpen: boolean;
  createdPlaylistId: string;
  isHistoryDeleted: boolean;
  subscribedChannel: {
    channelId: string | null,
    subscribers: number | null,
    isSubscribed: boolean | null,
  }
  editedPlaylistName: string,
  deletedVideoFromPlaylistId: string,
}

const initialState: IAppState = {
  isMobileDropdownOpen: false,
  isPlaylistModalOpen: false,
  isDeletePlaylistModalOpen: false,
  isEditPlaylistModalOpen: false,
  createdPlaylistId: '',
  isHistoryDeleted: false,
  subscribedChannel: {
    channelId: null,
    subscribers: null,
    isSubscribed: null,
  },
  editedPlaylistName: '',
  deletedVideoFromPlaylistId: '',
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setIsMobileDropdownOpen: (state, action) => {
      state.isMobileDropdownOpen = action.payload;
    },
    setIsPlaylistModalOpen: (state, action) => {
      state.isPlaylistModalOpen = action.payload;
    },
    setIsDeletePlaylistModalOpen: (state, action) => {
      state.isDeletePlaylistModalOpen = action.payload;
    },
    setIsEditPlaylistModalOpen: (state, action) => {
      state.isEditPlaylistModalOpen = action.payload;
    },
    setCreatedPlaylistId: (state, action) => {
      state.createdPlaylistId = action.payload;
    },
    setIsHistoryDeleted: (state, action) => {
      state.isHistoryDeleted = action.payload;
    },
    setSubscribedChannel: (state, action) => {
      state.subscribedChannel = action.payload;
    },
    setEditedPlaylistName: (state, action) => {
      state.editedPlaylistName = action.payload;
    },
    setDeletedVideoFromPlaylistId: (state, action) => {
      state.deletedVideoFromPlaylistId = action.payload;
    },
  },
});

export const {
  setIsMobileDropdownOpen,
  setIsPlaylistModalOpen,
  setIsDeletePlaylistModalOpen,
  setIsEditPlaylistModalOpen,
  setCreatedPlaylistId,
  setIsHistoryDeleted,
  setSubscribedChannel,
  setEditedPlaylistName,
  setDeletedVideoFromPlaylistId,
} = playlistSlice.actions;

export default playlistSlice.reducer;
