import { Stack, Typography, Button } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const SendVerificationCode = () => {
  const navigate = useNavigate();

  const sendVerificationEmail = useAuth().sendVerificationEmail;
  const user = useSelector((state: RootState) => state.auth.user);
  const sendCode = async () => {
    if (!user?.email) return;
    try {
      console.trace("Sending email from component");
      await sendVerificationEmail(user.email);
      navigate("/verify-otp");
    } catch (error) {
      console.error("Failed to send verification email:", error);
    }
  };

  return (
    <Stack flexDirection="column" spacing={3}>
      <Typography color="white">
        Please verify your email address to continue
      </Typography>
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
        onClick={sendCode}
      >
        <Typography fontWeight={600} color="text.primary">
          Send verification code
        </Typography>
      </Button>
    </Stack>
  );
};

export default SendVerificationCode;
