import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: null,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.name = null;
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;
export const selectUserName = (state) => state.user.name;

export default userSlice.reducer;
