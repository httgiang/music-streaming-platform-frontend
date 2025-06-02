import {
  Box,
  Button,
  Typography,
  Stack,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CollectionsIcon from "@mui/icons-material/Collections";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { useState } from "react";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// const recentlyPlayed = [
//   {
//     id: 1,
//     title: "Blinding Lights",
//     artist: "The Weeknd",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 2,
//     title: "Sunflower",
//     artist: "Post Malone, Swae Lee",
//     image: "https://via.placeholder.com/40",
//   },
//   {
//     id: 3,
//     title: "Stay",
//     artist: "The Kid LAROI",
//     image: "https://via.placeholder.com/40",
//   },
// ];

const NavButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}> = ({ icon, label, active = false, onClick }) => (
  <Button
    startIcon={icon}
    onClick={onClick}
    fullWidth
    sx={{
      justifyContent: "flex-start",
      color: active ? "#B39DDB" : "text.primary",
      backgroundColor: active ? alpha("#B39DDB", 0.1) : "transparent",
      borderRadius: 2,
      py: 1.2,
      px: 2,
      textTransform: "none",
      fontWeight: active ? 600 : 400,
      "&:hover": {
        backgroundColor: alpha("#B39DDB", 0.08),
      },
    }}
  >
    {label}
  </Button>
);

const AuthenticatedSideBar: React.FC = () => {
  const [activeNav, setActiveNav] = useState("home");
  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const recentlyPlayed = useSelector(
    (state: RootState) => state.player.recentlyPlayedSongs,
  );
  const handleCreatePlaylist = () => {
    console.log("Create new playlist");
  };

  return (
    <Stack spacing={1.5} sx={{ height: "100%", width: "100%" }}>
      <Box sx={{ mb: 1 }}>
        <NavButton
          icon={<HomeIcon />}
          label="Home"
          active={activeNav === "home"}
          onClick={() => {
            setActiveNav("home");
            navigateTo("/");
          }}
        />{" "}
        <NavButton
          icon={<SearchIcon />}
          label="Search"
          active={activeNav === "search"}
          onClick={() => {
            setActiveNav("search");
            navigateTo("/search");
          }}
        />
        <NavButton
          icon={<CollectionsIcon />}
          label="Gallery"
          active={activeNav === "gallery"}
          onClick={() => {
            setActiveNav("gallery");
            navigateTo("/gallery");
          }}
        />
        <NavButton
          icon={<ExploreIcon />}
          label="Discover"
          active={activeNav === "discover"}
          onClick={() => {
            setActiveNav("discover");
            navigateTo("/discover");
          }}
        />
      </Box>

      <Divider sx={{ my: 0.5, borderColor: alpha("#fff", 0.1) }} />

      <Typography
        variant="subtitle2"
        sx={{
          px: 2,
          fontWeight: 700,
          color: alpha("#fff", 0.7),
          textTransform: "uppercase",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
        }}
      >
        Your Music
      </Typography>

      <Box>
        <NavButton
          icon={<FavoriteIcon />}
          label="Liked Songs"
          active={activeNav === "liked"}
          onClick={() => {
            setActiveNav("liked");
            navigateTo("/liked-songs");
          }}
        />
        <NavButton
          icon={<QueueMusicIcon />}
          label="Your Playlists"
          active={activeNav === "playlists"}
          onClick={() => {
            setActiveNav("playlists");
            navigateTo("/playlists");
          }}
        />
      </Box>

      <Box sx={{ px: 1.5 }}>
        <Button
          variant="outlined"
          startIcon={<CreateNewFolderIcon />}
          onClick={handleCreatePlaylist}
          fullWidth
          sx={{
            borderColor: "#B39DDB",
            color: "#B39DDB",
            justifyContent: "flex-start",
            textTransform: "none",
            py: 1,
            borderRadius: 2,
            "&:hover": {
              borderColor: "#A78BFA",
              backgroundColor: alpha("#B39DDB", 0.1),
            },
          }}
        >
          Create Playlist
        </Button>
      </Box>

      <Divider sx={{ my: 0.5, borderColor: alpha("#fff", 0.1) }} />

      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", px: 2, mb: 1 }}>
          <AccessTimeIcon
            sx={{ color: alpha("#fff", 0.7), fontSize: 18, mr: 1 }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: alpha("#fff", 0.7),
              textTransform: "uppercase",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
            }}
          >
            Recently Played
          </Typography>
        </Box>

        <List dense sx={{ py: 0 }}>
          {recentlyPlayed?.map((item) => (
            <ListItem
              disablePadding
              key={item.id}
              component={motion.div}
              whileHover={{ x: 4 }}
              sx={{
                borderRadius: 2,
                px: 1.5,
                py: 0.5,

                "&:hover": {
                  backgroundColor: alpha("#B39DDB", 0.08),
                },
              }}
            >
              <ListItemAvatar sx={{ minWidth: 50 }}>
                <Avatar
                  src={item.coverImageUrl || ""}
                  alt={item.artist}
                  variant="rounded"
                  sx={{ width: 40, height: 40 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2" noWrap sx={{ fontWeight: 500 }}>
                    {item.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" noWrap color="text.secondary">
                    {item.artist}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Stack>
  );
};

export default AuthenticatedSideBar;
