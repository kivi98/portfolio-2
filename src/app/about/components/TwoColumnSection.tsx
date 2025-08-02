import { Box, Divider, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";

interface TwoColumnSectionProps {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
  title?: string;
}

const TwoColumnSection = ({
  leftComponent,
  rightComponent,
  title,
}: TwoColumnSectionProps) => {
  return (
    <Box
      sx={{
        mt: { xs: 3, md: 0 },
        height: "fit-content",
        pb: title && { xs: 3, md: 10 },
      }}
    >
      {title && (
        <Box
          sx={{
            color: "text.main",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            mb: { xs: 4, md: 8 },
            mt: { xs: 2, md: 4 },
          }}
        >
          <Typography variant="h1">{title}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Divider
              sx={{
                backgroundColor: "secondary.light",
                width: { xs: "70%", md: "50%" },
                height: 2,
                my: 2,
                boxShadow: "0px 0px 12px #E30000",
                borderRadius: 10,
              }}
            />
          </Box>
        </Box>
      )}
      <Grid container spacing={{ xs: 2, md: 0 }} alignItems="center">
        <Grid xs={12} md={5.5}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {leftComponent}
          </Box>
        </Grid>
        <Grid xs={12} md={1} sx={{ display: "flex", justifyContent: "center" }}>
          <Divider
            orientation="vertical"
            sx={{
              height: "100%",
              mx: { xs: 0, md: "auto" },
              backgroundColor: "transparentLevelsWhite.2",
              borderRadius: 10,
              display: { xs: "none", md: "block" },
              minHeight: "200px",
            }}
          />
        </Grid>
        <Grid xs={12} md={5.5} sx={{ p: 0, m: 0 }}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 0,
              m: 0,
            }}
          >
            {rightComponent}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TwoColumnSection;
