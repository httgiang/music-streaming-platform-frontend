import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/user-profile";
interface authState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: authState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("loginSuccess payload:", action.payload);
      const userData = action.payload.data?.user || action.payload;
      state.isAuthenticated = true;
      state.user = userData;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
