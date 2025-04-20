import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, Chip } from "@mui/material";
import useQuery from "@/contexts/QueryContext";
import { searchSongsOrArtists } from "@/api/music/song-api";
import { SongProps } from "@/types/song";
import MusicCard from "@/components/music/MusicCard";
import MusicPreviewCard from "@/components/music/MusicPreviewCard";
import { ArtistProps } from "@/types/artist";

const SearchPage: React.FC = () => {
  const query = useQuery();
  const [key, setKey] = useState<string>("");
  const [results, setResults] = useState<SongProps[]>([]);
  const [uniqueArtists, setUniqueArtists] = useState<ArtistProps[]>([]);
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
        const searchResults = await searchSongsOrArtists(key);
        setResults(searchResults);

        const uniqueArtistsMap = new Map();
        searchResults.forEach((song: any) => {
          if (!uniqueArtistsMap.has(song.userId)) {
            uniqueArtistsMap.set(song.userId, {
              id: song.userId,
              name: song.artist,
              image: song.artistImage,
            });
          }
        });
        setUniqueArtists(Array.from(uniqueArtistsMap.values()));
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
      </Box>

      {(filter === "All" || filter === "Song") && (
        <>
          <Typography
            variant="h5"
            sx={{
              marginBottom: 1,
              color: "black",
              fontWeight: 600,
              alignSelf: "flex-start",
            }}
          >
            Song
          </Typography>
          {results.length > 0 ? (
            <Stack spacing={2}>
              {results.slice(0, 4).map((result) => (
                <Box
                  key={result.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "lightgray",
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
              color: "black",
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
                    image: artist.image,
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
