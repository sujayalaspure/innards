import {RootState} from '@app/redux/store';
import {CartItem, Product} from '@app/types/product';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import mockProducts from '@app/mocks/mockProductData.json';

interface ProductSliceState {
  currentProduct: Product | null | undefined;
  products: Product[];
  isLoading?: boolean;
  error?: string | null | undefined;
  cart: CartItem[];
  test: any[];
}

const initialState: ProductSliceState = {
  currentProduct: null,
  products: [],
  isLoading: false,
  error: null,
  cart: [],
  test: [],
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchAsyncProducts = createAsyncThunk('asyncThunk/fetchProducts', async () => {
  // const data = await fetchProducts<ProductResponse>('womens-dresses', {});
  // console.log('Producst   ', data);
  // if (data.status !== 200) {
  //   throw new Error(data.message);
  // }

  const data = await delay(1000).then(() => {
    return mockProducts.map((product: any, i: number) => {
      return {
        ...product,
        id: i,
      };
    });
  });

  return data as Product[];
});

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
    addProductToCart: (state, action: PayloadAction<Omit<CartItem, 'finalPrice'>>) => {
      const item = action.payload;
      state.cart ??= [];
      const num = parseFloat(item?.price?.toString().replace(/,/g, ''));
      const discountedPrice = num - (num * parseFloat(item?.discountPercentage?.toString() || '0')) / 100;

      const index = state.cart.findIndex(cartItem => cartItem.id === item.id);
      if (index === -1) {
        state.cart.push({...item, finalPrice: discountedPrice});
      } else {
        const nextQuantity = state.cart[index].quantity + item.quantity;
        if (nextQuantity !== 0) {
          state.cart[index].quantity = state.cart[index].quantity + item.quantity;
        } else {
          state.cart.splice(index, 1);
        }
      }
    },
    addQuantityToCart: (state, action: PayloadAction<Pick<CartItem, 'id' | 'quantity'>>) => {
      const item = action.payload;
      const index = state.cart.findIndex(cartItem => cartItem.id === item.id);
      if (index !== -1) {
        state.cart[index].quantity += item.quantity;
      }
    },
    decreaseQuantityToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const index = state.cart.findIndex(cartItem => cartItem.id === item.id);
      if (index !== -1) {
        state.cart[index].quantity -= item.quantity;
      }
    },
    removeProductFromCart: (state, action: PayloadAction<number | string>) => {
      const productId = action.payload;
      const index = state.cart.findIndex(cartItem => cartItem.id === productId);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    emptyCart: state => {
      state.cart = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAsyncProducts.pending, state => {
      state.products = [];
      state.isLoading = true;
    });
    builder.addCase(fetchAsyncProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchAsyncProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {
  setCurrentProduct,
  addProductToCart,
  removeProductFromCart,
  emptyCart,
  addQuantityToCart,
  decreaseQuantityToCart,
} = productSlice.actions;

export const useProductSelector = (state: RootState) => state.productReducer;

export default productSlice.reducer;
