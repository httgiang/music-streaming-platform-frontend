import "./App.css";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeLayout from "@/layouts/HomeLayout";
import HomePage from "@/pages/home/HomePage";
import AuthLayout from "@/layouts/AuthLayout";
import SignUpPage from "@/pages/auth/SignUpPage";
import LogInPage from "@/pages/auth/LogInPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import OTPVerficationPage from "@/pages/auth/OTPVerificationPage";
import ResetPassword from "@/pages/auth/ResetPassword";
import ProfileFormPage from "@/pages/auth/ProfileFormPage";
import AccountPage from "@/pages/user/Account";
import ProfilePage from "@/pages/user/Profile";
import SongPage from "@/pages/song/SongPage";
import SearchPage from "@/pages/home/SearchPage";
import ArtistPage from "@/pages/song/ArtistPage";
import MusicWorkSpacePage from "@/pages/workspace/MusicWorkSpacePage";

import AlbumPage from "@/pages/song/AlbumPage";
import PrivateRoute from "@/components/PrivateRoute";
import AddSongsToAlbumPage from "./pages/workspace/AddSongsToAlbum";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/song/:id" element={<SongPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/music-workspace" element={<MusicWorkSpacePage />} />
          <Route path="/album/add-songs" element={<AddSongsToAlbumPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/log-in" element={<LogInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/fill-profile" element={<ProfileFormPage />} />
          <Route path="/verify-otp" element={<OTPVerficationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/account" element={<AccountPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
