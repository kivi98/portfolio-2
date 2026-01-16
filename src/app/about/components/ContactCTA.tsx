"use client";

import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  useTheme,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import Link from "next/link";

const ContactCTA = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        // mt: 8,
        pt: 8,
        pb: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "2rem", md: "3rem" },
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #FFF 0%, #AAA 100%)"
              : "linear-gradient(135deg, #333 0%, #666 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 3,
        }}
      >
        Ready to Collaborate?
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 6, maxWidth: "700px", fontWeight: 400 }}
      >
        I&apos;m always open to discussing new projects, creative ideas, or
        opportunities to be part of your visions. Let&apos;s create something
        amazing together.
      </Typography>

      {/* Button first, then details below for a cleaner hierarchy */}
      <Button
        component={Link}
        href="/contact"
        variant="contained"
        color="secondary"
        size="large"
        endIcon={<SendIcon />}
        sx={{
          borderRadius: "50px",
          px: 5,
          py: 1.5,
          fontWeight: 700,
          textTransform: "none",
          fontSize: "1.1rem",
          mb: 6,
          boxShadow: theme.shadows[4],
          "&:hover": {
            boxShadow: theme.shadows[8],
            transform: "translateY(-2px)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        Get in Touch
      </Button>

      {/* Contact Details - Minimalist Row */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 3, sm: 6 }}
        alignItems="center"
        justifyContent="center"
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <EmailIcon color="secondary" sx={{ fontSize: "1.5rem" }} />
          <Typography
            variant="body1"
            fontWeight={500}
            color="text.primary"
            sx={{
              "&:hover": { color: "secondary.main" },
              transition: "color 0.2s",
            }}
          >
            kiviamarakoon@gmail.com
          </Typography>
        </Stack>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", sm: "block" } }}
        />

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <PhoneIcon color="secondary" sx={{ fontSize: "1.5rem" }} />
          <Typography
            variant="body1"
            fontWeight={500}
            color="text.primary"
            sx={{
              "&:hover": { color: "secondary.main" },
              transition: "color 0.2s",
            }}
          >
            +94 71 932 0164
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ContactCTA;
