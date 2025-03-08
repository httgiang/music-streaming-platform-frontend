import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "@/layouts/HomeLayout";
import HomePage from "@/pages/HomePage";
import AuthLayout from "@/layouts/AuthLayout";
import SignUpPage from "@/pages/auth/SignUpPage";
import LogInPage from "@/pages/auth/LogInPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import OTPVerficationPage from "@/pages/auth/OTPVerificationPage";
import ResetPassword from "@/pages/auth/ResetPassword";
import ProfileFormPage from "@/pages/auth/ProfileFormPage";
import AccountPage from "./pages/Account";
import ProfilePage from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/fill-profile" element={<ProfileFormPage />} />
          <Route path="/log-in" element={<LogInPage />} />
          <Route path="/otp-verification" element={<OTPVerficationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
