import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SongPreviewCard from "@/components/slider/SongPreviewCard";
import SailorSongPic from "@/assets/sailor-song.jpg";
import { IconButton } from "@mui/material";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

interface SliderButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<SliderButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: 0,
        top: "50%",
        zIndex: 1,
        color: "white",
        backgroundColor: "rgba(0,0,0, 0.5)",
      }}
    >
      <NavigateNext />
    </IconButton>
  );
};

const PrevButton: React.FC<SliderButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: 0,
        top: "50%",
        zIndex: 1,
        color: "white",
        backgroundColor: "rgba(0,0,0, 0.5)",
      }}
    >
      <NavigateBefore />
    </IconButton>
  );
};

const SongCardsSlider = () => {
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const demoSongs = [
    {
      id: 1,
      title: "Sailor Song",
      artist: "Gigi Perez",
      cover: SailorSongPic,
    },
    {
      id: 2,
      title: "Sailor Song",
      artist: "Gigi Perez",
      cover: SailorSongPic,
    },
    {
      id: 3,
      title: "Sailor Song",
      artist: "Gigi Perez",
      cover: SailorSongPic,
    },
    {
      id: 4,
      title: "Sailor Song",
      artist: "Gigi Perez",
      cover: SailorSongPic,
    },
    {
      id: 5,
      title: "Sailor Song",
      artist: "Gigi Perez",
      cover: SailorSongPic,
    },
  ];
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: showArrows,
    nextArrow: <NextButton onClick={() => sliderRef.current?.slickNext()} />,
    prevArrow: <PrevButton onClick={() => sliderRef.current?.slickPrev()} />,
  };

  const handleScroll = (event: WheelEvent) => {
    if (sliderRef.current) {
      if (event.deltaX > 0) {
        sliderRef.current.slickNext();
      } else {
        sliderRef.current.slickPrev();
      }
    }
  };

  useEffect(() => {
    const sliderContainer = sliderContainerRef.current;
    if (sliderContainer) {
      sliderContainer.addEventListener("wheel", handleScroll);
      sliderContainer.addEventListener("mouseenter", () => setShowArrows(true));
      sliderContainer.addEventListener("mouseleave", () =>
        setShowArrows(false),
      );
      return () => {
        sliderContainer.removeEventListener("wheel", handleScroll);
        sliderContainer.removeEventListener("mouseenter", () =>
          setShowArrows(true),
        );
        sliderContainer.removeEventListener("mouseleave", () =>
          setShowArrows(false),
        );
      };
    }
  }, []);

  return (
    <div
      ref={sliderContainerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {demoSongs.map((song) => (
          <SongPreviewCard key={song.id} song={song} />
        ))}
      </Slider>
    </div>
  );
};

export default SongCardsSlider;
