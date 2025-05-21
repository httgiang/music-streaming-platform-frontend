import { Box, Typography } from "@mui/material";
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
        <Typography fontSize={20} fontWeight={700} color="text.primary">
          {title}
        </Typography>
        <Typography
          sx={{
            textDecoration: "none",
            color: "text.secondary",
          }}
        >
          Show all
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export default HomeSection;
