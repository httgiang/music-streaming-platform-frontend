import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextButton, PrevButton } from "@/components/iconbuttons/IconButtons";
import { useEffect, useRef, useState } from "react";
import MusicPreviewCard, {
  MusicPreviewCardProps,
} from "@/components/music/MusicPreviewCard";
import { Box } from "@mui/material";

interface MusicCardsSliderProps {
  cardChildren: MusicPreviewCardProps[];
  isLoading?: boolean;
  slidesToShow: number;
}
const MusicCardsSlider = ({
  cardChildren,
  slidesToShow,
}: MusicCardsSliderProps) => {
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef<Slider>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    arrows: showArrows,
    nextArrow: <NextButton onClick={() => sliderRef.current?.slickNext()} />,
    prevArrow: <PrevButton onClick={() => sliderRef.current?.slickPrev()} />,
    centerMode: false,
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
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {cardChildren.length > slidesToShow ? (
        <Slider ref={sliderRef} {...settings}>
          {cardChildren.map((cardProps, index) => (
            <MusicPreviewCard
              key={index}
              item={cardProps.item}
              type={cardProps.type}
            />
          ))}
        </Slider>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="left"
          alignItems="left"
          width="100%"
          height="100%"
        >
          {cardChildren.map((cardProps, index) => (
            <MusicPreviewCard
              key={index}
              item={cardProps.item}
              type={cardProps.type}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default MusicCardsSlider;
