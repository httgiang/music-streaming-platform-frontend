export interface AlbumProps {
  id: string;
  name: string;
  isPublic: boolean;
  artist: string;
  coverImageUrl: string;
  image?: string;
}

export const initialAlbum: AlbumProps = {
  id: "",
  name: "",
  coverImageUrl: "",
  artist: "",
  isPublic: false,
};
