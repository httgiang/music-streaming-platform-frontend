import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextButton, PrevButton } from "@/components/iconbuttons/IconButtons";
import { useEffect, useRef, useState } from "react";
import MusicPreviewCard, {
  MusicPreviewCardProps,
} from "@/components/music/MusicPreviewCard";
import { Skeleton, Box } from "@mui/material";

interface MusicCardsSliderProps {
  cardChildren: MusicPreviewCardProps[];
  isLoading?: boolean;
}
const MusicCardsSlider = ({
  cardChildren,
  isLoading,
}: MusicCardsSliderProps) => {
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
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
        justifyContent: "space-between",
      }}
    >
      <Slider ref={sliderRef} {...settings}>
        {isLoading
          ? [...Array(5)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  padding: 1,
                  width: "100%",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  height={200}
                  width={150}
                  sx={{ paddingX: 3, paddingY: 2 }}
                />
              </Box>
            ))
          : cardChildren.map((cardProps, index) => (
              <MusicPreviewCard
                key={index}
                item={cardProps.item}
                type={cardProps.type}
              />
            ))}
      </Slider>
    </div>
  );
};

export default MusicCardsSlider;
