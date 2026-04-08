import { configureStore } from "@reduxjs/toolkit";
import { ApiSlice } from "../app/store";

export const store=configureStore({
    reducer:{
        [ApiSlice.reducerPath]:ApiSlice.reducer
    },
    middleware:(dM)=>dM().concat(ApiSlice.middleware)
})