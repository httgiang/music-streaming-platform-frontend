import { createContext, useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  sendVerificationEmail: (email: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const showToast = useToast();
  const navigate = useNavigate();

  const signUp = async (signUpData: any) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/signup", signUpData);
      if (response?.status === 201) {
        const user = response.data.data.user;
        localStorage.setItem("user", JSON.stringify(user));
        setAuthToken(response.data.accessToken);
        dispatch(loginSuccess(user));
        navigate("/verify-otp");
        showToast("Sign up successfully", "success");
      }
    } catch (error: any) {
      const message = error?.response?.data?.error?.message || "Sign up failed";
      showToast(message, "error");
      navigate("/sign-up");
    } finally {
      setLoading(false);
    }
  };
  const logIn = async (logInData: LogInProps) => {
    try {
      setLoading(true);
      // Clear any existing auth state
      setAuthToken(null);
      localStorage.removeItem("user");
      dispatch(logout());
      
      const response = await api.post("/auth/signin", logInData, {
        withCredentials: true,
      });
      
      if (response?.status === 200) {
        const { user, accessToken } = response.data.data;
        localStorage.setItem("user", JSON.stringify(user));
        setAuthToken(accessToken); 
        dispatch(loginSuccess(user));
        showToast("Logged in successfully", "success");
      }
    } catch (error: any) {
      // Clear any existing auth state on error
      setAuthToken(null);
      localStorage.removeItem("user");
      dispatch(logout());
      
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
      navigate("/log-in");
      throw error;
    }
  };
  const verifyOtp = async (code: string) => {
    try {
      
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        throw new Error("No user found. Please log in again.");
      }

      const response = await api.post(
        "/auth/verify",
        { code },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${api.defaults.headers.common["Authorization"]}`,
          },
        },
      );
      if (response?.status === 200) {
        showToast("Verified successfully", "success");
        navigate("/"); 
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
      setAuthToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("recentlyPlayedSongs");
      dispatch(logout());
      
      await api.post(
        "/auth/signout",
        {},
        { withCredentials: true },
      );
    } catch (error: any) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };
  const restoreSession = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      dispatch(logout());
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    try {
      // Only attempt to refresh if we have a stored user
      const response = await api.post("/auth/refresh-token", {
        signal: controller.signal,
      });

      if (response?.status === 200 && response.data.data.accessToken) {
        setAuthToken(response.data.data.accessToken);
        const parsedUser = JSON.parse(storedUser);
        dispatch(loginSuccess(parsedUser));
      } else {
        // Clear auth state if refresh fails
        setAuthToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("recentlyPlayedSongs");
        dispatch(logout());
      }
    } catch (error) {
      // Clear auth state on any error
      setAuthToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("recentlyPlayedSongs");
      dispatch(logout());
    } finally {
      setLoading(false);
    }
    return () => controller.abort();
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