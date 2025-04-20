import React from "react";
import { Button, Typography } from "@mui/material";

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
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <Typography fontWeight={600}>{typography}</Typography>
    </Button>
  );
};

export default AuthButton;
