"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useThemeMode } from "@/theme/ThemeProvider";
import { useTheme } from "@mui/material/styles";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const { mode, toggleColorMode } = useThemeMode();
  const theme = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        background:
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.7)"
            : "rgba(30,30,30,0.7)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
          Kivi Amarakoon
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {navLinks.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              {link.label}
            </Button>
          ))}
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            aria-label="toggle dark mode"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
