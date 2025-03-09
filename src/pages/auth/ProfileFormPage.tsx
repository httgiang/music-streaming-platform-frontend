import {
  Box,
  Stack,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useFormik } from "formik";
import {
  initialUserProfileValues,
  userProfileValidationSchema,
} from "@/types/user";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AuthButton from "@/components/auth/AuthButton";
import { useNavigate } from "react-router-dom";

const ProfileFormPage = () => {
  const formik = useFormik({
    initialValues: initialUserProfileValues,
    validationSchema: userProfileValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const navigate = useNavigate();

  return (
    <Box width="100%">
      <form onSubmit={formik.handleSubmit}>
        <Stack flexDirection="column" spacing={2}>
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
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of birth"
              value={formik.values.dob ? dayjs(formik.values.dob) : null}
              onChange={(value) => formik.setFieldValue("dob", value)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  name: "dob",
                  onBlur: formik.handleBlur,
                  error: formik.touched.dob && Boolean(formik.errors.dob),
                  helperText: formik.touched.dob && formik.errors.dob,
                },
              }}
            />
          </LocalizationProvider>
          <Box display="flex">
            <FormControl
              sx={{
                textAlign: "left",
              }}
              component="fieldset"
            >
              <FormLabel id="gender-radio-buttons-form-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender-radio-buttons-group"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  sx={{ flex: 1 }}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  sx={{ flex: 1 }}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  sx={{ flex: 1 }}
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <AuthButton
            onClick={() => navigate("/otp-verification")}
            typography="Next"
          />
        </Stack>
      </form>
    </Box>
  );
};

export default ProfileFormPage;
