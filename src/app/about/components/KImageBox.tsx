import { Box, SxProps, Theme } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";
import { ImageItem } from "@/types";
import CustomCarousel from "./CustomCarousel";

interface KImageBoxProps {
  src?: string;
  alt?: string;
  height?: ResponsiveStyleValue<number | string>;
  width?: ResponsiveStyleValue<number | string>;
  imageArray?: ImageItem[];
  sx?: SxProps<Theme>;
  autoTransition?: boolean;
  transitionInterval?: number;
  imageSx?: SxProps<Theme>;
}

const KImageBox = ({
  src,
  alt,
  height,
  width,
  imageArray,
  sx,
  autoTransition = false,
  transitionInterval = 3000,
  imageSx,
}: KImageBoxProps) => {
  if (imageArray && imageArray.length > 0) {
    return (
      <Box
        sx={{
          width: width ?? "100%",
          height: height ?? "100%",
        }}
      >
        <CustomCarousel
          images={imageArray}
          height={height}
          width={width}
          sx={sx}
          autoTransition={autoTransition}
          transitionInterval={transitionInterval}
          imageSx={imageSx}
        />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        objectFit: "cover" as const,
        borderRadius: 2,
        height: height ?? "auto",
        width: width ?? "100%",
        ...(sx || {}),
      }}
    />
  );
};

export default KImageBox;
