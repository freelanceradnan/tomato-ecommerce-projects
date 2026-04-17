import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../app/store";
// import { userDetails } from "../app/userDetails";
export const store=configureStore({
    reducer:{
    [ApiSlice.reducerPath]:ApiSlice.reducer
    // user:userDetails.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(ApiSlice.middleware),
})