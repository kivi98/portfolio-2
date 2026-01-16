import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface OneColumnSectionProps {
  sectionDescription?: ReactNode;
  sectionBody?: ReactNode;
  title?: string;
}

const OneColumnSection = ({
  sectionDescription,
  sectionBody,
  title,
}: OneColumnSectionProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "fit-content",
        mt: { xs: 3, md: 0 },
        pb: { xs: 3, md: 10 },
      }}
    >
      <Box
        sx={{
          color: "text.main",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          mb: title && { xs: 0, md: 10 },
        }}
      >
        {title && (
          <>
            <Typography variant="h1">{title}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Divider
                sx={{
                  backgroundColor: "secondary.light",
                  width: "50%",
                  height: 2,
                  my: 2,
                  boxShadow: theme.palette.mode === "dark" ? "0px 0px 12px #E30000" : "none",
                  borderRadius: 10,
                }}
              />
            </Box>
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          color: "text.main",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Stack direction={"column"} sx={{ width: "100%" }}>
          <Box
            sx={{
              mb: 5,
              display: "flex",
              width: "100%",
            }}
          >
            {sectionDescription}
          </Box>
          <Box>{sectionBody}</Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default OneColumnSection;
