export interface SongProps {
  id: string;
  name: string;
  coverImageUrl: string;
  lyrics: string;
  artist: string;
  artistImage: string;
}

export interface UploadedSongProps {
  title: string;
  coverImage: File | string;
  audioFile: File | string;
  lyrics: string;
}

export const initialSong: SongProps = {
  id: "",
  name: "",
  coverImageUrl: "",
  lyrics: "",
  artist: "",
  artistImage: "",
};
