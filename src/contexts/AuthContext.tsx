import { createContext, useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/features/auth/authSlice";
import { authService } from "@/api/authService";
import { useToast } from "@/contexts/ToastContext";
import { LogInProps } from "@/types/auth/login";

export const AuthContext = createContext<any>(null);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const dispatch = useDispatch();
  const showToast = useToast();

  const signUp = async (signUpData: any) => {
    try {
      const result = await authService.signUpApi(signUpData);
      if (result?.status === 200) {
        showToast("Sign up successfully", "success");
      } else if (result?.status === 409) {
        showToast("This account already exists", "error");
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Sign up failed";
      showToast(message, "error");
    }
  };
  const logIn = async (logInData: LogInProps) => {
    try {
      setLoading(true);
      const response = await authService.logInApi(logInData);
      if (response?.status === 200) {
        setUser(response.data.data.user);
        setAccessToken(response.data.accessToken);
        dispatch(loginSuccess(response.data.data.user));
        showToast("Logged in successfully", "success");
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || "Log in failed";
      showToast(message, "error");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setUser(null);
    setAccessToken(null);
    dispatch(logout());
  };

  const restoreSession = async () => {
    try {
      const response = await authService.refreshTokenApi();
      if (response?.status === 200) {
        setUser(response.data.data.user);
        setAccessToken(response.data.accessToken);
        dispatch(loginSuccess(response.data.data.user));
      }
    } catch {
      logOut();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, logIn, logOut, restoreSession }}
    >
      {children}
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
