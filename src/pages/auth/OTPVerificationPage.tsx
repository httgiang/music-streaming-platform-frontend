import { Box, Typography, Link } from "@mui/material";
import OTPInputs from "@/components/auth/OTPInputs";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/api/auth-service";
import { useEffect } from "react";

const OTPVerficationPage = () => {
  const user = useAuth().user;

  useEffect(() => {
    let isMounted = true;

    const sendVerificationCode = async () => {
      if (!user?.email) return;
      try {
        await authService.sendVerificationApi(user.email);
      } catch (error) {
        if (isMounted) {
          console.error("Verification error:", error);
        }
      }
    };

    const timer = setTimeout(sendVerificationCode, 1000);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [user?.email]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      gap={3}
    >
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
        <Link>Resend</Link>
      </Box>
    </Box>
  );
};

export default OTPVerficationPage;
