"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import me from "@/public/my-images/me.svg";

const ROLES = [
  "web applications.",
  "scalable APIs.",
  "cloud solutions.",
  "digital experiences.",
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 45;
const PAUSE_DURATION = 1800;

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    let timeout: NodeJS.Timeout;

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), PAUSE_DURATION);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            deleting
              ? word.slice(0, text.length - 1)
              : word.slice(0, text.length + 1),
          );
        },
        deleting ? DELETING_SPEED : TYPING_SPEED,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

const Hero = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const words = useMemo(() => ROLES, []);
  const typed = useTypewriter(words);

  return (
    <Box
      sx={{
        minHeight: { xs: "calc(100svh - 64px)", md: "92vh" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        pt: { xs: "96px", md: "120px" },
        pb: { xs: 6, md: 8 },
        position: "relative",
      }}
    >
      <Chip
        icon={
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              animation: "pulse-dot 2s ease-in-out infinite",
              ml: "4px !important",
            }}
          />
        }
        label="Open to new opportunities"
        sx={{
          mb: 4,
          px: 1,
          height: 32,
          fontSize: "0.8rem",
          fontWeight: 600,
          letterSpacing: 0.3,
          color: "text.secondary",
          background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          border: `1px solid ${theme.palette.divider}`,
          backdropFilter: "blur(8px)",
        }}
      />

      <Avatar
        src={me.src}
        alt="Kivi Amarakoon"
        sx={{
          width: 96,
          height: 96,
          mb: 3,
          background: theme.palette.background.paper,
          boxShadow: isDark
            ? "0 0 0 1px rgba(255,255,255,0.1), 0 0 40px rgba(227,0,0,0.25)"
            : "0 0 0 1px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.12)",
        }}
      />

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "2.4rem", sm: "3.4rem", md: "4.2rem" },
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          maxWidth: 900,
          background: isDark
            ? "linear-gradient(180deg, #FFFFFF 0%, #A3A3A3 100%)"
            : "linear-gradient(180deg, #111827 0%, #4B5563 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Hi, I&apos;m Kivi.
        <br />
        Software engineer crafting
      </Typography>

      <Typography
        component="span"
        sx={{
          fontFamily: "var(--font-outfit), sans-serif",
          fontSize: { xs: "2.4rem", sm: "3.4rem", md: "4.2rem" },
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
          minHeight: { xs: "3rem", sm: "4.2rem", md: "5rem" },
          background: "linear-gradient(135deg, #FF3B3B 0%, #B30000 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          "&::after": {
            content: '"|"',
            WebkitTextFillColor: isDark ? "#666" : "#AAA",
            fontWeight: 300,
            marginLeft: "4px",
            animation: "blink-caret 1s step-end infinite",
          },
          "@keyframes blink-caret": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0 },
          },
        }}
      >
        {typed}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          mt: 3,
          maxWidth: 620,
          color: "text.secondary",
          fontSize: { xs: "1rem", md: "1.125rem" },
          lineHeight: 1.8,
          px: 2,
        }}
      >
        I design and build user-friendly products end to end — from clean,
        accessible interfaces to reliable backends. Passionate about
        continuous learning and solving complex problems with simple, elegant
        code.
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mt: 5, width: { xs: "100%", sm: "auto" }, px: { xs: 3, sm: 0 } }}
      >
        <Button
          component={Link}
          href="/projects"
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: "secondary.main",
            color: "#fff",
            borderRadius: "50px",
            px: 4,
            py: 1.4,
            fontWeight: 700,
            fontSize: "0.95rem",
            boxShadow: "0 8px 24px rgba(227, 0, 0, 0.35)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "secondary.light",
              transform: "translateY(-2px)",
              boxShadow: "0 12px 32px rgba(227, 0, 0, 0.45)",
            },
          }}
        >
          View my work
        </Button>
        <Button
          component={Link}
          href="/contact"
          endIcon={<EmailIcon />}
          sx={{
            color: "text.primary",
            borderRadius: "50px",
            px: 4,
            py: 1.4,
            fontWeight: 700,
            fontSize: "0.95rem",
            border: `1px solid ${theme.palette.divider}`,
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            backdropFilter: "blur(8px)",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: "text.secondary",
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
              transform: "translateY(-2px)",
            },
          }}
        >
          Get in touch
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mt: 4 }}>
        <Tooltip title="GitHub">
          <IconButton
            component="a"
            href="https://github.com/kivi98"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "text.secondary",
              transition: "all 0.2s",
              "&:hover": { color: "text.primary", transform: "translateY(-2px)" },
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
            sx={{
              color: "text.secondary",
              transition: "all 0.2s",
              "&:hover": { color: "#0a66c2", transform: "translateY(-2px)" },
            }}
          >
            <LinkedInIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default Hero;
