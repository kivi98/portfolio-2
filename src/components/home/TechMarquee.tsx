"use client";
import React from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { allSkills } from "@/features/skills.config";

/**
 * Infinite horizontal marquee of the tech stack, edges masked so the
 * chips fade in/out. The track holds the list twice and translates by
 * -50% for a seamless loop; hover pauses it.
 */
const TechMarquee = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const renderChips = (ariaHidden: boolean) =>
    allSkills.map((skill) => (
      <Stack
        key={`${ariaHidden ? "dup-" : ""}${skill.id}`}
        aria-hidden={ariaHidden || undefined}
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          px: 2.5,
          py: 1,
          borderRadius: "50px",
          border: `1px solid ${theme.palette.divider}`,
          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          whiteSpace: "nowrap",
          flexShrink: 0,
          transition: "border-color 0.2s",
          "&:hover": { borderColor: skill.color },
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: skill.color,
            flexShrink: 0,
          }}
        />
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: "text.secondary" }}
        >
          {skill.label}
        </Typography>
      </Stack>
    ));

  return (
    <Box sx={{ py: { xs: 4, md: 6 } }}>
      <Typography
        variant="overline"
        sx={{
          display: "block",
          textAlign: "center",
          color: "text.disabled",
          letterSpacing: 2,
          mb: 3,
        }}
      >
        Technologies I work with
      </Typography>
      <Box
        sx={{
          overflow: "hidden",
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          "&:hover .marquee-track": { animationPlayState: "paused" },
        }}
      >
        <Stack
          className="marquee-track"
          direction="row"
          spacing={1.5}
          sx={{
            width: "max-content",
            animation: "marquee-scroll 45s linear infinite",
            pr: 1.5,
          }}
        >
          {renderChips(false)}
          {renderChips(true)}
        </Stack>
      </Box>
    </Box>
  );
};

export default TechMarquee;
