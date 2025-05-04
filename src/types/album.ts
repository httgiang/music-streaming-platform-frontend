export interface AlbumProps {
  id: string;
  name: string;
  coverImageUrl: string;
  artist: string;
  isPublic: boolean;
}

export const initialAlbum: AlbumProps = {
  id: "",
  name: "",
  coverImageUrl: "",
  artist: "",
  isPublic: false,
};  



