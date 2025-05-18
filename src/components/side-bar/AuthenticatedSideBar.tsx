import {
  Box,
  Button,
  Typography,
  Tabs,
  Tab,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
import SailorSongPic from "@/assets/sailor-song.jpg";
import PlaylistHorizontalCard from "../music/PlaylistHorizontalCard";

const AuthenticatedSideBar = () => {
  const [tabValue, setTabValue] = useState("playlists");

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const dummyPlaylists = [
    {
      id: 1,
      title: "Liked songs",
      creator: "gishyei",
      image: SailorSongPic,
      songs: [],
    },
    {
      id: 2,
      title: "Liked songs",
      creator: "gishyei",
      image: SailorSongPic,
      songs: [],
    },
    {
      id: 3,
      title: "Liked songs",
      creator: "gishyei",
      image: SailorSongPic,
      songs: [],
    },
    {
      id: 4,
      title: "Liked songs",
      creator: "gishyei",
      image: SailorSongPic,
      songs: [],
    },
    {
      id: 5,
      title: "Liked songs",
      creator: "gishyei",
      image: SailorSongPic,
      songs: [],
    },
  ];
  return (
    <>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <Stack spacing={0.5}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize={18} fontWeight="bold">
              Your library
            </Typography>
            <Button variant="outlined" onClick={handleClickMenu}>
              <AddOutlinedIcon /> <Typography>Create</Typography>
            </Button>
          </Box>
          <Menu
            id="create-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
          >
            <MenuItem>
              <PlaylistAddIcon sx={{ marginRight: "1px" }} />{" "}
              <Typography>Create playlist</Typography>
            </MenuItem>
            <MenuItem>
              <FileUploadIcon sx={{ marginRight: "1px" }} />{" "}
              <Typography>Upload songs</Typography>
            </MenuItem>
          </Menu>
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            aria-label="library-tabs"
            variant="fullWidth"
          >
            <Tab
              sx={{ fontSize: 14, fontWeight: 700, textTransform: "none" }}
              value="playlists"
              label="Playlists"
            ></Tab>
            <Tab
              sx={{ fontSize: 14, fontWeight: 700, textTransform: "none" }}
              value="your-uploads"
              label="Your uploads"
            ></Tab>
          </Tabs>
          <Stack
            spacing={2}
            sx={{ overflowY: "auto" }}
            className="custom-scrollbar"
          >
            {dummyPlaylists.map((playlist) => (
              <PlaylistHorizontalCard key={playlist.id} playlist={playlist} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default AuthenticatedSideBar;
