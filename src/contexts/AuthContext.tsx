import { createContext, useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/features/auth/authSlice";
import { useToast } from "@/contexts/ToastContext";
import { LogInProps } from "@/types/auth/login";
import LoadingScreen from "@/components/home/LoadingScreen";
import api, { setAuthToken } from "@/api/axios-api";

interface AuthContextProps {
  loading: boolean;
  signUp: (signUpData: any) => Promise<void>;
  logIn: (logInData: LogInProps) => Promise<void>;
  logOut: () => Promise<void>;
  restoreSession: () => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const showToast = useToast();

  const signUp = async (signUpData: any) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/signup", signUpData);
      if (response?.status === 201) {
        const user = response.data.data.user;
        dispatch(loginSuccess(user));
        showToast("Sign up successfully", "success");
      }
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || "Sign up failed";
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const logIn = async (logInData: LogInProps) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/signin", logInData, {
        withCredentials: true,
      });
      if (response?.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        setAuthToken(response.data.accessToken);
        dispatch(loginSuccess(response.data.data.user));
        showToast("Logged in successfully", "success");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message || "Invalid username or password";
      showToast(message, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      const response = await api.post(
        "/auth/send-verification",
        { email },
        { withCredentials: true },
      );
      if (response?.status === 200) {
        showToast("Verification email sent", "info");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        "Failed to send verification email";
      showToast(message, "error");
      throw error;
    }
  };

  const verifyOtp = async (code: string) => {
    try {
      const response = await api.post("/auth/verify", { code });
      if (response?.status === 200) {
        showToast("Verified successfully", "success");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        "Failed to verify OTP, please try again";
      showToast(message, "error");
      throw error;
    }
  };

  const logOut = async () => {
    try {
      setLoading(true);
      const response = await api.post(
        "/auth/signout",
        {},
        { withCredentials: true },
      );
      if (response?.status === 200) {
        setAuthToken(null);
        localStorage.removeItem("user");
        dispatch(logout());
      }
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const restoreSession = async () => {
    try {
      setLoading(true);
      const response = await api.post("/auth/refresh-token");
      setAuthToken(response.data.accessToken);
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsedUser = JSON.parse(stored);
        dispatch(loginSuccess(parsedUser));
      }
    } catch {
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        signUp,
        logIn,
        logOut,
        restoreSession,
        sendVerificationEmail,
        verifyOtp,
      }}
    >
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
