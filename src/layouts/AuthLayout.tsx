import { Box, Typography, Link, Dialog, alpha, Paper } from "@mui/material";
import { MusicNote } from "@mui/icons-material";
import { Outlet, useLocation, Link as RouterLink } from "react-router-dom";
import { useMemo } from "react";
import theme from "@/theme/theme";
import { motion } from "framer-motion";

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
    <Dialog
      open={true}
      fullWidth
      PaperProps={{
        elevation: 24,
        sx: {
          backgroundColor: alpha(theme.palette.background.default, 0.8),
          backdropFilter: "blur(20px)",
          borderRadius: 4,
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
          overflow: "hidden",
          boxShadow: `0 25px 50px -12px ${alpha("#000", 0.5)}`,
        },
      }}
      className="custom-scrollbar"
    >
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: alpha(theme.palette.secondary.main, 0.15),
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: alpha("#FFD54F", 0.15),
          filter: "blur(40px)",
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          display: "flex",
          minHeight: "90vh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            margin: "auto",
            alignItems: "center",
            width: "400px",
            py: 5,
            px: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",

              alignItems: "center",
              justifyContent: "center",
              mb: 1,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: `radial-gradient(circle, ${alpha(
                  theme.palette.secondary.main,
                  0.2,
                )} 0%, transparent 70%)`,
                filter: "blur(20px)",
                zIndex: -1,
              }}
            />

            <Typography
              component={motion.h1}
              margin={0}
              p={0}
              fontWeight="800"
              fontFamily="AMORIA"
              fontSize={40}
              letterSpacing={2}
              sx={{
                background: theme.custom.logoColor,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 10px rgba(179, 157, 219, 0.3)",
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
            }}
          >
            <Typography
              fontSize={26}
              fontWeight={700}
              color="text.primary"
              sx={{ mb: 3, textAlign: "center" }}
              component={motion.h2}
              layout
            >
              {formTitle}
            </Typography>

            <Paper
              elevation={0}
              sx={{
                backdropFilter: "blur(5px)",
                backgroundColor: "inherit",
                // borderRadius: 3,
                // border: `1px solid ${alpha(
                //   theme.palette.secondary.main,
                //   0.15,
                // )}`,
                p: 3,
                width: "100%",
              }}
            >
              <Box
                paddingY={1}
                display="flex"
                flexDirection="column"
                width="100%"
                gap={2.5}
                justifyContent="center"
                sx={{ backgroundColor: "transparent" }}
              >
                <Outlet />

                {authPathName === "sign-up" && (
                  <Box
                    display="flex"
                    margin="2px auto"
                    gap={0.5}
                    mt={1.5}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography component="span" color="text.secondary">
                      Already have an account?{" "}
                    </Typography>
                    <Typography
                      component={RouterLink}
                      to="/log-in"
                      sx={{
                        color: theme.palette.secondary.main,
                        textDecoration: "none",
                        fontWeight: 500,
                        position: "relative",
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          width: "0",
                          height: "2px",
                          bottom: -2,
                          left: 0,
                          background: theme.custom.lightGradient,
                          transition: "width 0.3s ease",
                        },
                        "&:hover:after": {
                          width: "100%",
                        },
                      }}
                    >
                      Log in
                    </Typography>
                  </Box>
                )}

                {authPathName === "log-in" && (
                  <Box
                    display="flex"
                    margin="2px auto"
                    gap={0.5}
                    mt={1.5}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      component="span"
                      variant="subtitle1"
                      color="text.secondary"
                    >
                      Don't have an account yet?{" "}
                    </Typography>
                    <Typography
                      component={RouterLink}
                      to="/sign-up"
                      sx={{
                        color: theme.palette.secondary.main,
                        textDecoration: "none",
                        fontWeight: 500,
                        position: "relative",
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          width: "0",
                          height: "2px",
                          bottom: -2,
                          left: 0,
                          background: theme.custom.lightGradient,
                          transition: "width 0.3s ease",
                        },
                        "&:hover:after": {
                          width: "100%",
                        },
                      }}
                    >
                      Sign up
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>

            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                right: 30,
                opacity: 0.2,
                transform: "rotate(15deg)",
              }}
            >
              <MusicNote
                sx={{ fontSize: 40, color: theme.custom.lightGradient }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: 60,
                left: 30,
                opacity: 0.15,
                transform: "rotate(-15deg)",
              }}
            >
              <MusicNote sx={{ fontSize: 30 }} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default AuthLayout;
