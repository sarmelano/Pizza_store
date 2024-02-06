import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PIZZA_API } from '../../constants/data';

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  const response = await fetch(`${PIZZA_API}/menu`);
  if (!response.ok) {
    throw new Error('Failed to fetch menu');
  }
  const data = await response.json();
  return data;
});

const initialState = {
  menu: [],
  status: 'idle',
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.menu = action.payload.data;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;