import { ArtistProps } from '@/types/artist';
import { Box, Container, Typography } from '@mui/material';
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ArtistPage = () => {
    const location = useLocation();
    const artist = location.state as ArtistProps;

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  
    return (
  <Container sx={{ padding: "10px", textAlign: "center" }}> 
        <Box
            display={"flex"}
            flexDirection={"row"}
            sx={{
                backgroundImage: `url(${artist.image})`, 
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
        </Container>
  )
}

export default ArtistPage
