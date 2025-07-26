import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface ImageItem {
  id: string;
  src: string;
  alt: string;
}

interface KImageBoxProps {
  src?: string;
  alt: string;
  height?: number | string | object;
  width?: number | string | object;
  imageArray?: ImageItem[];
  sx?: SxProps<Theme>;
}

const KImageBox = ({
  src,
  alt,
  height,
  width,
  imageArray,
  sx,
}: KImageBoxProps) => {
  if (imageArray && imageArray.length > 0) {
    // Carousel can be added here if needed
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* Carousel functionality can be added here if needed */}
        <Box
          component="img"
          src={imageArray[0].src}
          alt={imageArray[0].alt}
          height={height}
          width={width ?? "100%"}
          sx={{
            objectFit: "cover",
            borderRadius: 2,
            ...sx,
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      height={height ?? "auto"}
      width={width ?? "100%"}
      sx={{
        objectFit: "cover",
        borderRadius: 2,
        ...sx,
      }}
    />
  );
};

export default KImageBox;
