import {
  Box,
  Stack,
  TextField,
  Divider,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          ></TextField>
          <TextField
            required
            fullWidth
            placeholder="Enter email"
            type="text"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          ></TextField>
          <Box>
            <TextField
              required
              fullWidth
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? (
                          <Tooltip title="Show password" arrow>
                            <VisibilityOff />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Hide password" arrow>
                            <Visibility />
                          </Tooltip>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <AuthButton typography="Next" />
          <Divider>or sign up with</Divider>
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
