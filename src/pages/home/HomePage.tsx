import { Container, Stack } from "@mui/material";
import SongCardsSlider from "@/components/music/MusicCardsSlider";
import HomeSection from "@/components/section/HomeSection";
import SailorSongPic from "@/assets/sailor-song.jpg";
import TheBeatlesPic from "@/assets/the-beatles.jpg";
import { useEffect, useState } from "react";
import Elsa from "@/assets/let-it-go.jpg";
import Gigi from "@/assets/gigi-perez.jpg";
import Indina from "@/assets/indina-menzel.jpg";
import { fetchSongs } from "@/api/music/song-api";
import { SongProps } from "@/types/song";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<SongProps[]>([]);
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await fetchSongs();
        if (isMounted) {
          setSongs(data);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const demoSongs = [
    {
      type: "song" as const,
      item: {
        id: 1,
        name: "Sailor Song",
        coverImageUrl: SailorSongPic,

        lyrics: `Snow glows white on the mountain tonight
Not a footprint to be seen
A kingdom of isolation
And it looks like I'm the queen...`,
        duration: 210,
        artist: "Gigi Perez",
        artistImage: Gigi,
      },
    },
    {
      type: "song" as const,
      item: {
        id: 2,
        name: "Let It Go",
        coverImageUrl: Elsa,
        lyrics: `The snow glows white on the mountain tonight
Not a footprint to be seen
A kingdom of isolation
And it looks like I'm the queen


The wind is howling like this swirling storm inside
Couldn't keep it in, heaven knows I tried
Don't let them in, don't let them see
Be the good girl you always have to be
Conceal, don't feel, don't let them know


Well, now they know
Let it go, let it go
Can't hold it back anymore
Let it go, let it go
Turn away and slam the door
I don't care what they're going to say
Let the storm rage on
The cold never bothered me anyway


It's funny how some distance makes everything seem small
And the fears that once controlled me can't get to me at all
It's time to see what I can do
To test the limits and break through
No right, no wrong, no rules for me
I'm free


Let it go, let it go
I am one with the wind and sky
Let it go, let it go
You'll never see me cry
Here I stand and here I stay
Let the storm rage on


My power flurries through the air into the ground
My soul is spiraling in frozen fractals all around
And one thought crystallizes like an icy blast
I'm never going back, the past is in the past


Let it go, let it go
And I'll rise like the break of dawn
Let it go, let it go
That perfect girl is gone
Here I stand in the light of day
Let the storm rage on
The cold never bothered me anyway`,

        duration: 243,
        artist: "Indina Menzel",
        artistImage: Indina,
      },
    },
  ];
  const demoArtists = [
    {
      type: "artist" as const,
      item: {
        id: "1",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "2",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "3",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "4",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "5",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
    {
      type: "artist" as const,
      item: {
        id: "6",
        name: "The Beatles",
        image: TheBeatlesPic,
      },
    },
  ];

  const fetchedSongs = songs?.map((song) => ({
    type: "song" as const,
    item: {
      id: song.id,
      name: song.name,
      coverImageUrl: song.coverImageUrl,
      lyrics: song.lyrics ? song.lyrics : "",
      duration: song.duration ? song.duration : 0,
      artist: song.artist ? song.artist : "",
      artistImage: song.artistImage ? song.artistImage : "",
    },
  }));

  return (
    <Container>
      <Stack spacing={4}>
        {!loading && (
          <HomeSection title="Trending Songs">
            <SongCardsSlider cardChildren={fetchedSongs} />
          </HomeSection>
        )}

        <HomeSection title="Popular Artists">
          <SongCardsSlider cardChildren={demoArtists} />
        </HomeSection>
      </Stack>
    </Container>
  );
};

export default HomePage;
