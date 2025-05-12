import { getSongsByArtist } from '@/api/music/song-api';
import MusicCard from '@/components/music/MusicCard';
import { ArtistProps } from '@/types/artist';
import { SongProps } from '@/types/song';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

const ArtistPage = () => {
    const location = useLocation();
    const artist = location.state as ArtistProps;
    const { id } = useParams<{ id: string }>();
  const [songs, setSongs] = useState<SongProps[]>([]);

  useEffect(() => {
    const fetchSongs = async () => {
      if (id) {
        console.log("Fetching songs for artistId:", id); // Debugging log
        const artistSongs = await getSongsByArtist(id, 50); // Request more songs
        console.log("Fetched songs:", artistSongs); // Debugging log
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
      <Typography variant="h6" color="white" fontWeight="bold" sx={{ marginBottom: 2,textAlign: "left"  }}>
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
                              
                                    ><MusicCard
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
