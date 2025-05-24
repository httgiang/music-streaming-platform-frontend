import { getSongsByArtist } from "@/api/music/song-api";
import { PlayButtons } from "@/components/iconbuttons/IconButtons";
import MusicCard from "@/components/music/MusicCard";
import { ArtistProps } from "@/types/artist";
import { SongProps } from "@/types/song";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Fade,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  MoreHoriz,
  ShareOutlined,
  VerifiedOutlined,
  HeadphonesOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";

const ArtistPage = () => {
  const location = useLocation();
  const artist = location.state as ArtistProps;
  const { id } = useParams<{ id: string }>();
  const [songs, setSongs] = useState<SongProps[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const [displayLimit, setDisplayLimit] = useState(5);
  const [fetching] = useState(false);
  const theme = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      if (id) {
        console.log("Fetching songs for artistId:", id);
        const artistSongs = await getSongsByArtist(id, 50); // Request more songs
        console.log("Fetched songs:", artistSongs);
        setSongs(artistSongs);
      }
    };
    fetchSongs();
  }, [id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container
      maxWidth="xl"
      sx={{ padding: "20px", textAlign: "center", overflow: "hidden" }}
    >
      <Box
        sx={{
          position: "relative",
          backgroundImage: `url(${artist.coverImageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: "12px",
          height: "380px",
          mb: 3,
          overflow: "hidden",
          boxShadow: "0 8px 16px rgba(0,0,0,0.25)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.005)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)`,
            borderRadius: "12px",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            padding: "2rem",
            zIndex: 2,
            textAlign: "left",
          }}
        >
          <Fade in timeout={1000}>
            <Box>
              <Chip
                icon={<VerifiedOutlined fontSize="small" />}
                label="Verified Artist"
                sx={{
                  color: "white",
                  backgroundColor: alpha(theme.palette.primary.main, 0.6),
                  mb: 1,
                  backdropFilter: "blur(8px)",
                  fontWeight: 500,
                }}
              />

              <Typography
                variant="h1"
                color="white"
                fontWeight="800"
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  mb: 1,
                }}
              >
                {artist.name}
              </Typography>

              <Box display="flex" alignItems="center" gap={1}>
                <HeadphonesOutlined
                  fontSize="small"
                  sx={{ color: "white", opacity: 0.7 }}
                />
                <Typography
                  variant="body1"
                  color="white"
                  sx={{ opacity: 0.7, fontWeight: 500 }}
                >
                  32,297,653 monthly listeners
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
          px: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              transform: "scale(1.5)",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.6)",
              },
            }}
          >
            <PlayButtons onClick={() => {}} />
          </Box>

          <Button
            variant={isFollowing ? "outlined" : "contained"}
            sx={{
              color: isFollowing ? "#fff" : undefined,
              borderColor: isFollowing ? "#fff" : undefined,
              fontWeight: "600",
              textTransform: "none",
              fontSize: "0.95rem",
              minWidth: 110,
              height: 42,
              borderRadius: "30px",
              px: 3,
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.03)",
                backgroundColor: isFollowing ? alpha("#fff", 0.12) : undefined,
              },
            }}
            onClick={() => setIsFollowing((prev) => !prev)}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </Box>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Tooltip
            title={<Typography variant="body2">Share</Typography>}
            arrow
            placement="top"
          >
            <IconButton
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.1),
                },
              }}
            >
              <ShareOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={<Typography variant="body2">More options</Typography>}
            arrow
            placement="top"
          >
            <IconButton
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.1),
                },
              }}
              onClick={handleMenuOpen}
            >
              <MoreHoriz />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                minWidth: 200,
                borderRadius: 2,
                backgroundColor: "#282828",
              },
            }}
            TransitionComponent={Fade}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
              }}
              sx={{ py: 1.2, "&:hover": { backgroundColor: "#333" } }}
            >
              <ReportProblemOutlinedIcon sx={{ mr: 1.5 }} fontSize="small" />{" "}
              Report
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
              }}
              sx={{ py: 1.2, "&:hover": { backgroundColor: "#333" } }}
            >
              <BlockOutlinedIcon sx={{ mr: 1.5 }} fontSize="small" /> Don't play
              this artist
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
              }}
              sx={{ py: 1.2, "&:hover": { backgroundColor: "#333" } }}
            >
              <InfoOutlinedIcon sx={{ mr: 1.5 }} fontSize="small" /> Info
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box sx={{ textAlign: "left" }}>
        <Typography
          variant="h5"
          color="white"
          fontWeight="700"
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
          }}
        >
          Popular Tracks
        </Typography>

        <Stack spacing={0.5}>
          {songs.slice(0, displayLimit).map((song, index) => (
            <Box
              key={song.id}
              sx={{
                position: "relative",
                backgroundColor: "transparent",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: alpha("#fff", 0.05),
                  transform: "translateY(-2px)",
                },
              }}
            >
              <MusicCard
                key={song.id}
                song={{
                  id: song.id,
                  coverImageUrl: song.coverImageUrl,
                  name: song.name,
                  artist: song.artist,
                  duration: song.duration ? song.duration : 0,
                  lyric: song.lyric,
                  artistImage: song.artistImage,
                }}
              />
            </Box>
          ))}
        </Stack>

        {!fetching && songs.length > displayLimit && displayLimit < 10 && (
          <Button
            variant="text"
            startIcon={<KeyboardArrowDownOutlined />}
            sx={{
              mt: 2,
              color: "#aaa",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: alpha("#fff", 0.05),
                color: "#fff",
              },
            }}
            onClick={() => setDisplayLimit(10)}
          >
            Show more
          </Button>
        )}

        {!fetching && displayLimit === 10 && songs.length > 5 && (
          <Button
            variant="text"
            startIcon={<KeyboardArrowUpOutlined />}
            sx={{
              mt: 2,
              color: "#aaa",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: alpha("#fff", 0.05),
                color: "#fff",
              },
            }}
            onClick={() => setDisplayLimit(5)}
          >
            Show less
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default ArtistPage;
