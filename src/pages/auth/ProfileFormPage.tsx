import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import countryList from "react-select-country-list";

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
import { useMemo } from "react";

const ProfileFormPage = () => {
  const formik = useFormik({
    initialValues: initialUserProfileValues,
    validationSchema: userProfileValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const countries = useMemo(() => countryList().getData(), []);

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
          <FormControl fullWidth sx={{ textAlign: "left" }}>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              label="Gender"
              id="gender-select"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="CUSTOM">Rather not say</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            fullWidth
            autoFocus
            placeholder="Enter your contact number"
            type="text"
            name="phoneNumber"
            label="Contact number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <Autocomplete
            disablePortal
            id="country-select"
            options={countries}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            )}
            fullWidth
          ></Autocomplete>
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
