import { Box, Link, Stack, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
import { ArrowBack } from "@mui/icons-material";
import {
  initialForgotPasswordValues,
  forgotPasswordValidationSchema,
} from "@/types/auth/forgotpassword";
import AuthButton from "@/components/auth/AuthButton";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialForgotPasswordValues,
    validationSchema: forgotPasswordValidationSchema,
    onSubmit(values) {
      console.log(values);
    },
  });
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      gap={2}
    >
      <Typography variant="subtitle1" color="textSecondary">
        Enter the email address you registered with and we will send you a
        verification code.
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack flexDirection="column" spacing={3}>
          <TextField
            required
            fullWidth
            autoFocus
            placeholder="Enter email"
            type="text"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          ></TextField>
          <AuthButton typography="Send verification" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 0.5,
              textDecoration: "underline",
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate("/log-in");
            }}
          >
            <ArrowBack />
            <Link color="textSecondary">Back to log in</Link>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default ForgotPasswordPage;
