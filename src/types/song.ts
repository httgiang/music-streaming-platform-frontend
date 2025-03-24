export interface SongProps {
  id: number;
  name: string;
  coverImageUrl: string;
  lyrics: string;
  duration: number;
  artist: string;
  artistImage: string;
}

export const initialSong: SongProps = {
  id: 0,
  name: "",
  coverImageUrl: "",
  lyrics: "",
  duration: 0,
  artist: "",
  artistImage: "",
};
