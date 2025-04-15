import axios from "axios";
import { LogInProps } from "@/types/auth/login";
export const signUp = async (signUpData: any) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      signUpData,
    );
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const logIn = async (logInData: LogInProps) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signin",
      logInData,
    );
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    };
  }
};
