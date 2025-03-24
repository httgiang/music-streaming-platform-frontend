import { SignUpProps } from "@/types/auth/signup";
import { LogInProps } from "@/types/auth/login";
import { useToast } from "@/contexts/ToastContext";
import { createContext, useCallback, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/features/auth/authSlice";
import { UserProfileProps } from "@/types/user-profile";

const dispatch = useDispatch();
const navigate = useNavigate();
const showToast = useToast();

export const logIn = async (credentials: LogInProps) => {
  try {
    const response = await axios.post("/auth/login", credentials);
    dispatch(loginSuccess(response.data.user));
    showToast("Log in successfully", "success");
  } catch (error: any) {
    console.error("Log in failed: ", error);
    showToast(error?.response?.data?.message || "An error occured", "error");
  }
};

export const signUp = async (
  signUpData: SignUpProps,
  profileData: UserProfileProps,
) => {
  const payload = {
    ...signUpData,
    userProfile: {
      ...profileData,
      dob: profileData.dob?.toISOString(),
    },
  };
  try {
    const response = await axios.post("/auth/signup", payload);
    showToast("Sign up successfully", "success");
    navigate(`/verify-otp?id=${response.data.id}`);
  } catch (error: any) {
    console.error("Sign up failed: ", error);
    showToast(error?.response?.data?.message || "An error occured", "error");
  }
};
