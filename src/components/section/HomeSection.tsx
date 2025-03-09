import { Box, Link, Typography } from "@mui/material";
interface HomeSectionProps {
  title: string;
  children: React.ReactNode;
}
const HomeSection: React.FC<HomeSectionProps> = ({ title, children }) => {
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mb="1rem"
      >
        <Typography fontSize={25} fontWeight={700}>
          {title}
        </Typography>
        <Link
          sx={{
            textDecoration: "none",
            color: "text.secondary",
          }}
        >
          Show all
        </Link>
      </Box>
      {children}
    </Box>
  );
};

export default HomeSection;
