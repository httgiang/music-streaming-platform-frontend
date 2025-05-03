import {
  Card,
  Paper,
  Typography,
  IconButton,
  Box,
  Tooltip,
} from "@mui/material";
import UploadMusicIcon from "@/assets/upload-music.png";
import { useState } from "react";
import UploadMusicDialog from "./UploadMusicPage";

const MusicWorkSpacePage = () => {
  const [openUploadMusic, setOpenUploadMusic] = useState(false);
  const handleUploadMusic = () => {
    setOpenUploadMusic(true);
  };
  const handleCloseUploadMusic = () => {
    setOpenUploadMusic(false);
  };

  return (
    <Box display="flex" width="100%" height="100vh" gap={2}>
      <Paper sx={{ flex: 2, padding: 2 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Your uploads
        </Typography>
      </Paper>
      <Paper sx={{ flex: 1, padding: 2 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Artist tools
        </Typography>
        <Tooltip
          title={<span style={{ fontSize: "16px" }}>Upload music</span>}
          placement="top"
        >
          <Card
            sx={{
              width: 70,
              height: 70,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.5)",
            }}
            onClick={handleUploadMusic}
          >
            <IconButton>
              <img color="white" src={UploadMusicIcon} width={45} height={45} />
            </IconButton>
          </Card>
        </Tooltip>
        <UploadMusicDialog
          onClose={handleCloseUploadMusic}
          open={openUploadMusic}
        />
      </Paper>
    </Box>
  );
};

export default MusicWorkSpacePage;
