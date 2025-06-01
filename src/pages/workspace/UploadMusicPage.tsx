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
  LinearProgress,
  Divider,
  Avatar,
} from "@mui/material";
import {
  Help,
  Close,
  CloudUpload,
  MusicNote,
  Image,
  PlayArrow,
  Pause,
} from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { uploadSong } from "@/api/music/song-api";
import { useToast } from "@/contexts/ToastContext";
import { SongProps } from "@/types/song";
import { motion } from "framer-motion";
import { FileUploader } from "react-drag-drop-files";

const MotionBox = motion(Box);

const UploadMusicDialog = ({
  open,
  onClose,
  onMusicUploaded,
}: {
  open: boolean;
  onClose: () => void;
  onMusicUploaded: (song: SongProps) => void;
}) => {
  const theme = useTheme();
  const [name, setName] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [lyric, setLyric] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const showToast = useToast();
  useEffect(() => {
    if (!open) {
      setName("");
      setCoverImage(null);
      setCoverPreview(null);
      setAudioFile(null);
      setAudioPreview(null);
      setLyric("");
      setIsUploading(false);
      setUploadProgress(0);
      setIsPlaying(false);
    }
  }, [open]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleCoverImageChange = (coverImageFile: File) => {
    if (coverImageFile) {
      setCoverImage(coverImageFile);

      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(coverImageFile);
    }
  };

  const handleAudioFileChange = (audioFile: File) => {
    if (audioFile) {
      setAudioFile(audioFile);

      const url = URL.createObjectURL(audioFile);
      setAudioPreview(url);
      console.log("Audio file preview set:", url);
      setIsPlaying(false);
    }
  };

  const toggleAudioPlayback = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUploading && uploadProgress < 99) {
      interval = setInterval(() => {
        setUploadProgress((prev) => {
          const increment = Math.random() * 10;
          return Math.min(prev + increment, 99);
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isUploading, uploadProgress]);

  const uploadMusic = async () => {
    if (!name || !coverImage || !audioFile || !lyric) {
      showToast("Please fill in all fields before submitting.", "warning");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("lyric", lyric);
      formData.append("coverImage", coverImage);
      formData.append("audioFile", audioFile);

      const response = await uploadSong(formData);
      if (response?.status === 201) {
        setUploadProgress(100);
        showToast("Song uploaded successfully!", "success");
        onMusicUploaded(response.data.data.song);

        setTimeout(() => {
          setIsUploading(false);
          onClose();
        }, 1000);
      }
    } catch (error) {
      console.error("Error uploading song:", error);
      showToast("Failed to upload the song. Please try again.", "error");
      setIsUploading(false);
    }
  };

  return (
    <Dialog
      onClose={!isUploading ? onClose : undefined}
      open={open}
      className="custom-scrollbar"
      PaperProps={{
        elevation: 24,
        sx: {
          width: "100%",
          maxWidth: "650px",
          borderRadius: 3,
          backgroundColor: alpha(theme.palette.background.paper, 0.9),
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.15)}`,
        },
      }}
    >
      <Box sx={{ position: "relative", p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
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
              <CloudUpload />
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
              Upload Your Music
            </Typography>
          </Box>

          {!isUploading && (
            <IconButton
              onClick={onClose}
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

        {isUploading && (
          <Box sx={{ width: "100%", mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {uploadProgress < 100 ? "Uploading..." : "Upload complete!"}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: alpha(theme.palette.common.white, 0.1),
                "& .MuiLinearProgress-bar": {
                  background: theme.custom.gradient,
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            uploadMusic();
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                sx={{ mb: 0.75 }}
              >
                Song Title
              </Typography>
              <TextField
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                placeholder="Enter the title of your song"
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
                  Cover Image
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

              <MotionBox
                whileHover={{
                  scale: 1.01,
                  boxShadow: `0 4px 20px ${alpha(
                    theme.palette.common.black,
                    0.3,
                  )}`,
                }}
                sx={{
                  position: "relative",
                  minHeight: coverPreview ? "auto" : 120,
                  borderRadius: 2,
                  overflow: "hidden",
                  border: `1px dashed ${alpha(
                    theme.palette.secondary.main,
                    0.4,
                  )}`,
                  backgroundColor: alpha(theme.palette.background.paper, 0.4),
                }}
              >
                <FileUploader
                  id="cover-image-input"
                  handleChange={handleCoverImageChange}
                  name="coverImage"
                  types={["JPG", "PNG", "JPEG"]}
                  multiple={false}
                >
                  {coverPreview ? (
                    <Box
                      sx={{
                        display: "flex",
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 100,
                        cursor: "pointer",
                        p: 1,
                      }}
                    >
                      <img
                        src={coverPreview}
                        alt="Cover Preview"
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 100,
                        cursor: "pointer",
                        p: 2,
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.secondary.main,
                            0.05,
                          ),
                        },
                      }}
                    >
                      <Image
                        sx={{
                          fontSize: 40,
                          color: alpha(theme.palette.secondary.main, 0.7),
                          mb: 1,
                        }}
                      />
                      <Typography color="text.secondary" align="center">
                        Drag and drop files or click to upload cover image
                      </Typography>
                    </Box>
                  )}
                </FileUploader>
              </MotionBox>
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
                  Audio File
                </Typography>
                <Tooltip title="MP3 or WAV format (max 50MB)" placement="right">
                  <Help
                    sx={{
                      fontSize: 16,
                      color: alpha(theme.palette.common.white, 0.7),
                    }}
                  />
                </Tooltip>
              </Box>

              <MotionBox
                whileHover={
                  !audioPreview
                    ? {
                        scale: 1.01,
                        boxShadow: `0 4px 20px ${alpha(
                          theme.palette.common.black,
                          0.3,
                        )}`,
                      }
                    : {}
                }
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  border: `1px dashed ${alpha(
                    theme.palette.secondary.main,
                    0.4,
                  )}`,
                  backgroundColor: alpha(theme.palette.background.paper, 0.4),
                }}
              >
                <FileUploader
                  types={["MP3", "WAV"]}
                  multiple={false}
                  id="audio-file-input"
                  style={{ display: "none" }}
                  handleChange={handleAudioFileChange}
                  required
                >
                  {audioFile ? (
                    <Box sx={{ p: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                          }}
                        >
                          <IconButton
                            onClick={toggleAudioPlayback}
                            sx={{
                              backgroundColor: theme.palette.secondary.main,
                              width: 36,
                              height: 36,
                              "&:hover": {
                                backgroundColor: theme.palette.secondary.dark,
                              },
                            }}
                          >
                            {isPlaying ? <Pause /> : <PlayArrow />}
                          </IconButton>

                          <Typography fontWeight={500}>
                            {audioFile?.name}
                          </Typography>
                        </Box>

                        <label htmlFor="audio-file-input">
                          <Button
                            component="span"
                            variant="outlined"
                            size="small"
                            sx={{ textTransform: "none" }}
                          >
                            Change file
                          </Button>
                        </label>
                      </Box>

                      <audio
                        ref={audioRef}
                        src={audioPreview || undefined}
                        style={{ display: "none" }}
                      />
                    </Box>
                  ) : (
                    <label htmlFor="audio-file-input">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 100,
                          cursor: "pointer",
                          p: 2,
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.secondary.main,
                              0.05,
                            ),
                          },
                        }}
                      >
                        <MusicNote
                          sx={{
                            fontSize: 40,
                            color: alpha(theme.palette.secondary.main, 0.7),
                            mb: 1,
                          }}
                        />
                        <Typography color="text.secondary" align="center">
                          Click to upload audio file
                        </Typography>
                      </Box>
                    </label>
                  )}
                </FileUploader>
              </MotionBox>
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
                  Lyrics
                </Typography>
                <Tooltip
                  title="Format as you want it displayed to listeners"
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

              <TextField
                fullWidth
                required
                variant="outlined"
                value={lyric}
                onChange={(e) => setLyric(e.target.value)}
                placeholder="Enter your song lyrics here..."
                multiline
                minRows={10}
                maxRows={15}
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
          </Box>

          <Divider sx={{ my: 3, opacity: 0.6 }} />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {audioPreview && (
              <Button
                startIcon={isPlaying ? <Pause /> : <PlayArrow />}
                onClick={toggleAudioPlayback}
                variant="text"
                sx={{
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  },
                }}
              >
                <Typography>
                  {isPlaying ? "Pause preview" : "Preview song"}
                </Typography>
              </Button>
            )}

            <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                onClick={onClose}
                disabled={isUploading}
                sx={{
                  borderColor: alpha(theme.palette.secondary.main, 0.5),
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    borderColor: theme.palette.secondary.main,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  },
                  borderRadius: 6,
                }}
              >
                Cancel
              </Button>

              <MotionBox
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  type="submit"
                  disabled={
                    isUploading || !name || !coverImage || !audioFile || !lyric
                  }
                  sx={{
                    background: theme.custom.lightGradient,
                    color: theme.palette.common.white,
                    fontWeight: 600,
                    borderRadius: 6,
                    px: 3,
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
                  Upload Song
                </Button>
              </MotionBox>
            </Box>
          </Box>
        </form>
      </Box>
    </Dialog>
  );
};

export default UploadMusicDialog;
