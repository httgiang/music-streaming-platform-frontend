export interface SongProps {
  id: string;
  name: string;
  coverImageUrl: string;
  lyrics: string;
  artist: string;
  artistImage: string;
}

export interface UploadedSongProps {
  name: string;
  coverImage: File | null;
  audioFile: File | null;
  lyric: string;
}

export const initialSong: SongProps = {
  id: "",
  name: "",
  coverImageUrl: "",
  lyrics: "",
  artist: "",
  artistImage: "",
};
