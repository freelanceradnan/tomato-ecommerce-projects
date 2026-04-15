import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../app/store";

export const store=configureStore({
    reducer:{
        [ApiSlice.reducerPath]:ApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(ApiSlice.middleware),
})