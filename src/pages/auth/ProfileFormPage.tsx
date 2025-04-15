import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Typography,
} from "@mui/material";
import countryList from "react-select-country-list";

import { useFormik } from "formik";
import {
  initialUserProfileValues,
  userProfileValidationSchema,
} from "@/types/user-profile";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AuthButton from "@/components/auth/AuthButton";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { setUserProfileData } from "@/features/auth/signUpSlice";
import { signUp } from "@/api/auth-api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useToast } from "@/contexts/ToastContext";

const ProfileFormPage = () => {
  const showToast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signUpData = useSelector((state: RootState) => state.signUp);

  const formik = useFormik({
    initialValues: initialUserProfileValues,
    validationSchema: userProfileValidationSchema,
    onSubmit: async (values) => {
      const transformedValues = {
        ...values,
        birth: values.birth ? dayjs(values.birth).format("YYYY-MM-DD") : null,
      };
      //temporary until backend is fixed
      const { avatar, ...userProfileWithoutAvatar } = transformedValues;

      const payload = {
        ...signUpData.credentialsData,
        userProfile: {
          ...userProfileWithoutAvatar,
        },
      };
      console.log("Payload: ", payload);

      try {
        const result = await signUp(payload);
        if (result?.status === 200) {
          showToast("Sign up successfully", "success");
          navigate("/verify-otp");
        } else if (result?.status === 409) {
          showToast("This account already exists", "error");
        }
      } catch (error: any) {
        const message = error?.response?.data?.message || "Sign up failed";
        showToast(message, "error");
      }
    },
  });

  const countries = useMemo(() => countryList().getData(), []);

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
              value={formik.values.birth ? dayjs(formik.values.birth) : null}
              onChange={(value) => formik.setFieldValue("birth", value)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  name: "birth",
                  onBlur: formik.handleBlur,
                  error: formik.touched.birth && Boolean(formik.errors.birth),
                  helperText: formik.touched.birth && formik.errors.birth,
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
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Rather not say</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            autoFocus
            placeholder="Enter your contact number"
            type="text"
            name="phone"
            label="Contact number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          {/* <Autocomplete
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
          ></Autocomplete> */}
          {/* <AuthButton typography="Next" /> */}
          <Button
            type="submit"
            size="large"
            fullWidth
            variant="outlined"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <Typography fontWeight={600}>Next</Typography>
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfileFormPage;
