import { Box, Typography, alpha, Paper, Fade } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import theme from "@/theme/theme";
import { motion } from "framer-motion";
import { AlbumProps } from "@/types/album";
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
import { useState } from "react";
import { PlayButtons } from "@/components/iconbuttons/IconButtons";
import LogInSuggestionDialog from "@/components/home/LogInSuggestionDialog";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const AlbumCard = (album: AlbumProps) => {
  const [isPlayButtonVisible, setPlayButtonVisible] = useState(false);
  const [showLogInDialog, setShowLogInDialog] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const handleMouseEnter = () => {
    setPlayButtonVisible(true);
  };

  const handleMouseLeave = () => {
    setPlayButtonVisible(false);
  };

  const handlePlayButtonClick = () => {
    setPlayButtonVisible(false);
    if (!isAuthenticated) {
      setShowLogInDialog(true);
      return;
    }
  };
  return (
    <MotionPaper
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      sx={{
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        borderRadius: 3,
        bgcolor: alpha(theme.palette.background.paper, 0.6),
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        cursor: "pointer",
        height: 150,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={album.coverImageUrl}
          sx={{
            width: "100%",
            height: 150,
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)",
          }}
        />
      </Box>
      <Box
        sx={{
          px: 3,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
        >
          ALBUM
        </Typography>
        <Typography variant="h5" fontWeight={700} mb={3}>
          {album.name}
        </Typography>

        <Box sx={{ display: "flex", gap: 3, color: "text.secondary" }}>
          <Typography variant="body2">10 songs</Typography>
          <Typography variant="body2">1h 42 min</Typography>
          <Typography variant="body2">{album.likesCount} likes</Typography>
        </Box>
        <Fade in={isPlayButtonVisible}>
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              zIndex: 2,
              borderRadius: "50%",
              transform: "scale(1.3)",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              transition: "all 0.2s ease",
            }}
          >
            <PlayButtons onClick={handlePlayButtonClick} />
          </Box>
        </Fade>
      </Box>
      <LogInSuggestionDialog
        open={showLogInDialog}
        onClose={() => setShowLogInDialog(false)}
      />
    </MotionPaper>
  );
};

export default AlbumCard;
