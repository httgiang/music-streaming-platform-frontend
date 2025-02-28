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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleLogo from "@/assets/google-icon.svg";
import { initialLogInValues, logInValidationSchema } from "@/types/auth/login";
import AuthButton from "@/components/auth/AuthButton";
import { useState } from "react";

const LogInPage = () => {
  const formik = useFormik({
    initialValues: initialLogInValues,
    validationSchema: logInValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box width="100%">
      <form onSubmit={formik.handleSubmit}>
        <Stack flexDirection="column" spacing={3}>
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
            size="small"
          ></TextField>
          <TextField
            required
            fullWidth
            autoFocus
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
            size="small"
          />
          <Box display="flex" flexDirection="column" gap={1}>
            <AuthButton
              onClick={() => formik.handleSubmit()}
              typography="Log in"
            />
            <Box display="flex" justifyContent="right">
              <Link href="/forgot-password" color="textSecondary">
                Forgot password?
              </Link>
            </Box>
          </Box>

          <Divider>or log in with</Divider>
          <Button variant="outlined" size="large" color="inherit">
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
