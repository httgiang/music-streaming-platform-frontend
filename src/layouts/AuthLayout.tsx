import { Box, Typography, Link } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useMemo } from "react";
import GroovityLogo from "@/assets/groovity-logo.png";

const AuthLayout = () => {
  const location = useLocation();
  const authPathName = useMemo(() => {
    if (location.pathname.includes("sign-up")) {
      return "sign-up";
    }
    if (location.pathname.includes("log-in")) {
      return "log-in";
    }
    if (location.pathname.includes("verify-otp")) {
      return "verify-otp";
    }
    if (location.pathname.includes("forgot-password")) {
      return "forgot-password";
    }
    if (location.pathname.includes("reset-password")) {
      return "reset-password";
    }
    if (location.pathname.includes("fill-profile")) {
      return "fill-profile";
    }
  }, [location.pathname]);
  const formTitle = useMemo(() => {
    if (authPathName === "sign-up") {
      return "Create an account";
    }
    if (authPathName === "log-in") {
      return "Welcome back";
    }
    if (authPathName === "verify-otp") {
      return "Check your email";
    }
    if (authPathName === "forgot-password") {
      return "Reset password";
    }
    if (authPathName === "reset-password") {
      return "Create new password";
    }
    if (authPathName === "fill-profile") {
      return "Set up your user profile";
    }
  }, [authPathName]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          margin: "auto",
          alignItems: "center",

          width: "400px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            width={32}
            height={32}
            alt="GroovityLogo"
            src={GroovityLogo}
            style={{
              filter:
                "drop-shadow(0 0 4px rgba(200, 120, 255, 0.5)) blur(0.2px)",
              opacity: 0.85,
              transition: "all 0.3s ease-in-out",
            }}
          />
          <Typography
            fontWeight="800"
            fontFamily="AMORIA"
            fontSize={35}
            letterSpacing={2}
            sx={{
              background: "linear-gradient(180deg, #d14eff 0%, #ffe600 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow:
                "0 0 10px rgba(255, 230, 0, 0.6), 0 0 20px rgba(186, 57, 255, 0.4)",
              transition: "all 0.3s ease-in-out",
            }}
          >
            GROOVITY
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <Typography fontSize={24} fontWeight={700} color="text.primary">
            {formTitle}
          </Typography>
          <Box
            paddingY={3}
            display="flex"
            flexDirection="column"
            width="80%"
            gap={2}
            justifyContent="center"
          >
            <Outlet />
            {authPathName === "sign-up" && (
              <Box display="flex" margin="2px auto" gap={0.5}>
                <Typography component="span" color="textSecondary">
                  Already have an account?{" "}
                </Typography>
                <Link href="/log-in">Log in</Link>
              </Box>
            )}
            {authPathName === "log-in" && (
              <Box display="flex" margin="2px auto" gap={0.5}>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="textSecondary"
                >
                  Don't have an account yet?{" "}
                </Typography>
                <Link href="/sign-up">Sign up</Link>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default AuthLayout;
