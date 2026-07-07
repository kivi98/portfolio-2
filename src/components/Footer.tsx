"use client";
import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  {
    title: "GitHub",
    href: "https://github.com/kivi98",
    icon: <GitHubIcon fontSize="small" />,
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/kivi-amarakoon-543a84195",
    icon: <LinkedInIcon fontSize="small" />,
  },
  {
    title: "Email",
    href: "mailto:kiviamarakoon@gmail.com",
    icon: <EmailIcon fontSize="small" />,
  },
];

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        borderTop: `1px solid ${theme.palette.divider}`,
        background: isDark ? "rgba(10, 10, 10, 0.6)" : "rgba(255,255,255,0.6)",
        backdropFilter: "blur(12px)",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 5 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 4 }}
          alignItems={{ xs: "center", md: "center" }}
          justifyContent="space-between"
        >
          <Stack spacing={0.5} alignItems={{ xs: "center", md: "flex-start" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, letterSpacing: -0.5 }}
            >
              Kivi Amarakoon
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Software engineer — building the future, one line of code at a
              time.
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={{ xs: 2, sm: 3 }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {navLinks.map((link) => (
              <Typography
                key={link.href}
                component={Link}
                href={link.href}
                variant="body2"
                sx={{
                  color: "text.secondary",
                  transition: "color 0.2s",
                  "&:hover": { color: "text.primary" },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Stack>

          <Stack direction="row" spacing={0.5}>
            {socials.map((social) => (
              <Tooltip key={social.title} title={social.title}>
                <IconButton
                  component="a"
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: "text.secondary",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "10px",
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "text.primary",
                      transform: "translateY(-2px)",
                      borderColor: "text.secondary",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Stack>
        </Stack>

        <Typography
          variant="caption"
          color="text.disabled"
          sx={{ display: "block", textAlign: "center", mt: 4 }}
        >
          © {new Date().getFullYear()} Kivi Amarakoon. Crafted with Next.js.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
