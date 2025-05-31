import { Box, Typography } from "@mui/material";
import OTPInputs from "@/components/auth/OTPInputs";
import { useAuth } from "@/contexts/AuthContext";
import theme from "@/theme/theme";

const OTPVerficationPage = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const sendVerificationEmail = useAuth().sendVerificationEmail;

  const sendCode = async () => {
    if (!user?.email) return;
    try {
      await sendVerificationEmail(user.email);
    } catch (error) {
      console.error("Failed to send verification email:", error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        width="100%"
        alignItems={"center"}
        textAlign={"center"}
      >
        <Typography variant="subtitle1" color="textSecondary">
          We just sent the verifcation code to {user?.email || "your email"}.
        </Typography>
        <OTPInputs />

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={0.5}
        >
          <Typography variant="subtitle1" color="textSecondary">
            Haven't received code?
          </Typography>

          <Typography
            onClick={sendCode}
            sx={{
              color: theme.palette.secondary.main,
              textDecoration: "none",
              fontWeight: 500,
              position: "relative",
              cursor: "pointer",
              "&:after": {
                content: '""',
                position: "absolute",
                width: "0",
                height: "2px",
                bottom: -2,
                left: 0,
                background: theme.custom.lightGradient,
                transition: "width 0.3s ease",
              },
              "&:hover:after": {
                width: "100%",
              },
            }}
          >
            Resend
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default OTPVerficationPage;
