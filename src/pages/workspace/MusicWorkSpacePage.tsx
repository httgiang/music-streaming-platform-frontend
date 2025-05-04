import {
  Card,
  Paper,
  Typography,
  IconButton,
  Box,
  Tooltip,
  styled,
} from "@mui/material";
import UploadMusicIcon from "@/assets/upload-music.png";
import CreateAlbumIcon from "@/assets/create-album.png";
import { useState } from "react";
import UploadMusicDialog from "./UploadMusicPage";
import CreateAlbumDialog from "./CreateAlbumDialog";

const ToolCard = styled(Card)(() => ({
  width: 70,
  height: 70,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.5)",
}));

const MusicWorkSpacePage = () => {
  const [openUploadMusic, setOpenUploadMusic] = useState(false);
  const [openCreateAlbumm, setOpenCreateAlbum] = useState(false);

  const handleUploadMusic = () => {
    setOpenUploadMusic(true);
  };
  const handleCloseUploadMusic = () => {
    setOpenUploadMusic(false);
  };

  const handleCreateAlbum = () => {
    setOpenCreateAlbum(true);
  };
  const handleCloseCreateAlbum = () => {
    setOpenCreateAlbum(false);
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
        <Box display={"flex"} gap={2} flexDirection="row">
          <Tooltip
            title={<span style={{ fontSize: "16px" }}>Upload music</span>}
            placement="top"
          >
            <ToolCard onClick={handleUploadMusic}>
              <IconButton>
                <img
                  color="white"
                  src={UploadMusicIcon}
                  width={45}
                  height={45}
                />
              </IconButton>
            </ToolCard>
          </Tooltip>
          <UploadMusicDialog
            onClose={handleCloseUploadMusic}
            open={openUploadMusic}
          />

          <Tooltip
            title={<span style={{ fontSize: "16px" }}>Create album</span>}
            placement="top"
          >
            <ToolCard onClick={handleCreateAlbum}>
              <IconButton>
                <img
                  color="white"
                  src={CreateAlbumIcon}
                  width={45}
                  height={45}
                />
              </IconButton>
            </ToolCard>
          </Tooltip>

          <CreateAlbumDialog
            onClose={handleCloseCreateAlbum}
            open={openCreateAlbumm}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default MusicWorkSpacePage;
