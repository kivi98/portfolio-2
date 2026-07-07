"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
}) => (
  <Box
    sx={{
      textAlign: align,
      mb: { xs: 4, md: 6 },
      display: "flex",
      flexDirection: "column",
      alignItems: align === "center" ? "center" : "flex-start",
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
      variant="h2"
      sx={{
        fontSize: { xs: "1.8rem", md: "2.4rem" },
        fontWeight: 700,
        letterSpacing: "-0.02em",
        mt: 1,
      }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography
        variant="body1"
        sx={{ color: "text.secondary", mt: 1.5, maxWidth: 560 }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

export default SectionHeading;
