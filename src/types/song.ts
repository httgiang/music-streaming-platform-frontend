export interface SongProps {
  id: string;
  name: string;
  coverImageUrl: string;
  lyrics: string;

  duration: number;
  artist: string;
  artistImage: string;
}

export const initialSong: SongProps = {
  id: "",
  name: "",
  coverImageUrl: "",
  lyrics: "",
  duration: 0,
  artist: "",
  artistImage: "",
};
