import { Box, SxProps, Theme } from "@mui/material";
import { ImageItem } from "@/types";
import CustomCarousel from "./CustomCarousel";

interface KImageBoxProps {
  src?: string;
  alt?: string;
  height?: number | string | object;
  width?: number | string | object;
  imageArray?: ImageItem[];
  sx?: SxProps<Theme>;
  autoTransition?: boolean;
  transitionInterval?: number;
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
        />
      </Box>
    );
  }

  return (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={
        {
          objectFit: "cover" as const,
          borderRadius: 2,
          height: height ?? "auto",
          width: width ?? "100%",
          ...(sx || {}),
        } as any
      }
    />
  );
};

export default KImageBox;
