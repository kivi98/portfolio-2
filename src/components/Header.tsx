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
import Portal from "@mui/material/Portal";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import logo from "@/public/logo/logo.png";

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
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const menuContentRef = useRef<HTMLDivElement | null>(null);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuContentRef.current &&
        !menuContentRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileMenuOpen]);

  // Check if a link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const renderNavButtons = (onClick?: () => void) =>
    navLinks.map((link) => {
      const isActive = isActiveLink(link.href);
      return (
        <Button
          key={link.href}
          component={Link}
          href={link.href}
          color="inherit"
          onClick={onClick}
          sx={{
            fontWeight: 500,
            fontSize: "0.95rem",
            textTransform: "none",
            position: "relative",
            borderRadius: "50px", // Full pill
            px: 2.5,
            py: 0.75,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            color: isActive
              ? theme.palette.text.primary
              : theme.palette.text.secondary,
            backgroundColor: isActive
              ? theme.palette.mode === "dark"
                ? "rgba(227, 0, 0, 0.59)"
                : "rgba(0, 0, 0, 0.1)"
              : "transparent",
            "&:hover": {
              color: theme.palette.text.primary,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.03)",
            },
          }}
        >
          {link.label}
        </Button>
      );
    });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background:
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.6)"
            : "rgba(18, 18, 18, 0.6)",
        boxShadow:
          theme.palette.mode === "light"
            ? "0 8px 32px 0 rgba(31, 38, 135, 0.07)"
            : "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        zIndex: 1201,
        maxWidth: { xs: "100%", md: "90%", lg: "1100px" },
        margin: { xs: 0, md: "24px auto 0 auto" },
        borderRadius: { xs: 0, md: "24px" },
        left: 0,
        right: 0,
        top: { xs: 0, md: "0" }, // Keep tight to top or add small gap
        backdropFilter: "blur(12px) saturate(180%)",
        WebkitBackdropFilter: "blur(12px) saturate(180%)",
        border:
          theme.palette.mode === "light"
            ? "1px solid rgba(255, 255, 255, 0.4)"
            : "1px solid rgba(255, 255, 255, 0.05)",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minHeight: { xs: 64, sm: 72 },
          px: { xs: 2, md: 3 },
        }}
      >
        {/* Logo and Title */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
            "&:hover .logo-container": {
              transform: "rotate(10deg)",
            },
          }}
        >
          <Box
            className="logo-container"
            sx={{
              backgroundColor: theme.palette.mode === "dark" ? "#fff" : "transparent",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "50%",
              p: 0.5,
              width: 40,
              height: 40,
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.4s ease",
            }}
          >
            <Image src={logo} alt="logo" width={32} height={32} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: -0.5,
              fontSize: { xs: 18, sm: 20 },
              color: theme.palette.text.primary,
              // Removed Times New Roman per plan
              fontFamily: "inherit",
            }}
          >
            Kivi Amarakoon
          </Typography>
        </Stack>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Stack direction="row" alignItems="center" spacing={1}>
            {renderNavButtons()}

            <Divider orientation="vertical" flexItem sx={{ height: 24, alignSelf: 'center', mx: 1.5, borderColor: theme.palette.divider }} />

            <Stack direction="row" spacing={0.5}>
              <Tooltip title="GitHub">
                <IconButton
                  component="a"
                  href="https://github.com/kivi98"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.2s",
                    "&:hover": {
                      color: theme.palette.text.primary,
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton
                  component="a"
                  href="https://linkedin.com/in/kivi-amarakoon-543a84195"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "#0a66c2", // LinkedIn Blue
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Toggle light/dark theme">
                <IconButton
                  onClick={toggleColorMode}
                  sx={{
                    color: theme.palette.text.secondary,
                    transition: "all 0.4s",
                    "&:hover": {
                      color: theme.palette.warning.main,
                      transform: "rotate(90deg)",
                    },
                  }}
                >
                  {mode === "dark" ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <Box ref={mobileMenuRef} sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={toggleColorMode}
              sx={{
                color: theme.palette.text.primary,
                mr: 1,
              }}
            >
              {mode === "dark" ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
            </IconButton>
            <IconButton
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              sx={{
                color: theme.palette.text.primary,
                transition: "transform 0.2s",
                transform: mobileMenuOpen ? "rotate(90deg)" : "none",
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Menu Content */}
            {mobileMenuOpen && (
              <Portal>
                <Box
                  ref={menuContentRef}
                  sx={{
                    position: "fixed",
                    top: "calc(64px + 1px)", // Below navbar
                    left: 0,
                    right: 0,
                    p: 2,
                    background: theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.95)"
                      : "rgba(18, 18, 18, 0.95)",
                    backdropFilter: "blur(20px)",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    zIndex: 1199,
                    animation: "slideDown 0.3s ease-out forwards",
                    "@keyframes slideDown": {
                      "0%": { opacity: 0, transform: "translateY(-10px)" },
                      "100%": { opacity: 1, transform: "translateY(0)" },
                    }
                  }}
                >
                  <Stack spacing={1}>
                    {renderNavButtons(() => setMobileMenuOpen(false))}
                    <HtmlDivider sx={{ my: 1.5, borderColor: theme.palette.divider }} />
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ pt: 1 }}>
                      <IconButton
                        component="a"
                        href="https://github.com/kivi98"
                        target="_blank"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        <GitHubIcon />
                      </IconButton>
                      <IconButton
                        component="a"
                        href="https://linkedin.com/in/kivi-amarakoon-543a84195"
                        target="_blank"
                        sx={{ color: "#0a66c2" }}
                      >
                        <LinkedInIcon />
                      </IconButton>
                    </Stack>
                  </Stack>
                </Box>
              </Portal>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Helper for divider to avoid naming conflict if needed, 
// though we imported Divider above. Redefining just in case or using standard Divider.
const HtmlDivider = Divider;
