import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  initialResetPasswordValues,
  resetPasswordValidationSchema,
} from "@/types/auth/resetpassword";
import AuthButton from "@/components/auth/AuthButton";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: initialResetPasswordValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [hasFirstCondition, setHasFirstCondition] = useState(false);
  const [hasSecondCondition, setHasSecondCondition] = useState(false);
  const [hasThirdCondition, setHasThirdCondition] = useState(false);

  const handlePasswordInput = (e: any) => {
    const { value } = e.target;
    if (value.match(/[A-Za-z]/)) {
      setHasSecondCondition(true);
    }
    if (
      value.match(/[0-9]/) ||
      value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
    ) {
      setHasThirdCondition(true);
    }
    if (value.length >= 8) {
      setHasFirstCondition(true);
    }
  };

  return (
    <Stack flexDirection="column" spacing={3}>
      <Typography variant="subtitle1">
        Please enter your new password below for your Groovity account
      </Typography>
      <Stack flexDirection="column" spacing={1}>
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
          onChange={(e) => {
            formik.handleChange(e);
            handlePasswordInput(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          size="small"
        />
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <Typography variant="subtitle1" color="textSecondary">
              Your password must contain at least...
            </Typography>
            <FormControlLabel
              value={"8 characters"}
              control={<Radio />}
              label="8 characters"
              checked={hasFirstCondition}
            />
            <FormControlLabel
              value="1 letter"
              control={<Radio />}
              label="1 letter"
              checked={hasSecondCondition}
            />
            <FormControlLabel
              value="1 number or 1 special character"
              control={<Radio />}
              label="1 number or 1 special character"
              checked={hasThirdCondition}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
      <TextField
        required
        fullWidth
        autoFocus
        placeholder="Enter confirm password"
        type={showPassword ? "text" : "password"}
        name="confirmPassword"
        label="Confirm password"
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
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
        size="small"
      />
      <AuthButton
        onClick={() => {
          formik.handleSubmit();
          navigate("/log-in");
        }}
        typography="Reset Password"
      />
    </Stack>
  );
};

export default ResetPassword;
