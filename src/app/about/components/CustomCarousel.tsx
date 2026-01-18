import React, { useState, useEffect } from "react";
import { Box, IconButton, SxProps, Theme } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ImageItem } from "@/types";

interface CustomCarouselProps {
  images: ImageItem[];
  height?: number | string;
  width?: number | string;
  sx?: SxProps<Theme>;
  autoTransition?: boolean;
  transitionInterval?: number; // in milliseconds
  imageHeight?: number | string;
  imageSx?: SxProps<Theme>;
}

const CustomCarousel = ({
  images,
  height = "100%",
  width,
  sx,
  imageHeight = "100%",
  autoTransition = false,
  transitionInterval = 3000,
  imageSx,
}: CustomCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = React.useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  }, [images.length]);

  // Auto-transition effect
  useEffect(() => {
    if (!autoTransition || images.length <= 1) return;

    const interval = setInterval(() => {
      nextImage();
    }, transitionInterval);

    return () => clearInterval(interval);
  }, [autoTransition, transitionInterval, images.length, nextImage]);

  if (!images || images.length === 0) return null;

  return (
    <Box
      sx={{
        position: "relative",
        width: width ?? "100%",
        height: height ?? "100%",
        ...sx,
      }}
    >
      <Box
        component="img"
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        sx={{
          // objectFit: "",
          borderRadius: 2,
          width: "100%",
          height: imageHeight ?? "100%",
          ...imageSx,
        }}
      />

      {images.length > 1 && (
        <>
          <IconButton
            onClick={prevImage}
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={nextImage}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <ChevronRight />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 1,
            }}
          >
            {images.map((_, index) => (
              <Box
                key={index}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor:
                    index === currentIndex
                      ? "white"
                      : "rgba(255, 255, 255, 0.5)",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor:
                      index === currentIndex
                        ? "white"
                        : "rgba(255, 255, 255, 0.8)",
                  },
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default CustomCarousel;
