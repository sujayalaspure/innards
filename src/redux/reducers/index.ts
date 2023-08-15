import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from '@app/redux/reducers/counterSlice';
import userReducer from '@app/redux/reducers/userSlice';
import productReducer from '@app/redux/reducers/productSlice';
import bookmarkReducer from '@app/redux/reducers/bookmarkSlice';

export const rootReducer = combineReducers({
  userReducer,
  counterReducer,
  productReducer,
  bookmarkReducer,
});
