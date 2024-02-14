import { configureStore } from '@reduxjs/toolkit'
import CartSlice from './slices/CartSlice';
import MenuSlice from './slices/MenuSlice';
import UserSlice from './slices/UserSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice,
    menu: MenuSlice,
    cart: CartSlice,
  }
});