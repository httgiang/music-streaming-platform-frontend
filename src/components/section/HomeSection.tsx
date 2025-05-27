import ShowAllDialog from "@/pages/music/ShowAllPage";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

interface HomeSectionProps {
  title: string;
  children: React.ReactNode;
  onShowAll?: () => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({
  title,
  children,
  onShowAll,
}) => {
  const [showAllDialogOpen, setShowAllDialogOpen] = useState(false);
  return (
    <Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mb="1rem"
      >
        <Typography fontSize={18} fontWeight={700} color="text.primary">
          {title}
        </Typography>
        <Box onClick={() => setShowAllDialogOpen(true)}>
          <Typography
            sx={{
              textDecoration: "none",
              color: "text.secondary",
            }}
          >
            Show all
          </Typography>
        </Box>
        {/* <ShowAllDialog
          open={showAllDialogOpen}
          onClose={() => setShowAllDialogOpen(false)}
          songs={[]}
        /> */}
      </Box>
      {children}
    </Box>
  );
};

export default HomeSection;
