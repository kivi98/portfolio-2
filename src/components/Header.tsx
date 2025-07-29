"use client";
import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useThemeMode } from "@/theme/ThemeProvider";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import logo from "../assets/logo.png";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen]);

  const renderNavButtons = (onClick?: () => void) =>
    navLinks.map((link) => (
      <Button
        key={link.href}
        component={Link}
        href={link.href}
        color="inherit"
        sx={{ fontWeight: 500, textTransform: "none" }}
        onClick={onClick}
      >
        {link.label}
      </Button>
    ));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background:
          theme.palette.mode === "light"
            ? "rgba(255,255,255,0.35)"
            : "rgba(30,30,30,0.35)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
        zIndex: 1201,
        maxWidth: { xs: "92%", sm: "90%", md: "80%", lg: "900px" },
        margin: { xs: "1rem 1rem 0 1rem", md: "24px auto 0 auto" },
        borderRadius: "10px",
        left: 0,
        right: 0,
        top: { xs: "0.5rem", md: "1rem" },
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border:
          theme.palette.mode === "light"
            ? "1px solid rgba(200, 200, 200, 0.18)"
            : "1px solid rgba(255, 255, 255, 0.10)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        {/* Logo and Title */}
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? "#ffffff" : "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              p: 0.5,
              boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.10)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
              },
              padding: "0.001rem",
            }}
          >
            <Image src={logo} alt="logo" width={35} height={35} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: { xs: 16, sm: 20 },
              color: theme.palette.text.primary,
              textTransform: "uppercase",
              fontFamily: "Times New Roman",
            }}
          >
            Kivi Amarakoon
          </Typography>
        </Stack>
        {/* Desktop Navigation */}
        {!isMobile && (
          <Stack direction="row" alignItems="center" spacing={2}>
            {renderNavButtons()}
            <Tooltip title="GitHub">
              <IconButton
                color="inherit"
                component="a"
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <IconButton
                color="inherit"
                component="a"
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle light/dark theme">
              <IconButton
                onClick={toggleColorMode}
                color="inherit"
                aria-label="toggle dark mode"
              >
                {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
          </Stack>
        )}
        {/* Mobile Hamburger */}
        {isMobile && (
          <Box
            ref={mobileMenuRef}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <IconButton
              color="inherit"
              aria-label="open navigation menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              edge="end"
            >
              <MenuIcon />
            </IconButton>
            {mobileMenuOpen && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  bgcolor: theme.palette.background.paper,
                  boxShadow: 3,
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  zIndex: 1202,
                  p: 2,
                }}
              >
                <Stack spacing={2}>
                  {renderNavButtons(() => setMobileMenuOpen(false))}
                  <Divider />
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Tooltip title="GitHub">
                      <IconButton
                        color="inherit"
                        component="a"
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <GitHubIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="LinkedIn">
                      <IconButton
                        color="inherit"
                        component="a"
                        href="https://linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <LinkedInIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Toggle light/dark theme">
                      <IconButton
                        onClick={() => {
                          toggleColorMode();
                          setMobileMenuOpen(false);
                        }}
                        color="inherit"
                        aria-label="toggle dark mode"
                      >
                        {mode === "dark" ? (
                          <Brightness7Icon />
                        ) : (
                          <Brightness4Icon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Box>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
