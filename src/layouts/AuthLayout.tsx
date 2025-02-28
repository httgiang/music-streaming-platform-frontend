import { Box, Typography, Link } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { useMemo } from "react";

const AuthLayout = () => {
  const location = useLocation();
  const authPathName = useMemo(() => {
    if (location.pathname.includes("sign-up")) {
      return "sign-up";
    }
    if (location.pathname.includes("log-in")) {
      return "log-in";
    }
    if (location.pathname.includes("forgot-password")) {
      return "forgot-password";
    }
    if (location.pathname.includes("verification")) {
      return "otp-verification";
    }
  }, [location.pathname]);
  const formTitle = useMemo(() => {
    if (authPathName === "sign-up") {
      return "Create an account";
    }
    if (authPathName === "log-in") {
      return "Welcome back";
    }
    if (authPathName === "forgot-password") {
      return "Reset password";
    }
    if (authPathName === "otp-verification") {
      return "Verification";
    }
  }, [authPathName]);

  return (
    <Box
      sx={{
        display: "flex",
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
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            marginY: 5,
          }}
        >
          <Typography fontSize={24} fontWeight={700}>
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
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="textSecondary"
                >
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
