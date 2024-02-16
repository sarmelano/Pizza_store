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
        state.items.push({ ...payload, qty: 1 });
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
    },
    updateTotalPrice: (state) => {
      state.totalPrice = state.items.reduce((total, item) => total + item.unitPrice * item.qty, 0).toFixed(2);
    },
    /* togglePriority: (state) => {
      state.priority = !state.priority; 
    }, */
  }
});

export const { addToCart, incrementQty, decrementQty, removeFromCart, resetCart, updateTotalPrice, /* togglePriority */ } = CartSlice.actions;
export default CartSlice.reducer;