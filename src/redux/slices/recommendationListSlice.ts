import { createSlice } from '@reduxjs/toolkit';
import { IVideoCardWithDetailsProps, mapVideoProps } from '@/entities/Video';
import { videoApi } from '@/redux/services';
import { IVideo } from '@/redux/services/video/baseModel';

interface IAppState {
  recommendationListVideos: IVideoCardWithDetailsProps[];
}

const initialState: IAppState = {
  recommendationListVideos: [],
};

const recommendationListSlice = createSlice({
  name: 'recommendationList',
  initialState,
  reducers: {
    setRecommendationList: (state, action) => {
      state.recommendationListVideos = action.payload;
    },
    changeRecommendationList: (state, action) => {
      state.recommendationListVideos = state.recommendationListVideos.map(
        (video) => {
          if (video.videoId === action.payload.videoId) {
            return action.payload;
          }
          return video;
        },
      );
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      videoApi.endpoints.getVideoListAfterLogout.matchFulfilled,
      (state, action) => {
        const transformedVideos = mapVideoProps(action.payload.videos as IVideo[]);
        state.recommendationListVideos = transformedVideos;
      },
    );
  },
});

const { setRecommendationList, changeRecommendationList } = recommendationListSlice.actions;

export const recommendationListActions = {
  setRecommendationList,
  changeRecommendationList,
};

export default recommendationListSlice.reducer;
