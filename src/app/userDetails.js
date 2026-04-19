import { createSlice } from "@reduxjs/toolkit";
// import { userDetails } from './userDetails';

export const userDetails=createSlice({
    name:'user',
    initialState: JSON.parse(localStorage.getItem("cart")) || [],
    reducers:{
        addToCart: (state, action) => {


  const product = state.find(c => c.id === action.payload.id);

  if (product) {
    product.quantity += 1;
  } else {
    state.push({ ...action.payload, quantity: 1 });
  }
 localStorage.setItem("cart", JSON.stringify(state));
 
},
        removeToCart:(state,action)=>{
    const newState = state.filter(c => c.id !== action.payload);
  localStorage.setItem("cart", JSON.stringify(newState));
  return newState;
        },
        modifyQuantity: (state, action) => {
  const product = state.find(c => c.id === action.payload.id);
  if (product) {
    product.quantity = action.payload.quantity;
  }
   localStorage.setItem("cart", JSON.stringify(state));
},
        clearCart:(state,action)=>{
            localStorage.removeItem("cart");
            return []
            
        }
    }
})
export const { addToCart, removeToCart, modifyQuantity, clearCart } = userDetails.actions;
