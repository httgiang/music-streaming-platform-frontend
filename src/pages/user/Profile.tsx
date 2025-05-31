import {
  initialUserProfileValues,
  userProfileValidationSchema,
} from "@/types/user-profile";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  IconButton,
  Select,
  TextField,
  Typography,
  Paper,
  Divider,
  alpha,
  useTheme,
  Container,
  Tooltip,
} from "@mui/material";
import {
  NavigateBefore,
  CameraAlt,
  Person,
  Cake,
  Phone,
  Wc,
} from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import dayjs from "dayjs";
import { useState, useRef } from "react";
import { fetchUserProfile } from "@/api/user/user-api";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  updateUserProfileAvatar,
  updateUserProfile,
} from "@/api/user/user-api";
import { useToast } from "@/contexts/ToastContext";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const Profile = () => {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [avatarHover, setAvatarHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(
    user?.avatar || null,
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const showToast = useToast();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialUserProfileValues,
    validationSchema: userProfileValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSaveChanges();
      // navigate("/account");
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackNavigation = () => {
    window.history.back();
  };

  const handleUpdateProfileAvatar = async (file: File) => {
    try {
      const response = await updateUserProfileAvatar(file);
      if (response.status === 200) {
        console.log("Avatar updated successfully");
      }
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };
  const handleSaveChanges = async () => {
    if (avatarFile) {
      await handleUpdateProfileAvatar(avatarFile);
    }
    if (formik.values) {
      const transformedValues = {
        ...formik.values,
        birth: formik.values.birth
          ? dayjs(formik.values.birth).format("YYYY-MM-DD")
          : null,
      };

      try {
        const res = await updateUserProfile(transformedValues);
        if (res.status === 200) {
          showToast("Profile updated successfully", "success");
          navigate("/account");
        }
      } catch (error) {
        console.error("Failed to update profile:", error);
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user?.id) {
          const profile = await fetchUserProfile(user.id);
          const birthDate = new Date(profile.birth);
          console.log(birthDate);
          const formattedBirth = `${
            birthDate.getMonth() + 1
          }/${birthDate.getDate()}/${birthDate.getFullYear()}`;
          formik.setValues({
            avatarImageUrl: profile.avatarImageUrl || "",
            name: profile.name || "",
            birth: formattedBirth || null,
            phone: profile.phone || "",
            gender: profile.gender || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
    fetchProfile();
  }, [user?.id]);

  return (
    <Container sx={{ width: 800 }}>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          mt: 4,
          mb: 6,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: `0 10px 40px ${alpha(theme.palette.common.black, 0.2)}`,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
        }}
      >
        <Box
          sx={{
            position: "relative",
            background: theme.custom.lightGradient,
            p: 3,
            pt: 6,
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              color: alpha(theme.palette.common.white, 0.85),
              backgroundColor: alpha(theme.palette.common.black, 0.2),
              backdropFilter: "blur(4px)",
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.black, 0.4),
              },
            }}
            onClick={handleBackNavigation}
          >
            <NavigateBefore />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <MotionBox
                onHoverStart={() => setAvatarHover(true)}
                onHoverEnd={() => setAvatarHover(false)}
                sx={{ position: "relative", cursor: "pointer" }}
                onClick={() => fileInputRef.current?.click()}
              >
                <Avatar
                  src={
                    formik.values.avatarImageUrl ||
                    previewAvatar ||
                    user?.avatar
                  }
                  alt={user?.username || "User"}
                  sx={{
                    width: 140,
                    height: 140,
                    border: `4px solid ${alpha(
                      theme.palette.common.white,
                      0.8,
                    )}`,
                    boxShadow: `0 8px 20px ${alpha(
                      theme.palette.common.black,
                      0.3,
                    )}`,
                    transition: "all 0.3s ease",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: avatarHover
                      ? alpha(theme.palette.common.black, 0.5)
                      : "transparent",
                    opacity: avatarHover ? 1 : 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  <Tooltip title="Change profile picture">
                    <CameraAlt sx={{ color: "white", fontSize: 40 }} />
                  </Tooltip>
                </Box>
              </MotionBox>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                textAlign: "left",
                color: "white",
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  opacity: 0.9,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                User Profile
              </Typography>

              <Typography
                variant="h3"
                fontWeight={700}
                sx={{
                  textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  mb: 0.5,
                }}
              >
                {user?.username || "Username"}
              </Typography>

              <Typography sx={{ opacity: 0.85, fontSize: 18 }}>
                {user?.email || "email@example.com"}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      bgcolor: alpha(theme.palette.background.paper, 0.4),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ textAlign: "left" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <Person
                          sx={{ color: theme.palette.primary.main, mr: 1.5 }}
                        />
                        <Typography fontWeight={600} color="text.secondary">
                          Username
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={500}>
                        {user?.username || ""}
                      </Typography>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      bgcolor: alpha(theme.palette.background.paper, 0.4),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ textAlign: "left" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <Person
                          sx={{ color: theme.palette.secondary.main, mr: 1.5 }}
                        />
                        <Typography fontWeight={600} color="text.secondary">
                          Full Name
                        </Typography>
                      </Box>
                      <TextField
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.name && formik.errors.name)}
                        helperText={
                          typeof formik.errors.name === "string"
                            ? formik.errors.name
                            : undefined
                        }
                        fullWidth
                        variant="standard"
                        placeholder="Enter your full name"
                        InputProps={{
                          sx: {
                            fontSize: "1.1rem",
                            fontWeight: 500,
                            "&:before": { borderBottom: "none" },
                            "&:after": {
                              borderBottomColor: theme.palette.secondary.main,
                            },
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      bgcolor: alpha(theme.palette.background.paper, 0.4),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ textAlign: "left" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <Cake sx={{ color: "#ff9800", mr: 1.5 }} />
                        <Typography fontWeight={600} color="text.secondary">
                          Date of Birth
                        </Typography>
                      </Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={
                            formik.values.birth
                              ? dayjs(formik.values.birth)
                              : null
                          }
                          onChange={(date) =>
                            formik.setFieldValue("birth", date)
                          }
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              name: "birth",
                              variant: "standard",
                              onBlur: formik.handleBlur,
                              error: !!(
                                formik.touched.birth && formik.errors.birth
                              ),
                              helperText:
                                typeof formik.errors.birth === "string"
                                  ? formik.errors.birth
                                  : undefined,
                              InputProps: {
                                sx: {
                                  fontSize: "1.1rem",
                                  fontWeight: 500,
                                  "&:before": { borderBottom: "none" },
                                  "&:after": { borderBottomColor: "#ff9800" },
                                },
                              },
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>

              <Grid item xs={12} md={6}>
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      bgcolor: alpha(theme.palette.background.paper, 0.4),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 2,
                    }}
                  >
                    <CardContent sx={{ textAlign: "left" }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <Wc sx={{ color: "#e91e63", mr: 1.5 }} />
                        <Typography fontWeight={600} color="text.secondary">
                          Gender
                        </Typography>
                      </Box>
                      <FormControl fullWidth variant="standard">
                        <Select
                          name="gender"
                          value={formik.values.gender}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          sx={{
                            fontSize: "1.1rem",
                            fontWeight: 500,
                            "&:before": { borderBottom: "none" },
                            "&:after": { borderBottomColor: "#e91e63" },
                          }}
                          disableUnderline
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Rather not say</MenuItem>
                        </Select>
                      </FormControl>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>

              <Grid item xs={12}>
                <MotionBox
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      bgcolor: alpha(theme.palette.background.paper, 0.4),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      borderRadius: 2,
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                      >
                        <Phone sx={{ color: "#4caf50", mr: 1.5 }} />
                        <Typography fontWeight={600} color="text.secondary">
                          Phone Number
                        </Typography>
                      </Box>
                      <TextField
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={!!(formik.touched.phone && formik.errors.phone)}
                        helperText={
                          typeof formik.errors.phone === "string"
                            ? formik.errors.phone
                            : undefined
                        }
                        fullWidth
                        variant="standard"
                        placeholder="Enter your phone number"
                        InputProps={{
                          sx: {
                            fontSize: "1.1rem",
                            fontWeight: 500,
                            "&:before": { borderBottom: "none" },
                            "&:after": { borderBottomColor: "#4caf50" },
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
            </Grid>

            {/* Form Actions */}
            <Divider sx={{ my: 4, opacity: 0.6 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={handleBackNavigation}
                sx={{
                  borderRadius: 8,
                  px: 3,
                  py: 1,
                  borderColor: alpha(theme.palette.secondary.main, 0.5),
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    borderColor: theme.palette.secondary.main,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  },
                }}
              >
                <Typography fontWeight={600}>Cancel</Typography>
              </Button>

              <MotionBox
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: 8,
                    px: 3,
                    py: 1,
                    background: theme.custom.lightGradient,
                    boxShadow: `0 4px 12px ${alpha(
                      theme.palette.secondary.main,
                      0.3,
                    )}`,
                    "&:hover": {
                      boxShadow: `0 6px 16px ${alpha(
                        theme.palette.secondary.main,
                        0.4,
                      )}`,
                    },
                  }}
                >
                  <Typography fontWeight={600}>Save Changes</Typography>
                </Button>
              </MotionBox>
            </Box>
          </form>
        </Box>
      </MotionPaper>
    </Container>
  );
};

export default Profile;
