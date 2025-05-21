import {
  Button,
  Box,
  Dialog,
  DialogActions,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Help } from "@mui/icons-material";
import { useToast } from "@/contexts/ToastContext";
import { createAlbum } from "@/api/music/album-api";
import { useNavigate } from "react-router-dom";
import { AlbumProps } from "@/types/album";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const CreateAlbumDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [albumName, setAlbumName] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string>(
    "https://www.shutterstock.com/image-vector/no-photo-image-viewer-thumbnail-600nw-2495883211.jpg",
  );
  const showToast = useToast();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleCreateAlbum = async () => {
    if (!albumName || !coverImage) {
      showToast("Please fill in all fields before submitting.", "warning");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", albumName);
      formData.append("coverImage", coverImage);
      const response = await createAlbum(formData);

      if (response?.status === 201) {
        const rawAlbum = response.data.data.album;
        const album: AlbumProps = {
          ...rawAlbum,
          artist: user?.username,
        };
        console.log("Album created successfully:", rawAlbum);
        showToast("Album created successfully!", "success");
        navigate(`/album/add-songs`, { state: album });
        onClose();
      }
    } catch (error) {
      console.error("Error creating album:", error);
      showToast("Failed to create the album. Please try again.", "error");
    }
  };

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setCoverImagePreview(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
    setCoverImage(file);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            borderRadius: 3,
            padding: 2,
          },
        },
      }}
    >
      <Typography fontSize={25} fontWeight={700} sx={{ marginBottom: 2 }}>
        Create a music album
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateAlbum();
        }}
      >
        <Box display="flex" flexDirection={"row"} gap={2} alignItems="center">
          <img
            alt="Your album's cover image"
            src={coverImagePreview}
            style={{
              width: 230,
              height: 160,
              objectFit: "cover",
              border: "1px solid #ccc",
            }}
          />
          <Box display={"flex"} flexDirection={"column"} width="100%">
            <Typography>Album name</Typography>
            <TextField
              fullWidth
              required
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              variant="outlined"
              placeholder="Enter the name of your album"
              sx={{ marginBottom: 2 }}
            />

            <Box
              display="flex"
              flexDirection={"row"}
              gap={1}
              alignItems="center"
            >
              <Typography>Album cover image</Typography>
              <Tooltip
                title="Only .jpg, .jpeg, and .png files"
                placement="right"
              >
                <Help sx={{ fontSize: 16 }} />
              </Tooltip>
            </Box>
            <TextField
              fullWidth
              required
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  handleFileChange(file); // Handle file upload and preview
                }
              }}
              variant="outlined"
              type="file"
              sx={{ marginBottom: 2 }}
              inputProps={{ accept: ".png, .jpeg, .jpg" }}
            />
          </Box>
        </Box>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            <Typography color="black" fontSize={14}>
              Create
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CreateAlbumDialog;
