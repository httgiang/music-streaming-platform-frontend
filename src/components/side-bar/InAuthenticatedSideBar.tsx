import { Box, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import LogInSuggestionDialog from "../home/LogInSuggestionDialog";
import { useState } from "react";

const InAuthenticatedSideBar = () => {
  const [openLogInDialog, setOpenLogInDialog] = useState(false);
  const handleOpenLogInDialog = () => {
    setOpenLogInDialog(true);
  };
  const handleCloseLogInDialog = () => {
    setOpenLogInDialog(false);
  };

  const navigate = useNavigate();
  return (
    <>
      <Card
        sx={{
          padding: 2,
          height: 120,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onClick={handleOpenLogInDialog}
      >
        <Typography fontSize={16} fontWeight={700}>
          Build your first library
        </Typography>
        <Typography fontSize={14}>
          Save songs, create playlists, and organize your music
        </Typography>
        <Button variant="outlined" sx={{ alignSelf: "flex-end", mt: 2 }}>
          <Typography fontSize={14} fontWeight={700}>
            Create playlist
          </Typography>{" "}
        </Button>
      </Card>
      <Card
        sx={{
          padding: 2,
          height: 120,
          background:
            "linear-gradient(185deg,rgba(132, 22, 196, 0.81),rgba(241, 231, 84, 0.8))",
          //   "linear-gradient(185deg, rgba(162, 1, 255, 0.81), rgba(253, 230, 25, 0.8))",
          color: "white",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={16} fontWeight={700}>
          Unlock unlimited music
        </Typography>
        <Typography fontSize={14}>
          Sign in to Groovity to access millions of songs and artists
        </Typography>
        <Box sx={{ ml: "auto", mt: 2 }}>
          <Button variant="outlined" onClick={() => navigate("/log-in")}>
            <Typography fontSize={14} fontWeight={700}>
              Sign in
            </Typography>{" "}
          </Button>
        </Box>
      </Card>

      <LogInSuggestionDialog
        open={openLogInDialog}
        onClose={handleCloseLogInDialog}
      />
    </>
  );
};

export default InAuthenticatedSideBar;
