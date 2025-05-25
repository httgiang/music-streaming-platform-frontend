import {
  Box,
  Stack,
  TextField,
  Divider,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  Person,
  Email,
} from "@mui/icons-material";
import GoogleLogo from "@/assets/google-icon.svg";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  initialSignUpValues,
  signUpValidationSchema,
} from "@/types/auth/signup";
import AuthButton from "@/components/auth/AuthButton";
import { setSignUpData } from "@/features/auth/signUpSlice";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: initialSignUpValues,
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      dispatch(setSignUpData(values));
      navigate("/fill-profile");
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  return (
    <Box width="100%">
      <form onSubmit={formik.handleSubmit}>
        <Stack flexDirection="column" spacing={2}>
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
            placeholder="Enter email"
            type="text"
            name="email"
            autoComplete="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
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
          <AuthButton typography="Next" />
          <Divider>
            {" "}
            <Typography variant="subtitle2" color="textSecondary">
              or sign up with
            </Typography>
          </Divider>
          <Button variant="outlined" size="large" fullWidth>
            <Box display="flex" alignItems="center" gap={3}>
              <img src={GoogleLogo} alt="Google Logo" width={20} height={20} />
              <Typography fontWeight="700" color="text.primary">
                Continue with Google
              </Typography>
            </Box>
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUpPage;
