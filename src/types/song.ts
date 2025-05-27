export interface SongProps {
  id: string;
  name: string;
  coverImageUrl: string;
  lyric: string;
  duration: number;
  likesCount: number;
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
  lyric: "",
  duration: 0,
  likesCount: 0,
  artist: "",
  artistImage: "",
};
