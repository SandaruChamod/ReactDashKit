import { createSlice } from '@reduxjs/toolkit';
import { LOADER_MESSAGES } from './constants';

interface LoaderState {
  loading: boolean;
  message: string;
}

const initialState: LoaderState = {
  loading: false,
  message: LOADER_MESSAGES.DEFAULT,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state, action) => {
      state.loading = true;
      state.message = action.payload || LOADER_MESSAGES.DEFAULT;
    },
    hideLoader: (state) => {
      state.loading = false;
      state.message = LOADER_MESSAGES.DEFAULT;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;