import MusicPreviewCard, {
  MusicPreviewCardProps,
} from "@/components/music/MusicPreviewCard";
import { SongProps } from "@/types/song";
import { Dialog, DialogTitle, Grid, Container } from "@mui/material";
import { useLocation } from "react-router-dom";

const ShowAllPage = () => {
  const location = useLocation();
  const musicItems = location.state as MusicPreviewCardProps[];
  return (
    <Container>
      {musicItems.length > 0 ? (
        <Grid container rowSpacing={3} columnSpacing={2} padding={2}>
          {musicItems.map((item) => {
            return (
              <Grid item xs={2} key={item.item.id}>
                <MusicPreviewCard type="song" item={item.item as SongProps} />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Dialog open={true}>
          <DialogTitle>No music items found</DialogTitle>
        </Dialog>
      )}
    </Container>
  );
};

export default ShowAllPage;
