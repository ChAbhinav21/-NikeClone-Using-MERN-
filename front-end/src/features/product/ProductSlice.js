// front-endvite/src/features/product/ProductSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchCategory, fetchColors, fetchProduct, fetchSizes ,fetchProductById} from "./ProductApi"; 

const initialState = {
  products: [],
  colors:[],
  category:[],
  sizes:[],
  selectedProduct:null,
  status: "idle",
};

export const fetchProductAsync = createAsyncThunk(
  "product/fetchProduct",
  async ({sort,filters}) => {
    const response = await fetchProduct(sort,filters);
    return response;
  }
);
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product)=>{
    const response = await createProduct(product);
    return response;
  }
)
export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async(id)=>{
    const response = await fetchProductById(id)
    return response;
  }
)
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
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
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
        state.category = action.payload
      })
      .addCase(fetchSizeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSizeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.sizes = action.payload
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push (action.payload)
      })
  },
});
 
export const selectProducts = (state) => state.product.products;
export const selectColors = (state)=>state.product.colors;
export const selectCategory = (state) => state.product.category;
export const selectSize= (state)=>state.product.sizes;
export const selectSelectedProduct = (state) => state.product.selectedProduct;
export const selectStatus = (state) => state.product.status;


export default productSlice.reducer;
