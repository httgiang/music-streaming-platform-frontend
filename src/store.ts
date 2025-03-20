import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import playerReducer from "@/features/music/playerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
