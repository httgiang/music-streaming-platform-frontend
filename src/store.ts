import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
