import { Box, Typography, Link } from "@mui/material";
import AuthButton from "@/components/auth/AuthButton";
import OTPInputs from "@/components/auth/OTPInputs";
import { useNavigate } from "react-router-dom";

const OTPVerficationPage = () => {
  const userEmail = "hotrungthygiang@gmail.com"; //dummy value
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="center"
      gap={3}
    >
      <Typography variant="subtitle1" color="textSecondary">
        We just sent the verifcation code to {userEmail}
      </Typography>
      <OTPInputs />
      <AuthButton
        onClick={() => {
          navigate("/");
        }}
        typography="Verify"
      />
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
