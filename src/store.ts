import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import playerReducer from "@/features/music/playerSlice";
import signUpReducer from "@/features/auth/signUpSlice";
import userReducer from "@/features/auth/userSlice";

const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    auth: authReducer,
    player: playerReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
