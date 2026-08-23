"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useKiwi } from "./KiwiContext";
import { paintPixels } from "./paint";
import { FRAMES, getKiwiPalette, SPRITE_H, SPRITE_W } from "./sprites";

/**
 * The always-available switch for the guide. Uses the bird itself as its icon —
 * greyed out and faded when the guide is off, so its state reads at a glance.
 */
export default function KiwiToggle() {
  const { enabled, ready, toggle } = useKiwi();
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const palette = useMemo(
    () =>
      getKiwiPalette(
        theme.palette.mode,
        theme.palette.secondary.main,
        theme.palette.secondary.dark,
      ),
    [
      theme.palette.mode,
      theme.palette.secondary.main,
      theme.palette.secondary.dark,
    ],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    paintPixels(canvas, FRAMES[enabled ? "idle" : "sleep"], palette);
  }, [enabled, palette]);

  return (
    <Tooltip
      title={
        ready && enabled ? "Hide the kiwi guide (K)" : "Show the kiwi guide (K)"
      }
    >
      <IconButton
        onClick={toggle}
        disableRipple
        aria-label="Toggle the kiwi guide"
        aria-pressed={ready && enabled}
        sx={{
          borderRadius: "3px",
          px: 0.75,
          transition: "opacity 0.2s ease, filter 0.2s ease",
          opacity: ready && enabled ? 1 : 0.4,
          filter: ready && enabled ? "none" : "grayscale(1)",
          "&:hover": { backgroundColor: "transparent", opacity: 1 },
        }}
      >
        <canvas
          ref={canvasRef}
          width={SPRITE_W}
          height={SPRITE_H}
          style={{
            display: "block",
            width: SPRITE_W,
            height: SPRITE_H,
            imageRendering: "pixelated",
          }}
        />
      </IconButton>
    </Tooltip>
  );
}
