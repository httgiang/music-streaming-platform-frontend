import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeLayout from "@/layouts/HomeLayout";
import HomePage from "@/pages/HomePage";
import AuthLayout from "@/layouts/AuthLayout";
import SignUpPage from "@/pages/auth/SignUpPage";
import LogInPage from "./pages/auth/LogInPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/log-in" element={<LogInPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
