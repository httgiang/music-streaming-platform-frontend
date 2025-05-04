import {
  Button,
  Box,
  Dialog,
  DialogActions,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import { Help } from "@mui/icons-material";
import { useState } from "react";
import { uploadSong } from "@/api/music/song-api";
import { useToast } from "@/contexts/ToastContext";

const UploadMusicDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [lyric, setLyric] = useState("");
  const showToast = useToast();

  const uploadMusic = async () => {
    if (!name || !coverImage || !audioFile || !lyric) {
      showToast("Please fill in all fields before submitting.", "warning");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("lyric", lyric);
      formData.append("coverImage", coverImage);
      formData.append("audioFile", audioFile);

      const response = await uploadSong(formData);
      if (response?.status === 201) {
        showToast("Song uploaded successfully!", "success");
        onClose();
      }
    } catch (error) {
      console.error("Error uploading song:", error);
      showToast("Failed to upload the song. Please try again.", "error");
    }
  };

  const [openComfirmation, setOpenConfirmation] = useState(false);
  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };
  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "600px",
            height: "100%",
            maxHeight: "600px",
            borderRadius: 3,
            padding: 2,
          },
        },
      }}
    >
      <Typography fontSize={25} fontWeight={700} sx={{ marginBottom: 2 }}>
        Upload your own song
      </Typography>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadMusic();
        }}
      >
        <Typography>Title</Typography>
        <TextField
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          placeholder="Enter the title of your song"
          sx={{ marginBottom: 2 }}
        />
        <Box display="flex" flexDirection={"row"} gap={1} alignItems="center">
          <Typography>Cover image</Typography>
          <Tooltip title="Only .jpg, .jpeg, and .png files" placement="right">
            <Help sx={{ fontSize: 16 }} />
          </Tooltip>
        </Box>
        <TextField
          fullWidth
          required
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              setCoverImage(file);
            }
          }}
          variant="outlined"
          type="file"
          sx={{ marginBottom: 2 }}
          inputProps={{ accept: ".png, .jpeg, .jpg" }}
        />

        <Box display="flex" flexDirection={"row"} gap={1} alignItems="center">
          <Typography>Upload your song</Typography>
          <Tooltip title="Only .wav and .mp3 files" placement="right">
            <Help sx={{ fontSize: 16 }} />
          </Tooltip>
        </Box>
        <TextField
          fullWidth
          required
          variant="outlined"
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
              setAudioFile(file);
            }
          }}
          type="file"
          sx={{ marginBottom: 2 }}
          inputProps={{ accept: ".wav, .mp3" }}
        />
        <Box display="flex" flexDirection={"row"} gap={1} alignItems="center">
          <Typography>Lyrics</Typography>
          <Tooltip
            title="Should be in the format you want to show listeners"
            placement="right"
          >
            <Help sx={{ fontSize: 16 }} />
          </Tooltip>
        </Box>
        <TextField
          fullWidth
          required
          variant="outlined"
          value={lyric}
          onChange={(e) => setLyric(e.target.value)}
          placeholder="Enter the song lyrics"
          multiline
          rows={6.5}
          sx={{
            marginBottom: 2,
          }}
        />

        <Box
          display="flex"
          flexDirection={"row"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Button>
            <Typography
              sx={{
                textDecoration: "underline",
              }}
            >
              Want to preview your song?
            </Typography>
          </Button>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              <Typography color="black" fontSize={14}>
                Upload
              </Typography>
            </Button>
          </DialogActions>
        </Box>

        <Dialog
          onClose={handleCloseConfirmation}
          open={openComfirmation}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "400px",
                borderRadius: 3,
                padding: 2,
              },
            },
          }}
        >
          <Typography fontSize={25} fontWeight={700} sx={{ marginBottom: 2 }}>
            Are you sure you want to upload this song?
          </Typography>
          <DialogActions>
            <Button variant="outlined" onClick={handleCloseConfirmation}>
              Cancel
            </Button>
            <Button variant="contained" onClick={uploadMusic}>
              <Typography color="black" fontSize={14}>
                Upload
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </Dialog>
  );
};

export default UploadMusicDialog;
