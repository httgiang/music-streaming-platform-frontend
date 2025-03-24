import { createSlice } from "@reduxjs/toolkit";

interface authState {
  isAuthenticated: boolean;
  loading: boolean;
  user: { username: string; email: string } | null;
  error: string | null;
  success: boolean;
}

const initialState: authState = {
  isAuthenticated: false,
  loading: false,
  user: { username: "", email: "" },
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
