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
          sx={{
            fontWeight: isActive ? 700 : 500,
            textTransform: "none",
            position: "relative",
            borderRadius: "12px",
            px: 2,
            py: 1,
            transition: "all 0.3s ease",
            backgroundColor: isActive
              ? theme.palette.mode === "dark"
                ? "rgba(227, 0, 0, 0.59)"
                : "rgba(227, 0, 0, 0.1)"
              : "transparent",
            color: isActive
              ? theme.palette.text.primary
              : theme.palette.text.primary,
            "&:hover": {
              backgroundColor: isActive
                ? theme.palette.mode === "dark"
                  ? "rgba(227, 0, 0, 0.25)"
                  : "rgba(227, 0, 0, 0.15)"
                : theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
              transform: "translateY(-1px)",
            },
            // "&::after": {
            //   content: '""',
            //   position: "absolute",
            //   bottom: 0,
            //   left: "50%",
            //   transform: "translateX(-50%)",
            //   width: isActive ? "60%" : "0%",
            //   height: "2px",
            //   backgroundColor: theme.palette.text.primary,
            //   borderRadius: "1px",
            //   transition: "width 0.3s ease",
            // },
          }}
          onClick={onClick}
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
            ? "rgba(255,255,255,0.35)"
            : "rgba(30,30,30,0.35)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.19)",
        zIndex: 1201,
        maxWidth: { xs: "100%", sm: "100%", md: "80%", lg: "1000px" },
        margin: { xs: 0, md: "24px auto 0 auto" },
        borderRadius: { xs: 0, md: "1.5rem" },
        left: 0,
        right: 0,
        top: { xs: 0, md: "1rem" },
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border:
          theme.palette.mode === "light"
            ? "1px solid rgba(200, 200, 200, 0.18)"
            : "1px solid rgba(255, 255, 255, 0.10)",
        borderBottom: {
          xs:
            theme.palette.mode === "light"
              ? "1px solid rgba(200, 200, 200, 0.18)"
              : "1px solid rgba(255, 255, 255, 0.10)",
          md: "1px solid rgba(255, 255, 255, 0.10)",
        }, // Ensure bottom border on mobile if needed, or rely on full border
        borderWidth: { xs: "0 0 1px 0", md: "1px" }, // Only bottom border on mobile? Or keep full border. Let's keep simpler.
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
                component="a"
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{
                  color: theme.palette.mode === "dark" ? "#FFFFFF" : "#171717",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                    transform: "scale(1.1)",
                  },
                }}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <IconButton
                component="a"
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                sx={{
                  color: theme.palette.mode === "dark" ? "#FFFFFF" : "#171717",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                    transform: "scale(1.1)",
                  },
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle light/dark theme">
              <IconButton
                onClick={toggleColorMode}
                aria-label="toggle dark mode"
                sx={{
                  color: theme.palette.mode === "dark" ? "#FFFFFF" : "#171717",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                    transform: "rotate(180deg) scale(1.1)",
                  },
                }}
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
              onClick={toggleColorMode}
              aria-label="toggle dark mode"
              sx={{
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#171717",
                transition: "all 0.3s ease",
                mr: 1,
                "&:hover": {
                  color: theme.palette.secondary.main,
                  transform: "rotate(180deg) scale(1.1)",
                },
              }}
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton
              aria-label="open navigation menu"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              edge="end"
              sx={{
                color: theme.palette.mode === "dark" ? "#FFFFFF" : "#171717",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: theme.palette.secondary.main,
                  transform: "scale(1.1)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            {mobileMenuOpen && (
              <Portal>
                <Box
                  ref={menuContentRef}
                  sx={{
                    position: "fixed",
                    top: {
                      xs: "56px",
                      sm: "64px",
                    },
                    left: 0,
                    right: 0,
                    margin: 0,
                    maxWidth: "100%",
                    background:
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.97)"
                        : "rgba(30, 30, 30, 0.97)",
                    backdropFilter: "blur(16px) saturate(180%)",
                    WebkitBackdropFilter: "blur(16px) saturate(180%)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    borderRadius: "0 0 10px 10px",
                    border:
                      theme.palette.mode === "light"
                        ? "1px solid rgba(200, 200, 200, 0.18)"
                        : "1px solid rgba(255, 255, 255, 0.10)",
                    zIndex: 1301,
                    p: 3,
                  }}
                >
                  <Stack spacing={2}>
                    {renderNavButtons(() => setMobileMenuOpen(false))}
                    <Divider />
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title="GitHub">
                        <IconButton
                          component="a"
                          href="https://github.com/kivi98"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#FFFFFF"
                                : "#171717",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              color: theme.palette.secondary.main,
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <GitHubIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="LinkedIn">
                        <IconButton
                          component="a"
                          href="https://linkedin.com/in/kivi-amarakoon-543a84195"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#FFFFFF"
                                : "#171717",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              color: theme.palette.secondary.main,
                              transform: "scale(1.1)",
                            },
                          }}
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
                          aria-label="toggle dark mode"
                          sx={{
                            color:
                              theme.palette.mode === "dark"
                                ? "#FFFFFF"
                                : "#171717",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              color: theme.palette.secondary.main,
                              transform: "rotate(180deg) scale(1.1)",
                            },
                          }}
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
              </Portal>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
