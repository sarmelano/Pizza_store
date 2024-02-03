import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart: (state, { payload }) => {
      const found = state.items.find(item => item.id === payload.id);

      if (found) {
        found.qty += 1;
      } else {
        state.items.push({...payload, qty: 1});
      }
    },

    incrementQty: (state, { payload }) => {
      const item = state.items.find(item => item.id === payload);
      if (item) {
        item.qty += 1;
      }
    },
    
    decrementQty: (state, { payload }) => {
      const item = state.items.find(item => item.id === payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        state.items = state.items.filter(item => item.id !== payload);
      }
    },    

    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter(item => item.id !== payload);
    },

    resetCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, incrementQty, decrementQty, removeFromCart, resetCart } = CartSlice.actions;
export default CartSlice.reducer;