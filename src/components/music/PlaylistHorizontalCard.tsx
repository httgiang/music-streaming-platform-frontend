import { PlaylistProps } from "@/types/playlist";
import { Box, Paper, Typography } from "@mui/material";
const PlaylistHorizontalCard = ({ playlist }: { playlist: PlaylistProps }) => {
  return (
    <Paper
      sx={{
        borderRadius: 0,
        cursor: "pointer",
        boxShadow: "none",
        ":hover": {
          backgroundColor: "#F5F5F5",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <img width={60} height={60} src={playlist.image} alt={playlist.title} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography fontWeight={700}>{playlist.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {playlist.creator}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default PlaylistHorizontalCard;
