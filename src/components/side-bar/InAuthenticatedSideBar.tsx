import { Box, Button, Typography, Stack, alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogInSuggestionDialog from "../home/LogInSuggestionDialog";
import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

interface StyledCardProps {
  children: ReactNode;
  isPrimary?: boolean;
  onClick?: () => void;
}

interface ActionButtonProps {
  children: ReactNode;
  onClick: () => void;
  isPrimary?: boolean;
}

const StyledCard: React.FC<StyledCardProps> = ({
  children,
  isPrimary = false,
  onClick,
}) => (
  <Box
    component={motion.div}
    whileHover={{
      y: -4,
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    onClick={onClick}
    sx={{
      borderRadius: 3,
      overflow: "hidden",
      mb: 1,
      position: "relative",
      cursor: onClick ? "pointer" : "default",
      boxShadow: isPrimary
        ? "0 10px 20px rgba(139, 69, 255, 0.2)"
        : "0 6px 16px rgba(0, 0, 0, 0.1)",
      border: isPrimary
        ? "1px solid rgba(171, 71, 188, 0.3)"
        : "1px solid rgba(255, 255, 255, 0.08)",
    }}
  >
    <Box
      sx={{
        p: 2,
        // height: "90%",
        background: isPrimary
          ? "linear-gradient(135deg, #B39DDB 0%, #A78BFA 100%)"
          : alpha("#1a1a1a", 0.7),
        backdropFilter: "blur(10px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {isPrimary && (
        <Box
          component={motion.div}
          animate={{
            rotate: [0, 10, -10, 5, -5, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
          }}
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background:
              "linear-gradient(45deg, #FFD54F 0%, rgba(255, 213, 79, 0.3) 100%)",
            filter: "blur(25px)",
            zIndex: -1,
          }}
        />
      )}
      {children}
    </Box>
  </Box>
);

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  isPrimary = false,
}) => (
  <Button
    variant={isPrimary ? "contained" : "outlined"}
    onClick={onClick}
    endIcon={<ArrowForwardIcon />}
    sx={{
      px: 2.5,

      borderRadius: 8,
      textTransform: "none",
      alignSelf: "flex-end",
      backgroundColor: isPrimary ? "#B39DDB" : "transparent",
      borderColor: isPrimary ? "transparent" : "#B39DDB",
      color: isPrimary ? "#000" : "#B39DDB",
      boxShadow: isPrimary ? "0 4px 14px rgba(179, 157, 219, 0.3)" : "none",
      "&:hover": {
        backgroundColor: isPrimary ? "#A78BFA" : "rgba(179, 157, 219, 0.1)",
        borderColor: isPrimary ? "transparent" : "#A78BFA",
      },
    }}
  >
    {children}
  </Button>
);

const InAuthenticatedSideBar: React.FC = () => {
  const [openLogInDialog, setOpenLogInDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenLogInDialog = (): void => {
    setOpenLogInDialog(true);
  };

  const handleCloseLogInDialog = (): void => {
    setOpenLogInDialog(false);
  };

  return (
    <Stack spacing={2}>
      <StyledCard onClick={handleOpenLogInDialog}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              bgcolor: "rgba(179, 157, 219, 0.15)",
              borderRadius: "50%",
              p: 1,
              mr: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LibraryMusicIcon sx={{ color: "#B39DDB", fontSize: 24 }} />
          </Box>
          <Typography
            fontSize={18}
            fontWeight={700}
            sx={{
              background: "linear-gradient(90deg, #B39DDB, #A78BFA)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "0.02em",
            }}
          >
            Build your first library
          </Typography>
        </Box>

        <Typography
          fontSize={14}
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
            mb: 3,
            maxWidth: "90%",
          }}
        >
          Save songs, create playlists, and organize your music collection in
          one place.
        </Typography>

        <ActionButton onClick={handleOpenLogInDialog}>
          <Typography fontSize={14} fontWeight={600}>
            Create playlist
          </Typography>
        </ActionButton>
      </StyledCard>

      <StyledCard isPrimary={true} onClick={() => navigate("/log-in")}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "50%",
              p: 1,
              mr: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LockOpenIcon sx={{ color: "#fff", fontSize: 24 }} />
          </Box>
          <Typography
            fontSize={18}
            fontWeight={700}
            sx={{
              color: "white",
              letterSpacing: "0.02em",
            }}
          >
            Unlock unlimited music
          </Typography>
        </Box>

        <Typography
          fontSize={14}
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            lineHeight: 1.6,
            mb: 3,
            maxWidth: "90%",
          }}
        >
          Sign in to Groovity to access millions of songs and create your
          perfect musical experience.
        </Typography>

        <ActionButton isPrimary={true} onClick={() => navigate("/log-in")}>
          <Typography fontSize={14} fontWeight={600}>
            Sign in
          </Typography>
        </ActionButton>
      </StyledCard>

      <LogInSuggestionDialog
        open={openLogInDialog}
        onClose={handleCloseLogInDialog}
      />
    </Stack>
  );
};

export default InAuthenticatedSideBar;
