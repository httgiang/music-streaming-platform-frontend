import { createSlice } from "@reduxjs/toolkit";

interface authState {
  isAuthenticated: boolean;
  user: { username: string; email: string } | null;
}

const initialState: authState = {
  isAuthenticated: false,
  user: { username: "", email: "" },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
