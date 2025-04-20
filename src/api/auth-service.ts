import api from "@/api/axios-api";
import { LogInProps } from "@/types/auth/login";

export const authService = {
  async signUpApi(signUpData: any) {
    try {
      const response = await api.post("/auth/signup", signUpData);
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
  },

  async logInApi(logInData: LogInProps) {
    try {
      const response = await api.post("/auth/signin", logInData, {
        withCredentials: true,
      });

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
  },

  async refreshTokenApi() {
    try {
      const response = await api.post("/auth/refresh-token", {
        withCredentials: true,
      });
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
  },

  async sendVerificationApi(email: string) {
    try {
      const response = await api.post(
        "/auth/send-verification",
        { email },
        { withCredentials: true },
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
  },

  async verifyOtpApi(otp: string) {
    try {
      const response = await api.post("/auth/verify", { otp });
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
  },
};
