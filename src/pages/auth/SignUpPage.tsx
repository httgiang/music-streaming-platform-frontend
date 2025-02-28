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
import {
  initialSignUpValues,
  signUpValidationSchema,
} from "@/types/auth/signup";
import AuthButton from "@/components/auth/AuthButton";

const SignUpPage = () => {
  const formik = useFormik({
    initialValues: initialSignUpValues,
    validationSchema: signUpValidationSchema,
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
            size="small"
          ></TextField>
          <TextField
            required
            fullWidth
            autoFocus
            placeholder="Enter name"
            type="text"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            size="small"
          ></TextField>
          <TextField
            required
            fullWidth
            autoFocus
            placeholder="Enter email"
            type="text"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            size="small"
          ></TextField>
          <Box>
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
          </Box>
          <AuthButton
            onClick={() => formik.handleSubmit()}
            typography="Sign up"
          />
          <Divider>or sign up with</Divider>
          <Button variant="outlined" size="large" fullWidth>
            <Box display="flex" alignItems="center" gap={3}>
              <img src={GoogleLogo} alt="Google Logo" width={20} height={20} />
              <Typography fontWeight="700">Continue with Google</Typography>
            </Box>
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignUpPage;
