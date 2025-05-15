import { getSongsByArtist } from '@/api/music/song-api';
import { PlayButtons } from '@/components/iconbuttons/IconButtons';
import MusicCard from '@/components/music/MusicCard';
import { ArtistProps } from '@/types/artist';
import { SongProps } from '@/types/song';
import { Box, Container, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { MoreHoriz, ShareOutlined } from '@mui/icons-material';

const ArtistPage = () => {
    const location = useLocation();
    const artist = location.state as ArtistProps;
    const { id } = useParams<{ id: string }>();
    const [songs, setSongs] = useState<SongProps[]>([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(menuAnchorEl);

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
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container sx={{ padding: "10px", textAlign: "center" }}>
            <Box
                display={"flex"}
                flexDirection={"row"}
                sx={{
                    backgroundImage: `url(${artist.coverImageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    padding: "1rem",
                    borderRadius: "5px",
                    transition: "background 0.3s ease",
                    position: "relative",
                    height: "300px",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.15)",
                        borderRadius: "5px",
                    }}
                ></Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "end",
                        alignItems: "start",
                        zIndex: 1,
                        padding: "1rem",
                    }}
                >
                    <Typography variant="h6" color="white" fontWeight="bold">
                        Verified Artist
                    </Typography>
                    <Typography variant="h2" color="white" fontWeight="bold">
                        {artist.name}
                    </Typography>
                    <Typography variant="h6" color="white" fontWeight="bold">
                        32,297,653 monthly listeners
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: "2rem",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "0.5rem",
                }}
            >
                <Box sx={{ transform: "scale(2.0)" }}>
                    <PlayButtons
                        onClick={() => {

                        }}
                    />
                </Box>
               
                <Button
                    variant={isFollowing ? "outlined" : "contained"}
                    sx={{
                        color: isFollowing ? "#fff" : undefined,
                        borderColor: isFollowing ? "#fff" : undefined,
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "1rem",
                        minWidth: 100,
                        height: 40,
                    }}
                    onClick={() => setIsFollowing((prev) => !prev)}
                >
                    {isFollowing ? "Following" : "Follow"}
                </Button>
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
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                >
                    <MenuItem onClick={() => { handleMenuClose(); }}>
                        <ReportProblemOutlinedIcon sx={{ mr: 1 }} fontSize="small" /> Report
                    </MenuItem>
                    <MenuItem onClick={() => { handleMenuClose(); }}>
                        <BlockOutlinedIcon sx={{ mr: 1 }} fontSize="small" /> Don't play this artist
                    </MenuItem>
                    <MenuItem onClick={() => { handleMenuClose(); }}>
                        <InfoOutlinedIcon sx={{ mr: 1 }} fontSize="small" /> Info
                    </MenuItem>
                </Menu>
            </Box>
            <Typography variant="h6" color="white" fontWeight="bold" sx={{ marginBottom: 2, textAlign: "left" }}>
                Songs by Artist
            </Typography>
            <Stack spacing={2}>
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
                            song={{
                                coverImageUrl: song.coverImageUrl,
                                name: song.name,
                                artist: song.artist,
                                duration: song.duration ? song.duration.toString() : "N/A",
                            }}
                        />
                    </Box>
                ))}
            </Stack>
        </Container>
    )
}

export default ArtistPage
