import { SignUpProps, initialSignUpValues } from "@/types/auth/signup";
import {
  UserProfileProps,
  initialUserProfileValues,
} from "@/types/user-profile";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setCredentialsData: (state, action: PayloadAction<SignUpProps>) => {
      state.credentialsData = action.payload;
    },
    setUserProfileData: (state, action: PayloadAction<UserProfileProps>) => {
      state.userProfileData = action.payload;
    },
    clearSignUpData: (state) => {
      state.credentialsData = initialSignUpValues;
      state.userProfileData = initialUserProfileValues;
    },
  },
});
export const { setCredentialsData, setUserProfileData, clearSignUpData } =
  signUpSlice.actions;
export default signUpSlice.reducer;
