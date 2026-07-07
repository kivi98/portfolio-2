"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Reveal from "@/components/Reveal";
import { PAGE_TOP_PADDING } from "@/components/layoutConstants";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Extra content under the subtitle (e.g. a search field) */
  children?: React.ReactNode;
}

/**
 * Standard page opener: overline eyebrow + large heading + subtitle,
 * centered, with the fixed-header clearance baked in.
 */
const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  children,
}) => (
  <Box
    sx={{
      pt: PAGE_TOP_PADDING,
      pb: { xs: 4, md: 6 },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <Reveal
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: "secondary.main",
          fontWeight: 700,
          letterSpacing: 2,
          fontSize: "0.75rem",
        }}
      >
        {eyebrow}
      </Typography>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.4rem" },
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          mt: 1,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(180deg, #FFFFFF 0%, #A3A3A3 100%)"
              : "linear-gradient(180deg, #111827 0%, #4B5563 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mt: 2,
            maxWidth: 640,
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.7,
            px: 2,
          }}
        >
          {subtitle}
        </Typography>
      )}
      {children && <Box sx={{ mt: 4, width: "100%" }}>{children}</Box>}
    </Reveal>
  </Box>
);

export default PageHero;
