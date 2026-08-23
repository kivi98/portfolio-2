"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { SxProps, Theme } from "@mui/material/styles";

export interface KiwiSection {
  label: string;
  top: number;
}

export interface KiwiMenuProps {
  panelRef: React.RefObject<HTMLDivElement | null>;
  pathname: string;
  progressPct: number;
  sections: KiwiSection[];
  follow: boolean;
  quiet: boolean;
  autoRead: boolean;
  /** Confirmation for the mode the visitor just changed, shown under the chips. */
  note: string | null;
  onNavigate: (href: string) => void;
  onJump: (top: number) => void;
  onToggleFollow: () => void;
  onToggleQuiet: () => void;
  onToggleAutoRead: () => void;
  onTop: () => void;
  onHide: () => void;
  panelSx: SxProps<Theme>;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

/** Shared look for every clickable row in the panel. */
const rowSx = (theme: Theme): SxProps<Theme> => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  width: "100%",
  px: 1.5,
  py: 0.85,
  border: 0,
  background: "none",
  cursor: "pointer",
  textAlign: "left",
  fontFamily: "var(--font-mono), monospace",
  fontSize: "0.68rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "text.primary",
  transition: "background-color 0.15s ease",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? "rgba(27,23,18,0.05)"
        : "rgba(244,239,231,0.06)",
  },
});

/** A mono eyebrow, used as a hairline section divider inside the panel. */
function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      component="div"
      sx={{
        px: 1.5,
        pt: 1,
        pb: 0.5,
        fontFamily: "var(--font-mono), monospace",
        fontSize: "0.56rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "text.secondary",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      {children}
    </Typography>
  );
}

/** Squared mono toggle, on-system with the site's chips. */
function ModeChip({
  label,
  active,
  title,
  onClick,
}: {
  label: string;
  active: boolean;
  title: string;
  onClick: () => void;
}) {
  return (
    <Box
      component="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      sx={{
        flex: 1,
        px: 0.5,
        py: 0.6,
        borderRadius: "2px",
        border: (theme) =>
          `1px solid ${active ? theme.palette.secondary.main : theme.palette.divider}`,
        background: "none",
        cursor: "pointer",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "0.56rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: active ? "secondary.main" : "text.secondary",
        transition: "color 0.15s ease, border-color 0.15s ease",
        "&:hover": { color: active ? "secondary.main" : "text.primary" },
      }}
    >
      {label}
    </Box>
  );
}

/**
 * The bird's command panel: where to go, what's on this page, and how much of
 * itself the visitor wants to put up with.
 */
export default function KiwiMenu({
  panelRef,
  pathname,
  progressPct,
  sections,
  follow,
  quiet,
  autoRead,
  note,
  onNavigate,
  onJump,
  onToggleFollow,
  onToggleQuiet,
  onToggleAutoRead,
  onTop,
  onHide,
  panelSx,
}: KiwiMenuProps) {
  const theme = useTheme();

  return (
    <Box
      ref={panelRef}
      role="dialog"
      aria-label="Kiwi navigation map"
      sx={{ ...panelSx, width: 236 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          px: 1.5,
          py: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          sx={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "text.secondary",
          }}
        >
          Where to?
        </Typography>
        <Typography
          sx={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            color: "secondary.main",
          }}
        >
          {progressPct}%
        </Typography>
      </Box>

      {NAV_LINKS.map((link) => {
        const active =
          link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return (
          <Box
            component="button"
            key={link.href}
            onClick={() => onNavigate(link.href)}
            sx={{
              ...rowSx(theme),
              color: active ? "secondary.main" : "text.primary",
            }}
          >
            {link.label}
            <Box component="span" sx={{ opacity: 0.5 }}>
              {active ? "•" : "→"}
            </Box>
          </Box>
        );
      })}

      {sections.length > 0 && (
        <>
          <PanelLabel>On this page</PanelLabel>
          <Box sx={{ maxHeight: 132, overflowY: "auto" }}>
            {sections.map((section) => (
              <Box
                component="button"
                key={`${section.label}-${section.top}`}
                onClick={() => onJump(section.top)}
                sx={{
                  ...rowSx(theme),
                  py: 0.7,
                  fontSize: "0.62rem",
                  color: "text.secondary",
                  "&:hover": {
                    color: "text.primary",
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "rgba(27,23,18,0.05)"
                        : "rgba(244,239,231,0.06)",
                  },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {section.label}
                </Box>
                <Box component="span" sx={{ opacity: 0.5 }}>
                  ↓
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}

      <PanelLabel>How I behave</PanelLabel>
      <Box sx={{ display: "flex", gap: 0.5, px: 1.5, pb: 1 }}>
        <ModeChip
          label="Follow"
          active={follow}
          title="Walk with your cursor instead of the reading rule"
          onClick={onToggleFollow}
        />
        <ModeChip
          label="Quiet"
          active={quiet}
          title="Stay on screen, but stop talking"
          onClick={onToggleQuiet}
        />
        <ModeChip
          label="Autoread"
          active={autoRead}
          title="Scroll the page at a reading pace"
          onClick={onToggleAutoRead}
        />
      </Box>

      {note && (
        <Typography
          sx={{
            px: 1.5,
            pb: 1,
            fontSize: "0.68rem",
            lineHeight: 1.45,
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          {note}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          component="button"
          onClick={onTop}
          sx={{
            ...rowSx(theme),
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            color: "text.secondary",
            borderRight: `1px solid ${theme.palette.divider}`,
            "&:hover": { color: "text.primary" },
          }}
        >
          ↑ Top
        </Box>
        <Box
          component="button"
          onClick={onHide}
          sx={{
            ...rowSx(theme),
            fontSize: "0.62rem",
            letterSpacing: "0.12em",
            color: "text.secondary",
            "&:hover": { color: "secondary.main" },
          }}
        >
          Hide · K
        </Box>
      </Box>
    </Box>
  );
}
