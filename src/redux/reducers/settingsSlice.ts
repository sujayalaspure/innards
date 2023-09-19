import {RootState} from '@app/redux/store';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface SettingsSliceState {
  isHeaderVisible: boolean;
}

const initialState: SettingsSliceState = {
  isHeaderVisible: true,
};

export const settingsSlice = createSlice({
  name: 'settingsSliceReducer',
  initialState,
  reducers: {
    toggleHeaderVisible: (state, action: PayloadAction<boolean>) => {
      state.isHeaderVisible = action.payload;
    },
  },
});

export const {toggleHeaderVisible} = settingsSlice.actions;

export const settingsSliceSelector = (state: RootState) => state.settingsSliceReducer;
export const HeaderVisibleSelector = (state: RootState) => state.settingsSliceReducer.isHeaderVisible;
export default settingsSlice.reducer;
