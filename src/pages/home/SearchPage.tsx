import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Chip } from "@mui/material";
import useQuery from "@/contexts/QueryContext";
import { searchSongsOrArtists } from "@/api/music/song-api";
import { searchAlbums } from "@/api/music/album-api";
import { SongProps } from "@/types/song";
import MusicCard from "@/components/music/MusicCard";
import MusicPreviewCard from "@/components/music/MusicPreviewCard";
import { ArtistProps } from "@/types/artist";

const SearchPage: React.FC = () => {
  const query = useQuery();
  const [key, setKey] = useState<string>("");
  const [results, setResults] = useState<SongProps[]>([]);
  const [uniqueArtists, setUniqueArtists] = useState<ArtistProps[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const navigate = useNavigate();

  const onSongDoubleClick = useCallback(
    (song: SongProps) => {
      navigate(`/song/${song.id}`, { state: song });
    },
    [navigate],
  );

  useEffect(() => {
    setKey(query.get("key") || "");
  }, [query]);

  useEffect(() => {
    const fetchResults = async () => {
      if (key) {
        const [searchResults, albumResults] = await Promise.all([
          searchSongsOrArtists(key),
          searchAlbums(key),
        ]);
        setResults(searchResults);

        const artistsArray: ArtistProps[] = [];
        searchResults.forEach((song: any) => {
          // Check if the song has an artist and add it to the artistsArray
          if (song.artist) {
            artistsArray.push({
              id: song.userId || song.artist, 
              name: song.artist,
              image: song.artistImage,
            });
          }
        });

        // Filter out duplicate artists based on their id
        const uniqueArtistsArray = artistsArray.filter(
          (artist, index, self) =>
            index === self.findIndex((a) => a.id === artist.id)
        );

        setUniqueArtists(uniqueArtistsArray);

        // Set albums
        setAlbums(albumResults.slice(0, 4)); 
      }
    };
    fetchResults();
  }, [key]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          marginBottom: 2,
        }}
      >
        <Chip
          label="All"
          color={filter === "All" ? "secondary" : "default"}
          onClick={() => setFilter("All")}
        />
        <Chip
          label="Song"
          color={filter === "Song" ? "secondary" : "default"}
          onClick={() => setFilter("Song")}
        />
        <Chip
          label="Artist"
          color={filter === "Artist" ? "secondary" : "default"}
          onClick={() => setFilter("Artist")}
        />
        <Chip
          label="Album"
          color={filter === "Album" ? "secondary" : "default"}
          onClick={() => setFilter("Album")}
        />
      </Box>

      {(filter === "All" || filter === "Song") && (
        <>
          <Typography
            variant="h5"
            sx={{
              marginBottom: 1,
              color: "White",
              fontWeight: 600,
              alignSelf: "flex-start",
            }}
          >
            Song
          </Typography>
          {results.length > 0 ? (
            <Stack spacing={2}>
              {results.slice(0, filter === "Song" ? 10 : 4).map((result) => (
                <Box
                  key={result.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#484848",
                      borderRadius: "8px",
                      transition: "background-color 0.3s ease",
                    },
                    padding: 1,
                  }}
                  onDoubleClick={() => onSongDoubleClick(result)}
                >
                  <MusicCard
                    song={{
                      coverImageUrl: result.coverImageUrl,
                      name: result.name,
                      artist: result.artist,
                      duration: result.duration
                        ? result.duration.toString()
                        : "N/A",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          ) : null}
        </>
      )}

      {(filter === "All" || filter === "Artist") && (
        <>
          <Typography
            variant="h5"
            sx={{
              marginTop: 2,
              marginBottom: 1,
              color: "White",
              fontWeight: 600,
              alignSelf: "flex-start",
            }}
          >
            Artist
          </Typography>
          {uniqueArtists.length > 0 ? (
            <Stack direction="row" spacing={2}>
              {uniqueArtists.map((artist) => (
                <MusicPreviewCard
                  key={artist.id}
                  type="artist"
                  item={{
                    id: artist.id,
                    name: artist.name || "Unknown Artist",
                    coverImageUrl: artist.coverImageUrl,
                  }}
                />
              ))}
            </Stack>
          ) : null}
        </>
      )}

      {(filter === "All" || filter === "Album") && (
        <>
          <Typography
            variant="h5"
            sx={{
              marginTop: 2,
              marginBottom: 1,
              color: "White",
              fontWeight: 600,
              alignSelf: "flex-start",
            }}
          >
            Album
          </Typography>
          {albums.length > 0 ? (
            <Stack direction="row" spacing={2}>
              {albums.map((album) => (
                <MusicPreviewCard
                  key={album.id}
                  type="album"
                  item={{
                    id: album.id,
                    name: album.name,
                    coverImageUrl: album.coverImageUrl,
                    artist: album.artist,
                    isPublic: album.isPublic,
                  }}
                />
              ))}
            </Stack>
          ) : null}
        </>
      )}
    </Box>
  );
};

export default SearchPage;
