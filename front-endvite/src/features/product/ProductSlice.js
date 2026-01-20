// front-endvite/src/features/product/ProductSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategory, fetchColors, fetchProduct, fetchSizes } from "./ProductApi";

const initialState = {
  products: [],
  colors:[],
  categories:[],
  sizes:[],
  status: "idle",
};

export const fetchProductAsync = createAsyncThunk(
  "product/fetchProduct",
  async () => {
    const response = await fetchProduct();
    return response;
  }
);
export const fetchColorsAsync = createAsyncThunk(
  'product/fetchColors',
  async ()=>{
    const response = await fetchColors();
    return response;
  }
)
export const fetchCategoryAsync = createAsyncThunk(
  "product/fetchCategory",
  async ()=>{
    const response = await fetchCategory();
    return response;
  }
)
export const fetchSizeAsync = createAsyncThunk(
  "product/fetchSizes",
  async()=>{
    const response = await fetchSizes();
    return response;
  }
)
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchColorsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchColorsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.colors = action.payload
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload
      })
      .addCase(fetchSizeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSizeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.sizes = action.payload
      });
  },
});
 
export const selectProducts = (state) => state.product.products;
export const selectColors = (state)=>state.product.colors;
export const selectCategory = (state) => state.product.categories;
export const selectSize= (state)=>state.product.sizes;
export const selectStatus = (state) => state.product.status;


export default productSlice.reducer;
