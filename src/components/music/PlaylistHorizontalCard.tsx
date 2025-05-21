import { PlaylistProps } from "@/types/playlist";
import { Box, Paper, Typography } from "@mui/material";
const PlaylistHorizontalCard = ({ playlist }: { playlist: PlaylistProps }) => {
  return (
    <Paper
      sx={{
        borderRadius: 2,

        boxShadow: "none",
        ":hover": {
          cursor: "pointer",
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
        <img
          style={{ width: 55, height: 55, borderRadius: 3 }}
          src={playlist.image}
          alt={playlist.title}
        />
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
