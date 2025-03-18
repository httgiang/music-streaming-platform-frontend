import { SongProps } from "./song";
export interface PlaylistProps {
  id: number;
  title: string;
  image: string;
  creator: string;
  songs: SongProps[];
}
