import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import {
  Container,
  Typography,
  Link,
  Box,
  IconButton,
  Divider,
  Grid,
  useTheme,
  alpha,
  Stack,
} from "@mui/material";

const FooterLink = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Link
      href="#"
      underline="none"
      sx={{
        color: alpha(theme.palette.common.white, 0.7),
        fontSize: "14px",
        transition: "all 0.2s ease",
        "&:hover": {
          color: theme.palette.common.white,
          transform: "translateX(3px)",
        },
        display: "inline-block",
      }}
    >
      {children}
    </Link>
  );
};

const FooterColumn = ({ title, links }: { title: string; links: string[] }) => {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          color: theme.palette.common.white,
          fontWeight: 700,
          mb: 2,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>

      <Stack spacing={1.5}>
        {links.map((link, index) => (
          <FooterLink key={index}>{link}</FooterLink>
        ))}
      </Stack>
    </Box>
  );
};

const HomeFooter = () => {
  const theme = useTheme();

  const footerColumns = [
    {
      title: "Company",
      links: ["About", "Jobs", "For the Record"],
    },
    {
      title: "Communities",
      links: [
        "For Artists",
        "Developers",
        "Advertising",
        "Investors",
        "Vendors",
      ],
    },
    {
      title: "Useful Links",
      links: ["Support", "Free Mobile App"],
    },
    {
      title: "Groovity Plans",
      links: ["Noble Individual", "Noble Student", "Groovity Commoners"],
    },
  ];

  const legalLinks = [
    "Legal",
    "Safety & Privacy Center",
    "Privacy Policy",
    "Cookies",
    "About Ads",
    "Accessibility",
  ];

  return (
    <Box
      sx={{
        bgcolor: alpha(theme.palette.common.black, 0.9),
        pt: 6,
        pb: 3,
        borderTop: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} md={3}>
            <Box sx={{ mb: { xs: 3, md: 0 } }}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                mb={2}
                textAlign={"left"}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: theme.palette.common.white,
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Groovity
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: alpha(theme.palette.common.white, 0.7),
                    mb: 3,
                    maxWidth: 270,
                    lineHeight: 1.6,
                  }}
                >
                  Groove to your favorite tunes. Stream ad-free or download and
                  listen offline.
                </Typography>
              </Box>

              <Stack direction="row" spacing={1.5}>
                {[
                  { icon: <Instagram fontSize="small" />, color: "#E1306C" },
                  { icon: <Twitter fontSize="small" />, color: "#1DA1F2" },
                  { icon: <Facebook fontSize="small" />, color: "#4267B2" },
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    size="small"
                    sx={{
                      bgcolor: alpha(social.color, 0.2),
                      color: social.color,
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: alpha(social.color, 0.3),
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {footerColumns.map((column, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <FooterColumn title={column.title} links={column.links} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            bgcolor: alpha(theme.palette.common.white, 0.1),
            opacity: 0.6,
          }}
        />

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: { xs: 2, md: 3 },
                mb: { xs: 2, md: 0 },
              }}
            >
              {legalLinks.map((link, index) => (
                <FooterLink key={index}>{link}</FooterLink>
              ))}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{ textAlign: { xs: "left", md: "right" } }}
          >
            <Typography
              variant="caption"
              sx={{
                color: alpha(theme.palette.common.white, 0.5),
                fontWeight: 500,
              }}
            >
              © {new Date().getFullYear()} Groovity. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeFooter;
