import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Card,
  Fade,
  alpha,
  IconButton,
} from "@mui/material";
import { MusicNote, PlayArrow } from "@mui/icons-material";
import { SongProps } from "@/types/song";
import { getLikedSongs } from "@/api/music/song-api";
import MusicCard from "@/components/music/MusicCard";
import { useDispatch } from "react-redux";
import { playSong } from "@/features/music/playerSlice";
import theme from "@/theme/theme";

const LikedSongsPage = () => {
  const [songs, setSongs] = useState<SongProps[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [bgColor, setBgGradient] = useState<string>("rgba(0, 0, 0, 0.8)");
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoaded(true), 100);
    setBgGradient(`linear-gradient(135deg, 
      ${alpha(theme.palette.secondary.main, 0.4)} 0%,
      ${alpha(theme.palette.primary.main, 0.3)} 100%)`
    );
  }, []);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        console.log("Starting to fetch liked songs...");
        const likedSongs = await getLikedSongs();
        console.log("Backend Response Data:", likedSongs);

        if (Array.isArray(likedSongs)) {
          const validSongs = likedSongs.filter(song => song && song.id && song.name);
          console.log(`Total songs received: ${likedSongs.length}, Valid songs: ${validSongs.length}`);
          
          setSongs(validSongs);
        } 
      } catch (error: any) {
        console.error("Failed to fetch liked songs:", error);
        if (error.response?.data) {
          console.log("Error Response:", error.response.data);
        }
        setSongs([]);
      }
    };
      fetchLikedSongs();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 3, position: "relative", zIndex: 1 }}>
      <Fade in={loaded} timeout={800}>
        <Card
          sx={{
            background: bgColor,
            backdropFilter: "blur(20px)",
            border: `1px solid ${alpha("#fff", 0.2)}`,
            borderRadius: 4,
            p: 4,
            overflow: "hidden",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: `0 20px 60px ${alpha("#000", 0.4)}`,
            },
          }}
        >
          <Box sx={{ display: "flex", gap: 5, alignItems: "center" }}>
            <Box sx={{ flexShrink: 0, position: "relative" }}>              <Box
                sx={{
                  width: 280,
                  height: 280,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.8)}, ${alpha(theme.palette.primary.main, 0.6)})`,
                  boxShadow: `0 15px 40px ${alpha("#000", 0.5)}`,
                }}
              >
                <MusicNote sx={{ fontSize: 100, color: alpha("#fff", 0.9) }} />
              </Box>
            </Box>
            <Stack spacing={2} sx={{ flex: 1, minWidth: 0, textAlign: "left" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MusicNote
                  sx={{ color: alpha("#fff", 0.7), fontSize: "1.2rem" }}
                />
                <Typography
                  variant="overline"
                  sx={{
                    color: alpha("#fff", 0.8),
                    fontWeight: 600,
                    letterSpacing: 2,
                  }}
                >
                  Playlist
                </Typography>
              </Box>
              <Typography
                variant="h2"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  wordBreak: "break-word",
                  textShadow: `0 4px 20px ${alpha("#000", 0.5)}`,
                }}
              >
                Liked Songs
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: alpha("#fff", 0.9),
                  fontWeight: 500,
                  textShadow: `0 2px 10px ${alpha("#000", 0.3)}`,
                }}
              >
                {songs.length} songs
              </Typography>
            </Stack>
            <Box 
              onClick={() => songs.length > 0 && dispatch(playSong(songs[0]))}
              sx={{ cursor: "pointer" }}
            >
              <IconButton>
                <PlayArrow
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: "white",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Card>
      </Fade>

      <Stack spacing={2} sx={{ mt: 4 }}>
        {songs.map((song) => (
          <Box
            key={song.id}
            sx={{
              "&:hover": {
                backgroundColor: "#484848",
                borderRadius: "8px",
                transition: "background-color 0.3s ease",
              },
              padding: 1,
            }}
          >
            <MusicCard
              key={song.id}
              song={song}
            />
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default LikedSongsPage;
