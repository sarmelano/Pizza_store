import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  priority: false,
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.unitPrice * item.qty, 0).toFixed(2);
}

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
      state.totalPrice = calculateTotalPrice(state.items);
    },

    incrementQty: (state, { payload }) => {
      const item = state.items.find(item => item.id === payload);
      if (item) {
        item.qty += 1;
      }
      state.totalPrice = calculateTotalPrice(state.items);
    },

    decrementQty: (state, { payload }) => {
      const item = state.items.find(item => item.id === payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      } else {
        state.items = state.items.filter(item => item.id !== payload);
      }
      state.totalPrice = calculateTotalPrice(state.items);
    },

    removeFromCart: (state, { payload }) => {
      state.items = state.items.filter(item => item.id !== payload);
      state.totalPrice = calculateTotalPrice(state.items);
    },

    resetCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },

    togglePriority: (state) => {
      if (!state.priority) {
        state.totalPrice = (parseFloat(state.totalPrice) + 8).toFixed(2); // if priority
      } else {
        state.totalPrice = (parseFloat(state.totalPrice) - 8).toFixed(2); // if not priority
      }
      state.priority = !state.priority; // Change state after changing totalPrice
    },
  }
});

export const { addToCart, incrementQty, decrementQty, removeFromCart, resetCart, togglePriority } = CartSlice.actions;
export default CartSlice.reducer;