import { Box, Typography, Button } from "@mui/material";
import OTPInputs from "@/components/auth/OTPInputs";
import { useAuth } from "@/contexts/AuthContext";
import LoadingScreen from "@/components/home/LoadingScreen";
const OTPVerficationPage = () => {
  const user = useAuth().user;
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
      <Box display="flex" flexDirection="column" gap={3} width="100%">
        <Typography variant="subtitle1" color="textSecondary">
          We just sent the verifcation code to {user?.email}
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
            Haven't received code?{" "}
          </Typography>
          <Button onClick={sendCode}>Resend</Button>
        </Box>
      </Box>
    </>
  );
};

export default OTPVerficationPage;
