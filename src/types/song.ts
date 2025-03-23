export interface SongProps {
  id: number;
  title: string;
  artist: string;
  image: string;
  duration: number;
}

export const initialSong : SongProps = {
  id: 0,
  title: "",
  artist: "",
  image: "",
  duration: 0
}