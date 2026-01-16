import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
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
  const theme = useTheme();
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
                boxShadow: theme.palette.mode === "dark" ? "0px 0px 12px #E30000" : "none",
                borderRadius: 10,
              }}
            />
          </Box>
        </Box>
      )}
      <Grid container spacing={{ xs: 2, md: 0 }} alignItems="center">
        <Grid item xs={12} md={5.7}>
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
        <Grid
          item
          xs={12}
          md={0.6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Divider
            orientation="vertical"
            sx={{
              height: "100%",
              mx: { xs: 0, md: "auto" },
              backgroundColor: "transparentLevelsWhite.1",
              borderRadius: 10,
              display: { xs: "none", md: "block" },
              minHeight: "200px",
            }}
          />
        </Grid>
        <Grid item xs={12} md={5.7} sx={{ p: 0, m: 0 }}>
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
