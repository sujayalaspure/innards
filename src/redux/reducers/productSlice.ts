import {RootState} from '@app/redux/store';
import {fetchProducts} from '@app/service';
import {Product, ProductResponse} from '@app/types/product';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import mockProducts from '@app/mocks/mockProductData.json';

interface ProductSliceState {
  currentProduct: Product | null | undefined;
  products?: Product[];
  isLoading?: boolean;
  error?: string | null | undefined;
}

const initialState: ProductSliceState = {
  currentProduct: null,
};

export const fetchAsyncProducts = createAsyncThunk(
  'asyncThunk/fetchProducts',
  async () => {
    // const data = await fetchProducts<ProductResponse>('womens-dresses', {});
    // console.log('Producst   ', data);
    // if (data.status !== 200) {
    //   throw new Error(data.message);
    // }

    return mockProducts as Product[];
  },
);

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    setCurrentProduct: (state, action: PayloadAction<Product>) => {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAsyncProducts.pending, state => {
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

export const {setCurrentProduct} = productSlice.actions;

export const useProductSelector = (state: RootState) => state.productReducer;

export default productSlice.reducer;
