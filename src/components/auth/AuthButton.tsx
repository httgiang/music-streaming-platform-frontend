import React from "react";
import { Button, Typography } from "@mui/material";

interface AuthButtonProps {
  onClick: () => void;
  typography: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({ onClick, typography }) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
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
