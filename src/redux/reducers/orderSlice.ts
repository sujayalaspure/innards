import {RootState} from '@app/redux/store';
import {Order} from '@app/types/order';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface OrderState {
  orders: Order[];
  currentOrder: Order | undefined;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: undefined,
};

export const orderSlice = createSlice({
  name: 'orderReducer',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders = [...state.orders] || [];
      state.orders.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Partial<Order>>) => {
      state.orders = state.orders.map(order =>
        order.id === action.payload.id ? {...order, ...action.payload} : order,
      );
    },
    addOrUpdateCurrentOrder: (state, action: PayloadAction<Partial<Order>>) => {
      state.currentOrder = {
        ...state.currentOrder,
        ...action.payload,
      } as Order;
    },
    clearCurrentOrder: state => {
      state.currentOrder = undefined;
    },
    clearOrders: state => {
      state.orders = [];
    },
  },
});

export const {addOrUpdateCurrentOrder, clearCurrentOrder, addOrder, clearOrders, updateOrder} = orderSlice.actions;

export const useOrderSelector = (state: RootState) => state.orderReducer;

export default orderSlice.reducer;
