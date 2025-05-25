import React from "react";
import { Button, Typography } from "@mui/material";
import theme from "@/theme/theme";
import { ArrowForward } from "@mui/icons-material";

interface AuthButtonProps {
  typography: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ typography }) => {
  return (
    <Button
      type="submit"
      size="large"
      fullWidth
      variant="outlined"
      sx={{
        borderColor: theme.palette.secondary.main,
        background: theme.custom.lightGradient,
        color: "black",
        fontWeight: 600,
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
      endIcon={<ArrowForward />}
    >
      <Typography fontWeight={600}>{typography}</Typography>
    </Button>
  );
};

export default AuthButton;
