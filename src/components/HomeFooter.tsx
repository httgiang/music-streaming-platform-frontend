import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Container, Stack, Typography, Link, Box, IconButton, Divider } from "@mui/material";

const HomeFooter = () => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>

        <Box sx={{ display: 'flex', flexDirection: 'row'}} flex={10}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
        <Typography variant="body1" gutterBottom >
            Company
        </Typography>
        <Stack spacing={1}>
            <Link 
                href="#" 
                color="textSecondary" 
                sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' }}}
            >
                About
            </Link>
            <Link 
                href="#" 
                color="textSecondary" 
                sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
                Jobs
            </Link>
            <Link 
                href="#" 
                color="textSecondary" 
                sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
                For the Record
            </Link>
        </Stack>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
        <Typography variant="body1" gutterBottom >
            Communites
        </Typography>
        <Stack spacing={1}>
        <Link 
            href="#" 
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          For Artists
        </Link>
        <Link 
            href="#" 
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Developers
        </Link>
        <Link 
            href="#" 
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Advertising
        </Link>
        <Link 
            href="#" 
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Investors
        </Link>
        <Link 
            href="#" 
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Vendors
        </Link>
      </Stack>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
        <Typography variant="body1" gutterBottom >
           Usefull Links
        </Typography>
        <Stack spacing={1}>
        <Link 
            href="#" 
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Support
        </Link>
        <Link 
            href="#" 
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Free Mobile App
        </Link>
      </Stack>
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px' }}>
        <Typography variant="body1" gutterBottom >
            Groovity Plans
        </Typography>
        <Stack spacing={1}>
        <Link 
            href="#" 
            color="textSecondary" 
            sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Noble Individual
        </Link>
        <Link 
            href="#" 
            color="textSecondary" 
            sx={{fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Noble Student
        </Link>
        <Link 
            href="#" 
            color="textSecondary" 
            sx={{fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          Groovity Commoners
        </Link>
      </Stack>
    </Box>
            </Box>
<Box display="flex" flex={2} alignItems={"flex-start"} justifyContent={"flex-end"} flexDirection={'row'} sx={{ padding: '20px', gap: '10px' }} >
    <IconButton sx={{ bgcolor: "#333", "&:hover": { bgcolor: "#555" } }}>
        <Instagram sx={{ color: "white" }} />
    </IconButton>
    <IconButton sx={{ bgcolor: "#333", "&:hover": { bgcolor: "#555" } }}>
        <Twitter sx={{ color: "white" }} />
    </IconButton>
    <IconButton sx={{ bgcolor: "#333", "&:hover": { bgcolor: "#555" } }}>
        <Facebook sx={{ color: "white" }} />
    </IconButton>
</Box>
        </Box>
    
        <Divider sx={{ bgcolor: "gray", mb: 2 }} />

        <Box sx={{ display: 'flex', flexDirection: 'row'}} flex={10}>
            <Box >      
            <Typography
                variant="body2"
                sx={{ marginTop: 4, display: 'flex', gap: 2 }}
            >
                <Link
                    href="#"
                    color="textSecondary"
                    sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Legal
                </Link>

                <Link
                    href="#"
                    color="textSecondary"
                    sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Safety & Privacy Center
                </Link>

                <Link
                    href="#"
                    color="textSecondary"
                    sx={{ fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Privacy Policy
                </Link>

                <Link
                    href="#"
                    color="textSecondary"
                    sx={{fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Cookies
                </Link>

                <Link
                    href="#"
                    color="textSecondary"
                    sx={{fontSize: '14px',textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    About Ads
                </Link>

                <Link
                    href="#"
                    color="textSecondary"
                    sx={{fontSize: '14px', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                    Accessibility
                </Link>
            </Typography>

            </Box>
<Box display="flex"  flex={2} alignItems={"flex-start"} justifyContent={"flex-end"}  flexDirection={'row'} sx={{ padding: '20px' }}>
<Typography
        variant="body2"
        align="center"
        sx={{ marginTop: 2 }}
      >
        © 2025 Groovity AB
      </Typography>
    </Box>
        </Box>
    
</Container>
  );
};

export default HomeFooter;

