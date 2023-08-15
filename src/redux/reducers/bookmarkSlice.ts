import {RootState} from '@app/redux/store';
import {Product} from '@app/types/product';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface BookmarkState {
  bookmarks: Product[];
}

// Define the initial state using that type
const initialState: BookmarkState = {
  bookmarks: [],
};

export const bookmarkSlice = createSlice({
  name: 'bookmarkReducer',
  initialState,
  reducers: {
    addBookMark: (state, action: PayloadAction<Product>) => {
      state.bookmarks.push(action.payload);
    },
    removeBookMark: (state, action: PayloadAction<number | string>) => {
      state.bookmarks = state.bookmarks.filter(
        item => item.id !== action.payload,
      );
    },
    toggleBookMark: (state, action: PayloadAction<Product>) => {
      const index = state.bookmarks.findIndex(
        item => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.bookmarks.splice(index, 1);
      } else {
        state.bookmarks.push(action.payload);
      }
    },
  },
});

export const {addBookMark, removeBookMark, toggleBookMark} =
  bookmarkSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const useBookmarkSelector = (state: RootState) => state.bookmarkReducer;

export default bookmarkSlice.reducer;
