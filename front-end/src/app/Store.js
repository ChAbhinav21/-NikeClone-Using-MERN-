// front-endvite/src/app/Store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/product/ProductSlice'
import authReducer from '../features/auth/AuthSlice'
export const store = configureStore({
    reducer:{
        product:productReducer,
        user:authReducer,
    }
})
