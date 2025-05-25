import {
  Box,
  Stack,
  TextField,
  Button,
  Divider,
  Link,
  IconButton,
  InputAdornment,
  Typography,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
import GoogleLogo from "@/assets/google-icon.svg";
import { initialLogInValues, logInValidationSchema } from "@/types/auth/login";
import AuthButton from "@/components/auth/AuthButton";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const logIn = useAuth().logIn;
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialLogInValues,
    validationSchema: logInValidationSchema,
    onSubmit: async (values) => {
      try {
        await logIn(values);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box width="100%">
      <form autoComplete="on" onSubmit={formik.handleSubmit}>
        <Stack flexDirection="column" spacing={3}>
          <TextField
            required
            fullWidth
            autoFocus
            placeholder="Enter username"
            type="text"
            name="username"
            autoComplete="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
                "&.Mui-focused": {
                  transform: "translateY(-2px)",
                },
              },
            }}
          />

          <TextField
            required
            fullWidth
            placeholder="Enter password"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            name="password"
            label="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
                "&.Mui-focused": {
                  transform: "translateY(-2px)",
                },
              },
            }}
          />
          <Box display="flex" flexDirection="column" gap={1}>
            <AuthButton typography="Log in" />
            <Box
              display="flex"
              justifyContent="right"
              onClick={() => navigate("/forgot-password")}
              sx={{
                cursor: "pointer",
              }}
            >
              <Typography fontSize={13} color="textSecondary">
                <u>Forgot password?</u>
              </Typography>
            </Box>
          </Box>

          <Divider>
            <Typography variant="subtitle2" color="textSecondary">
              or log in with
            </Typography>
          </Divider>
          <Button
            size="large"
            fullWidth
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Box display="flex" gap={1}>
              <img src={GoogleLogo} alt="Google Logo" width="20" height="20" />
              <Typography fontWeight="700">Log in with Google</Typography>
            </Box>
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LogInPage;
