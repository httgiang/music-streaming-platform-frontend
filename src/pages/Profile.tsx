import { initialUserProfileValues, userProfileValidationSchema } from '@/types/user';
import { Avatar, Box, Divider, FormControl, Grid2, MenuItem, Select, Stack,  TextField, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';






const user = {
  name: 'Nguyễn Trọng Thuận',
  email: 'ntthuan196@gmail.com',
  avatar: 'https://scontent.fsgn5-13.fna.fbcdn.net/v/t1.15752-9/483083819_1611971752776032_2862690653199494242_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFMLihRA9o6uJmB7OVry1P046-6mTMC2Cfjr7qZMwLYJwcq27U2QjCYF9WL7WnrRzTNppvNDy-6GAUoaDhRUp49&_nc_ohc=CrmQX7S6y8IQ7kNvgHBe1cq&_nc_oc=Adhur06QMoPOlTs571LpHd41tpujAxGv9FHX0h_oZgo4mslhiFYBxk04Jjk-n5cfdU0&_nc_zt=23&_nc_ht=scontent.fsgn5-13.fna&oh=03_Q7cD1wFhrh0mX3vxqYaVfkjjSqMvjeg3PGDuYZ7CBKSQnqN4AQ&oe=67F34AB9'
  
};

const Profile = () => {


     const formik = useFormik({
        initialValues: initialUserProfileValues,
        validationSchema: userProfileValidationSchema,
        onSubmit: (values) => {
          console.log(values);
        },
      });
      
  return (
    <Box sx={{ padding: 1 }}>
      <Box display={'flex'} flexDirection={'row'} sx={{background: "linear-gradient(185deg,rgba(132, 22, 196, 0.81),rgba(241, 231, 84, 0.8))", padding: "1rem", borderRadius: "1rem", marginBottom: "1rem"}}>
         <Box
      >
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
      <Box justifyContent={'center'} alignItems={'flex-start'} display={'flex'} flexDirection={'column'} marginLeft={'2rem'}>
          <Typography fontSize={12} fontWeight={400}>
           Profile
          </Typography>
          <Typography variant="h2" fontWeight={600}>
           {user.name}
          </Typography>
          <Typography fontSize={18} fontWeight={400}>
           {user.email}
          </Typography>
      </Box>
    
      </Box>

    <Divider />
    <Stack flexDirection="row" margin="0 5rem" marginTop="3rem" gap="15rem">
      
      <form onSubmit={formik.handleSubmit}>
        <Grid2 container rowSpacing={3} columnSpacing={4}>
          <Grid2
            size={{
              lg: 6,
            }}
          >
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography fontSize={18} fontWeight={500}>
                Full name
              </Typography>
              <TextField
                autoFocus
                name="Name"
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
              lg: 6,
            }}
          >
            <Box display="flex" flexDirection="column">
              <Typography fontSize={18} fontWeight={500}>
                Date of birth
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    //   value={formik.values.birthDate}
                    name="birth"
                    onChange={(date) => formik.setFieldValue("birth", date)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                  />
              </LocalizationProvider>
            </Box>
          </Grid2>
          <Grid2
            size={{
              lg: 6,
            }}
          >
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography fontSize={18} fontWeight={500}>
                Gender
              </Typography>
              <FormControl fullWidth>
                <Select
                  name="gender"
                  label="gender"
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
              lg: 6,
            }}
          >
            <Box display="flex" flexDirection="column" gap={1}>
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
          <Grid2
            size={{
              lg: 6,
            }}
          >
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography fontSize={18} fontWeight={500}>
                Address
              </Typography>
              <TextField
                autoFocus
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!(formik.touched.address && formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                fullWidth
              />
            </Box>
          </Grid2>
        </Grid2>

      </form>
    </Stack>
  </Box>
  )
};

export default Profile
