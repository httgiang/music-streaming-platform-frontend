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

const user = {
  name: "Nguyễn Trọng Thuận",
  email: "ntthuan196@gmail.com",
  avatar:
    "https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.15752-9/483083819_1611971752776032_2862690653199494242_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFMLihRA9o6uJmB7OVry1P046-6mTMC2Cfjr7qZMwLYJwcq27U2QjCYF9WL7WnrRzTNppvNDy-6GAUoaDhRUp49&_nc_ohc=CrmQX7S6y8IQ7kNvgHBe1cq&_nc_oc=Adhur06QMoPOlTs571LpHd41tpujAxGv9FHX0h_oZgo4mslhiFYBxk04Jjk-n5cfdU0&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&oh=03_Q7cD1wFhrh0mX3vxqYaVfkjjSqMvjeg3PGDuYZ7CBKSQnqN4AQ&oe=67F34AB9",
};

const Profile = () => {
  const navigate = useNavigate();
  const formik = useFormik({
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
            src={user.avatar}
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
            {user.name}
          </Typography>
          <Typography fontSize={18} fontWeight={400}>
            {user.email}
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
                <Typography>dummyusername</Typography>
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
                  helperText={formik.touched.name && formik.errors.name}
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
                    value={formik.values.dob}
                    name="dob"
                    onChange={(date) => formik.setFieldValue("dob", date)}
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
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="CUSTOM">Rather not say</MenuItem>
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
                  autoFocus
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    !!(formik.touched.phoneNumber && formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  fullWidth
                />
              </Box>
            </Grid2>
            <Grid2 size={{ lg: 12 }}>
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                textAlign="left"
              >
                <Typography fontSize={18} fontWeight={500}>
                  Country
                </Typography>
                <Select
                  id="country-select"
                  value={formik.values.country}
                  name={formik.values.country}
                  fullWidth
                >
                  <MenuItem>Vietnam</MenuItem>
                </Select>
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
