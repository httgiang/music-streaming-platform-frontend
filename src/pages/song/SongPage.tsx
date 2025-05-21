import { useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Tooltip,
  IconButton,
  MenuItem,
} from "@mui/material";
import { SongProps } from "@/types/song";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ColorThief from "colorthief";
import { PlayButtons } from "@/components/iconbuttons/IconButtons";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { playSong } from "@/features/music/playerSlice";
import Menu from "@mui/material/Menu";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import {
  Add,
  ArrowCircleDown,
  ArrowRight,
  QueueMusic,
} from "@mui/icons-material";

const SongPage = () => {
  const [bgColor, setBgGradient] = useState<string>("rgba(0, 0, 0, 0.8)");
  const [showMore, setShowMore] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const maxLines = 10;

  const location = useLocation();
  const dispatch = useDispatch();
  const song = location.state as SongProps;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (song.coverImageUrl === "") return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src =
      song.coverImageUrl !== ""
        ? song.coverImageUrl
        : "https://via.placeholder.com/150";
    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 2);
      if (palette.length >= 2) {
        const [color1, color2] = palette;
        setBgGradient(
          `linear-gradient(135deg, rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.7), rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.9))`,
        );
      }
    };
    return () => {
      img.onload = null;
      img.onerror = null;
      img.src = "";
    };
  }, [song.coverImageUrl]);

  return (
    <Container sx={{ padding: "10px", textAlign: "center" }}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        sx={{
          background: bgColor,
          padding: "1rem ",
          borderRadius: "5px",
          transition: "background 0.3s ease",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box
          sx={{
            width: 270,
            height: 270,
            overflow: "hidden",
            borderRadius: "5px",
          }}
        >
          {song.coverImageUrl && (
            <img
              src={song.coverImageUrl}
              alt="Song"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </Box>
        <Box
          justifyContent={"center"}
          alignItems={"flex-start"}
          display={"flex"}
          flexDirection={"column"}
          marginLeft={"3rem"}
        >
          <Typography fontSize="h6" color="white" fontWeight="bold">
            Single
          </Typography>
          <Typography variant="h2" color="white" fontWeight="bold">
            {song.name}
          </Typography>
          <Typography fontSize="h6" color="white" fontWeight="bold">
            {song.artist}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Box sx={{ transform: "scale(2.0)" }}>
          <PlayButtons
            onClick={() => {
              dispatch(playSong(song));
            }}
          />
        </Box>
        {/* <Tooltip
          title={<span style={{ fontSize: "1em" }}>Add to favorite</span>}
          componentsProps={{
            tooltip: { sx: { backgroundColor: "gray" } },
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
            },
          }}
          placement="top"
        >
          <IconButton sx={{ color: "white" }}>
            <FavoriteBorderOutlinedIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Tooltip> */}
        <Tooltip
          title={<span style={{ fontSize: "1em" }}>Add to playlist</span>}
          componentsProps={{
            tooltip: { sx: { backgroundColor: "gray" } },
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
            },
          }}
          placement="top"
        >
          <IconButton sx={{ color: "white" }}>
            <AddCircleOutlineIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Tooltip>

        <Tooltip
          title={<span style={{ fontSize: "1em" }}>Share/Copy link</span>}
          componentsProps={{
            tooltip: { sx: { backgroundColor: "gray" } },
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
            },
          }}
          placement="top"
        >
          <IconButton sx={{ color: "white" }}>
            <ShareOutlined sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={<span style={{ fontSize: "1em" }}>DownLoad</span>}
          componentsProps={{
            tooltip: { sx: { backgroundColor: "gray" } },
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
            },
          }}
          placement="top"
        >
          <IconButton sx={{ color: "white" }}>
            <ArrowCircleDown sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={<span style={{ fontSize: "1em" }}>More option</span>}
          componentsProps={{
            tooltip: { sx: { backgroundColor: "gray" } },
            popper: {
              modifiers: [{ name: "offset", options: { offset: [0, -8] } }],
            },
          }}
          placement="top"
        >
          <IconButton sx={{ color: "white" }} onClick={handleMenuOpen}>
            <MoreHoriz sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={menuAnchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem
            onClick={handleMenuClose}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <QueueMusic sx={{ mr: 1 }} fontSize="small" />
              Add to queue
            </Box>
          </MenuItem>

          <MenuItem
            onClick={handleMenuClose}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Add sx={{ mr: 1 }} fontSize="small" />
              Add to playlist
            </Box>
            <ArrowRight />
          </MenuItem>

          <MenuItem
            onClick={handleMenuClose}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ReportProblemOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
              Report
            </Box>
          </MenuItem>

          <MenuItem
            onClick={handleMenuClose}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <InfoOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
              Info
            </Box>
          </MenuItem>
        </Menu>
      </Box>
      <Box display={"flex"} flexDirection={"row"} gap={"12rem"}>
        <Box
          sx={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "0.5rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginTop: "1rem", fontWeight: "bold", textAlign: "start" }}
            color="white"
          >
            Lyrics
          </Typography>
          {song?.lyric
            ?.split("\n")
            ?.slice(0, showMore ? undefined : maxLines)
            ?.map((line, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  fontSize: "0.875rem",
                  color: "text.secondary",
                  maxWidth: "600px",
                  textAlign: "start",
                }}
              >
                {line.replace(/ /g, "\u00A0")}
              </Typography>
            ))}
          {song?.lyric?.split("\n").length > maxLines && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.75rem",
                color: "white",
                cursor: "pointer",
                textAlign: "start",
                fontWeight: "bold",
              }}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "...Show more"}
            </Typography>
          )}
        </Box>
        <Box></Box>
        <Box display={"flex"} flexDirection={"row"}>
          <img
            src={song.artistImage}
            alt="Artist image"
            style={{
              width: 70,
              height: 70,
              overflow: "hidden",
              borderRadius: "50%",
              marginTop: "1rem",
              objectFit: "cover",
            }}
          />
          <Box
            display={"flex"}
            flexDirection={"column"}
            marginTop={"2rem"}
            marginLeft={"1rem"}
            alignItems={"start"}
          >
            <Typography fontSize={14} color="white">
              Artist
            </Typography>
            <Typography fontSize={14} fontWeight={"bold"} color="white">
              {song.artist}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SongPage;
