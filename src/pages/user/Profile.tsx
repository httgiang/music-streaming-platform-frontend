import {
  initialUserProfileValues,
  userProfileValidationSchema,
} from "@/types/user-profile";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid2,
  MenuItem,
  IconButton,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NavigateBefore } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dayjs from "dayjs";
import { useState } from "react";
import { fetchUserProfile } from "@/api/user/user-api";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [testUserId, setTestUserId] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialUserProfileValues,
    validationSchema: userProfileValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        sx={{
          background:
            "linear-gradient(185deg,rgba(132, 22, 196, 0.81),rgba(241, 231, 84, 0.8))",
          padding: "1rem 5rem",
          margin: "1rem 20rem",
          borderRadius: "10px",
        }}
      >
        <Box>
          <Avatar
            src={user?.avatar}
            alt="Avatar"
            sx={{
              width: 150,
              height: 150,
              transition: "opacity 0.3s ease",
            }}
          />
        </Box>
        <Box
          justifyContent={"center"}
          alignItems={"flex-start"}
          display={"flex"}
          flexDirection={"column"}
          marginLeft={"2rem"}
        >
          <Typography fontSize={12} fontWeight={400}>
            Profile
          </Typography>
          <Typography variant="h3" fontWeight={600}>
            {user?.username || ""}
          </Typography>
          <Typography fontSize={18} fontWeight={400}>
            {user?.email || ""}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          margin: "0 20rem",
        }}
      >
        <IconButton
          sx={{
            color: "white",
            backgroundColor: "rgba(0,0,0, 0.5)",
          }}
          onClick={() => {
            navigate("/account");
          }}
        >
          <NavigateBefore />
        </IconButton>
      </Box>
      <Stack
        flexDirection="column"
        margin="0 20rem"
        marginTop="3rem"
        gap="15rem"
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid2 container rowSpacing={3} columnSpacing={4}>
            <Grid2
              size={{
                lg: 12,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                textAlign="left"
              >
                <Typography fontSize={18} fontWeight={500}>
                  Username
                </Typography>
                <Typography>  {user?.username || ""}</Typography>
              </Box>
            </Grid2>
            <Grid2
              size={{
                lg: 12,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                textAlign="left"
              >
                <Typography fontSize={18} fontWeight={500}>
                  Full name
                </Typography>
                <TextField
                  autoFocus
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.name && formik.errors.name)}
                  helperText={typeof formik.errors.name === "string" ? formik.errors.name : undefined}
                  fullWidth
                />
              </Box>
            </Grid2>
            <Grid2
              size={{
                lg: 12,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                textAlign="left"
              >
                <Typography fontSize={18} fontWeight={500}>
                  Date of birth
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={formik.values.birth && dayjs.isDayjs(formik.values.birth) ? formik.values.birth : null}
                    name="birth"
                    onChange={(date) => formik.setFieldValue("birth", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        name: "birth",
                        onBlur: formik.handleBlur,
                        error: !!(formik.touched.birth && formik.errors.birth),
                        helperText: typeof formik.errors.birth === "string" ? formik.errors.birth : undefined,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Grid2>
            <Grid2
              size={{
                lg: 12,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                textAlign="left"
              >
                <Typography fontSize={18} fontWeight={500}>
                  Gender
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Rather not say</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2
              size={{
                lg: 12,
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                textAlign="left"
              >
                <Typography fontSize={18} fontWeight={500}>
                  Phone number
                </Typography>
                <TextField
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={!!(formik.touched.phone && formik.errors.phone)}
                  helperText={typeof formik.errors.phone === "string" ? formik.errors.phone : undefined}
                  fullWidth
                />
              </Box>
            </Grid2>
            <Grid2 size={{ lg: 12 }}>
              <Box display="flex" justifyContent="flex-end" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: 150, height: 40 }}
                >
                  <Typography fontWeight={600}>Save changes</Typography>
                </Button>
                <Button>
                  <Typography fontWeight={600}>Cancel</Typography>
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </form>
      </Stack>
    </Box>
  );
};

export default Profile;
