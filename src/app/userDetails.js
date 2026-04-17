import { createSlice } from "@reduxjs/toolkit";

export const userDetails=createSlice({
    name:'user',
    initialState:{
    searchData:[]
    },
    reducers:{
        searchData:(state,action)=>{
            state.searchData=action.payload
        }
    }
})
export const {searchData}=userDetails.actions
export default userDetails.reducer