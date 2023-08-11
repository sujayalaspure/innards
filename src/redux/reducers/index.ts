import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from '@app/redux/reducers/counterSlice';
import userReducer from '@app/redux/reducers/userSlice';
import productReducer from '@app/redux/reducers/productSlice';

export const rootReducer = combineReducers({
  userReducer,
  counterReducer,
  productReducer,
});
