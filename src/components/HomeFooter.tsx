import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Container, Stack, Typography, Link, Box, IconButton, Divider } from "@mui/material";

const HomeFooter = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>

        <Box sx={{ display: 'flex', flexDirection: 'row'}} flex={10}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
        <Typography variant="body1" gutterBottom sx={{fontWeight: 'bold'}}>
            Company
        </Typography>
        <Stack spacing={1}>
            <Link 
                  
                color="textSecondary" 
                sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' }}}
            >
                About
            </Link>
            <Link 
                  
                color="textSecondary" 
                sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
                Jobs
            </Link>
            <Link 
                  
                color="textSecondary" 
                sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
                For the Record
            </Link>
        </Stack>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
        <Typography variant="body1" gutterBottom sx={{fontWeight: 'bold'}} >
            Communites
        </Typography>
        <Stack spacing={1}>
        <Link 
              
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          For Artists
        </Link>
        <Link 
              
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Developers
        </Link>
        <Link 
              
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Advertising
        </Link>
        <Link 
              
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Investors
        </Link>
        <Link 
              
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Vendors
        </Link>
      </Stack>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
        <Typography variant="body1" gutterBottom sx={{fontWeight: 'bold'}}>
           Usefull Links
        </Typography>
        <Stack spacing={1}>
        <Link 
              
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Support
        </Link>
        <Link 
              
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Free Mobile App
        </Link>
      </Stack>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
        <Typography variant="body1" gutterBottom sx={{fontWeight: 'bold'}}>
            Groovity Plans
        </Typography>
        <Stack spacing={1}>
        <Link 
              
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Noble Individual
        </Link>
        <Link 
              
            color="textSecondary" 
            sx={{fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Noble Student
        </Link>
        <Link 
              
            color="textSecondary" 
            sx={{fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Groovity Commoners
        </Link>
      </Stack>
    </Box>
            </Box>
<Box display="flex" flex={2} alignItems={"flex-start"} justifyContent={"flex-end"} flexDirection={'row'} sx={{ padding: '20px', gap: '10px' }} >
    <IconButton sx={{ bgcolor: "#333", "&:hover": { bgcolor: "#555" } ,height:"30px" ,width:"30px"}}>
        <Instagram sx={{ color: "white",height:"20px" ,width:"20px" }} />
    </IconButton>
    <IconButton sx={{ bgcolor: "#333", "&:hover": { bgcolor: "#555" },height:"30px" ,width:"30px" }}>
        <Twitter sx={{ color: "white" ,height:"20px" ,width:"20px"}} />
    </IconButton>
    <IconButton sx={{ bgcolor: "#333", "&:hover": { bgcolor: "#555" },height:"30px" ,width:"30px" }}>
        <Facebook sx={{ color: "white",height:"20px" ,width:"20px" }} />
    </IconButton>
</Box>
        </Box>
    
        <Divider sx={{ bgcolor: "gray", mb: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'row'}} flex={10}>
            <Box >      
            <Typography
                variant="body2"
                sx={{ marginTop: 0, display: 'flex', gap: 2 }}
            >
                <Link
                     
                    color="textSecondary"
                    sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Legal
                </Link>

                <Link
                     
                    color="textSecondary"
                    sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Safety & Privacy Center
                </Link>

                <Link
                     
                    color="textSecondary"
                    sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Privacy Policy
                </Link>

                <Link
                     
                    color="textSecondary"
                    sx={{fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Cookies
                </Link>

                <Link
                     
                    color="textSecondary"
                    sx={{fontSize: '14px',textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    About Ads
                </Link>

                <Link
                    
                    color="textSecondary"
                    sx={{fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Accessibility
                </Link>
            </Typography>

            </Box>
<Box display="flex"  flex={2}  justifyContent={"flex-end"}    >
<Typography
        variant="body2"
        align="center"
      >
        © 2025 Groovity
      </Typography>
    </Box>
        </Box>
    
</Container>
  );
};

export default HomeFooter;

