import {
  Button,
  Box,
  Dialog,
  TextField,
  Typography,
  Tooltip,
  IconButton,
  alpha,
  useTheme,
  Avatar,
  Fade,
  Divider,
} from "@mui/material";
import { Help, Close, Album, CloudUpload } from "@mui/icons-material";
import { useState } from "react";
import { useToast } from "@/contexts/ToastContext";
import { createAlbum } from "@/api/music/album-api";
import { useNavigate } from "react-router-dom";
import { AlbumProps } from "@/types/album";
// import { useSelector } from "react-redux";
// import { RootState } from "@/store";
import { motion } from "framer-motion";
import { FileUploader } from "react-drag-drop-files";

const MotionBox = motion(Box);
const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%232A2A2A'/%3E%3Cpath d='M100,65 C113.8,65 125,76.2 125,90 C125,103.8 113.8,115 100,115 C86.2,115 75,103.8 75,90 C75,76.2 86.2,65 100,65 M75,125 L125,125 L125,135 L75,135 L75,125 Z' fill='%23555555'/%3E%3C/svg%3E";

const CreateAlbumDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const theme = useTheme();
  const [albumName, setAlbumName] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] =
    useState<string>(placeholderImage);
  const [isUploading, setIsUploading] = useState(false);
  const showToast = useToast();
  const navigate = useNavigate();
  // const user = useSelector((state: RootState) => state.auth.user);
  // const artistName = useSelector((state: RootState) => state.user.name);
  const handleCreateAlbum = async () => {
    if (!albumName || !coverImage) {
      showToast("Please fill in all fields before submitting.", "warning");
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("name", albumName);
      formData.append("coverImage", coverImage);      const response = await createAlbum(formData);
      if (response?.status === 201) {
        const rawAlbum = response.data.data.album;
        console.log("Raw album data:", JSON.stringify(rawAlbum, null, 2));
        console.log("User data in album:", rawAlbum.user);
        console.log("User profile data:", rawAlbum.user?.userProfile);
        const album: AlbumProps = {
          ...rawAlbum,
          artist: rawAlbum.user?.userProfile?.name || rawAlbum.user?.username || "Unknown Artist",
        };
        console.log("Final album object:", album);
        showToast("Album created successfully!", "success");
        navigate(`/album/add-songs`, { state: album });
        onClose();
      }
    } catch (error) {
      console.error("Error creating album:", error);
      showToast("Failed to create the album. Please try again.", "error");
    } finally {
      setIsUploading(false);
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

  const resetForm = () => {
    setAlbumName("");
    setCoverImage(null);
    setCoverImagePreview(placeholderImage);
  };

  return (
    <Dialog
      open={open}
      onClose={
        !isUploading
          ? () => {
              resetForm();
              onClose();
            }
          : undefined
      }
      TransitionComponent={Fade}
      transitionDuration={400}
      PaperProps={{
        elevation: 24,
        sx: {
          width: "100%",
          maxWidth: "600px",
          borderRadius: 3,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.15)}`,
          overflow: "hidden",
        },
      }}
    >
      <Box sx={{ position: "relative", p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                background: theme.custom.lightGradient,
                width: 44,
                height: 44,
              }}
            >
              <Album />
            </Avatar>
            <Typography
              fontSize={24}
              fontWeight={700}
              sx={{
                background: theme.custom.hoverGradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Create New Album
            </Typography>
          </Box>

          {!isUploading && (
            <IconButton
              onClick={() => {
                resetForm();
                onClose();
              }}
              sx={{
                color: alpha(theme.palette.common.white, 0.7),
                "&:hover": {
                  color: theme.palette.common.white,
                  backgroundColor: alpha(theme.palette.common.white, 0.1),
                },
              }}
            >
              <Close />
            </IconButton>
          )}
        </Box>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateAlbum();
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{ mb: 0.75 }}
              >
                Album Name
              </Typography>
              <TextField
                fullWidth
                required
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                variant="outlined"
                placeholder="Enter the name of your album"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.background.paper, 0.4),
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha(theme.palette.secondary.main, 0.5),
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.secondary.main,
                    },
                  },
                }}
              />
            </Box>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 1,
                  alignItems: "center",
                  mb: 0.75,
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  Album Cover
                </Typography>
                <Tooltip
                  title="Upload a square image (JPG, PNG) for best results"
                  placement="right"
                >
                  <Help
                    sx={{
                      fontSize: 16,
                      color: alpha(theme.palette.common.white, 0.7),
                    }}
                  />
                </Tooltip>
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    width: 240,
                    height: 240,
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: `0 10px 30px ${alpha(
                      theme.palette.common.black,
                      0.4,
                    )}`,
                    "&::after": coverImage
                      ? {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          boxShadow: `inset 0 0 0 1px ${alpha(
                            theme.palette.common.white,
                            0.1,
                          )}`,
                          borderRadius: 3,
                        }
                      : {},
                  }}
                >
                  <img
                    alt="Album cover preview"
                    src={coverImagePreview}
                    style={{
                      width: "100%",
                      height: "100%",

                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </Box>

                <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <FileUploader
                    handleChange={handleFileChange}
                    name="coverImage"
                    types={["JPG", "PNG", "JPEG"]}
                    multiple={false}
                    hoverTitle="Drop image here"
                    dropMessageStyle={{
                      backgroundColor: alpha(
                        theme.palette.secondary.main,
                        0.15,
                      ),
                      borderRadius: "8px",
                      border: `2px dashed ${theme.palette.secondary.main}`,
                    }}
                  >
                    <MotionBox
                      whileHover={{
                        scale: 1.01,
                        boxShadow: `0 8px 20px ${alpha(
                          theme.palette.common.black,
                          0.3,
                        )}`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                      sx={{
                        height: 192,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 3,
                        borderRadius: 2,
                        border: `1px dashed ${alpha(
                          theme.palette.secondary.main,
                          0.4,
                        )}`,
                        backgroundColor: alpha(
                          theme.palette.background.paper,
                          0.4,
                        ),
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.background.paper,
                            0.6,
                          ),
                          borderColor: alpha(theme.palette.secondary.main, 0.7),
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,

                          borderRadius: "50%",
                          background: alpha(theme.palette.secondary.main, 0.1),
                        }}
                      >
                        <CloudUpload
                          sx={{
                            fontSize: 32,
                            color: theme.palette.secondary.main,
                          }}
                        />
                      </Box>

                      <Typography
                        fontWeight={600}
                        color="text.primary"
                        sx={{ mb: 0.5 }}
                      >
                        {coverImage
                          ? "Change cover image"
                          : "Upload cover image"}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        Drag and drop or click to browse files
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 0.5, opacity: 0.7 }}
                      >
                        JPG, PNG, JPEG
                      </Typography>
                    </MotionBox>
                  </FileUploader>
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 3, opacity: 0.6 }} />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap={2}
          >
            <Button
              variant="outlined"
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={isUploading}
              sx={{
                borderColor: alpha(theme.palette.secondary.main, 0.5),
                color: theme.palette.secondary.main,
                "&:hover": {
                  borderColor: theme.palette.secondary.main,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                },
                borderRadius: 6,
                px: 3,
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              disabled={isUploading || !albumName || !coverImage}
              sx={{
                background: theme.custom.lightGradient,
                color: theme.palette.common.white,
                fontWeight: 600,
                borderRadius: 6,
                px: 3,
                py: 1,
                "&:hover": {
                  boxShadow: `0 4px 12px ${alpha(
                    theme.palette.secondary.main,
                    0.4,
                  )}`,
                },
                "&.Mui-disabled": {
                  background: alpha(theme.palette.secondary.main, 0.3),
                  color: alpha(theme.palette.common.white, 0.4),
                },
              }}
            >
              Create Album
            </Button>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default CreateAlbumDialog;
