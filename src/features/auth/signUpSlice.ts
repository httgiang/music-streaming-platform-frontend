import { SignUpProps, initialSignUpValues } from "@/types/auth/signup";
import {
  UserProfileProps,
  initialUserProfileValues,
} from "@/types/user-profile";
import { createSlice } from "@reduxjs/toolkit";
interface SignUpState {
  credentialsData: SignUpProps;
  userProfileData: UserProfileProps;
}

const initialState: SignUpState = {
  credentialsData: initialSignUpValues,
  userProfileData: initialUserProfileValues,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setCredentialsData: (state, action) => {
      state.credentialsData = action.payload;
    },
    setUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
    },
    clearSignUpData: () => initialState,
  },
});
export const { setCredentialsData, setUserProfileData, clearSignUpData } =
  signUpSlice.actions;
export default signUpSlice.reducer;
