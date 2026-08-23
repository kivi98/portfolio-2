"use client";
import React from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import Image from "next/image";
import { PAGE_TOP_PADDING } from "@/components/layoutConstants";

const META = [
  { label: "Role", value: "Full-stack Engineer" },
  { label: "Focus", value: "Web · APIs · Cloud" },
  { label: "Based in", value: "Colombo, Sri Lanka" },
];

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        pt: PAGE_TOP_PADDING,
        pb: { xs: 6, md: 9 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Mono kicker row — masthead metadata */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: { xs: 2.5, md: 3 },
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="overline" sx={{ color: "text.secondary" }}>
          Software Engineer
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              backgroundColor: "secondary.main",
              animation: "pulse-dot 2.4s ease-in-out infinite",
            }}
          />
          <Typography
            variant="overline"
            sx={{
              color: "text.secondary",
              display: { xs: "none", sm: "block" },
            }}
          >
            Open to opportunities
          </Typography>
        </Stack>
      </Box>

      {/* Masthead + portrait — the display type and the figure share a
          two-column measure at md+, stacking on small screens. */}
      <Box
        sx={{
          pt: { xs: 4, md: 6 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 260px", lg: "1fr 310px" },
          columnGap: { md: 6, lg: 8 },
          alignItems: "end",
        }}
      >
        <Box className="reveal is-visible">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3.4rem", sm: "5rem", md: "5.2rem", lg: "7rem" },
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              fontWeight: 500,
            }}
          >
            Kivi
            <br />
            Amarakoon
            <Box component="span" sx={{ color: "secondary.main" }}>
              .
            </Box>
          </Typography>

          {/* Subhead statement */}
          <Typography
            className="reveal is-visible"
            sx={{
              fontFamily: "var(--font-serif), serif",
              fontSize: { xs: "1.35rem", md: "1.75rem" },
              lineHeight: 1.5,
              fontWeight: 400,
              color: "text.primary",
              maxWidth: 720,
              mt: { xs: 4, md: 5 },
            }}
          >
            I design and build user-friendly products end to end — from clean,
            accessible interfaces to{" "}
            <Box
              component="em"
              sx={{ color: "secondary.main", fontStyle: "italic" }}
            >
              reliable
            </Box>{" "}
            backends, with a bias for simple, elegant solutions.
          </Typography>
        </Box>

        {/* Portrait plate — the cutout stands on a warm panel and breaks out
            over its top edge, an editorial figure rather than a framed photo. */}
        <Box
          className="reveal is-visible"
          sx={{
            position: "relative",
            justifySelf: { xs: "center", md: "stretch" },
            width: "100%",
            maxWidth: { xs: 260, sm: 300, md: "none" },
            mt: { xs: 6, md: 0 },
          }}
        >
          {/* Warm panel sitting behind the lower portion of the figure */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: { xs: "22%", md: "26%" },
              backgroundColor: "background.paper",
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: "3px",
            }}
          />
          {/* Rust hairline marking the panel's top edge */}
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              left: 0,
              width: { xs: 48, md: 64 },
              top: { xs: "22%", md: "26%" },
              height: "2px",
              backgroundColor: "secondary.main",
            }}
          />
          <Box
            sx={{
              position: "relative",
              width: "100%",
              // Cap the figure at md+ so the portrait column stays close in
              // height to the type column instead of towering over it.
              aspectRatio: { xs: "826 / 1500", md: "auto" },
              height: { md: 440, lg: 540 },
            }}
          >
            <Image
              src="/my-images/kivi-portrait.webp"
              alt="Kivi Amarakoon"
              fill
              priority
              sizes="(max-width: 600px) 260px, (max-width: 1200px) 260px, 310px"
              style={{ objectFit: "contain", objectPosition: "bottom" }}
            />
          </Box>
        </Box>
      </Box>

      {/* Meta definition grid */}
      <Box
        sx={{
          mt: { xs: 5, md: 7 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        {META.map((item) => (
          <Box
            key={item.label}
            sx={{
              py: 2.5,
              px: { xs: 0, sm: 3 },
              "&:first-of-type": { pl: 0 },
              borderBottom: {
                xs: (theme) => `1px solid ${theme.palette.divider}`,
                sm: "none",
              },
              borderRight: {
                xs: "none",
                sm: (theme) => `1px solid ${theme.palette.divider}`,
              },
              "&:last-of-type": { borderRight: "none" },
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "text.disabled", display: "block" }}
            >
              {item.label}
            </Typography>
            <Typography
              variant="h6"
              sx={{ mt: 0.75, fontSize: "1.05rem", fontWeight: 500 }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Actions */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 3 }}
        alignItems={{ xs: "stretch", sm: "center" }}
        sx={{ mt: { xs: 5, md: 6 } }}
      >
        <Button
          component={Link}
          href="/projects"
          disableRipple
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            px: 3.5,
            py: 1.4,
            fontWeight: 600,
            fontSize: "0.95rem",
            transition: "opacity 0.2s ease",
            "&:hover": { backgroundColor: "primary.main", opacity: 0.85 },
          }}
        >
          View selected work
        </Button>

        <Button
          component={Link}
          href="/contact"
          disableRipple
          sx={{
            color: "text.primary",
            px: 0,
            fontWeight: 600,
            fontSize: "0.95rem",
            borderRadius: 0,
            borderBottom: "1px solid transparent",
            "&:hover": {
              backgroundColor: "transparent",
              borderBottomColor: "text.primary",
            },
          }}
        >
          Get in touch →
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={0.5}>
          <Tooltip title="GitHub">
            <IconButton
              component="a"
              href="https://github.com/kivi98"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "text.secondary",
                borderRadius: 0,
                "&:hover": { color: "text.primary" },
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
                color: "text.secondary",
                borderRadius: 0,
                "&:hover": { color: "text.primary" },
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Hero;
