import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice';
import MenuSlice from './slices/MenuSlice';

export const store = configureStore({
  reducer: {
    cart: CartSlice,
    menu: MenuSlice,
  }
});