import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
};

export const UserSlice = createSlice({
  name: 'Guest',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = UserSlice.actions;
export default UserSlice.reducer;