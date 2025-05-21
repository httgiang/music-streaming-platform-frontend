import { Button, Dialog, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";

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
          Get the best Groovity experience with a free account
        </Typography>
        <Button
          variant="outlined"
          sx={{ width: "15rem" }}
          onClick={() => navigate("/sign-up")}
        >
          Sign up{" "}
        </Button>
        <Button
          variant="outlined"
          sx={{ width: "15rem" }}
          onClick={() => navigate("/log-in")}
        >
          Log in
        </Button>
        <Typography variant="body2" color="textSecondary">
          By creating your account, you agree to Groovity's <br />
          <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>.
        </Typography>
      </Stack>
    </Dialog>
  );
};
export default LogInSuggestionDialog;
