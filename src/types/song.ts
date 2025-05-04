export interface SongProps {
  id: string;
  name: string;
  coverImageUrl: string;
  lyric: string; 
  duration: number;
  artist: string;
  artistImage: string;
}

export const initialSong: SongProps = {
  id: "",
  name: "",
  coverImageUrl: "",
  lyric: "", 
  duration: 0,
  artist: "",
  artistImage: "",
};
