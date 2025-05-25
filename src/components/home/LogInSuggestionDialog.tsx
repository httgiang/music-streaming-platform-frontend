import { Button, Dialog, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import theme from "@/theme/theme";
const LogInSuggestionDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onClose={onClose}>
      <Close
        onClick={onClose}
        sx={{ color: "grey", p: 1, pb: 0, ml: "auto", cursor: "pointer" }}
      />

      <Stack
        sx={{ padding: "2rem 5rem" }}
        spacing={1.5}
        alignItems="center"
        textAlign="center"
      >
        <Typography fontSize={25} fontWeight={700}>
          Get the best
          <span
            style={{
              background: theme.custom.logoColor,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 2px 10px rgba(179, 157, 219, 0.3)",
            }}
          >
            {" "}
            Groovity{" "}
          </span>
          experience with a free account
        </Typography>
        <Button
          variant="outlined"
          sx={{ width: "15rem", backgroundColor: theme.palette.secondary.main }}
          onClick={() => navigate("/sign-up")}
        >
          Log in{" "}
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: "15rem",
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
          }}
          onClick={() => navigate("/log-in")}
        >
          Sign up
        </Button>
        <Typography variant="body2" color="textSecondary">
          By creating your account, you agree to Groovity's <br />
          <u> Terms of Service</u> and <u> Privacy Policy</u>
        </Typography>
      </Stack>
    </Dialog>
  );
};
export default LogInSuggestionDialog;
