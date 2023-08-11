import {RootState} from '@app/redux/store';
import {UserInerface} from '@app/types/user';
import {sleep} from '@app/utils/commonFunctions';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

interface UserState {
  user: UserInerface | null | undefined;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: UserState = {
  isLoading: false,
  user: null,
  error: null,
};
export const fetchUser = createAsyncThunk('asyncThunk/fetchUser', async () => {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();
  await sleep(2000);

  return data.results[0] as UserInerface;
});

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {addUser, removeUser} = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const userSelector = (state: RootState) => state.userReducer;

export default userSlice.reducer;
