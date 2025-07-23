"use client";
import React from "react";
import {
  Box,
  Stack,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  styled,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import XIcon from "@mui/icons-material/X";
import { keyframes } from "@emotion/react";

const iconBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  height: 50,
  width: 50,
  borderRadius: 12,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  margin: theme.spacing(0.5),
  transition: "background 0.2s",
  "&:hover": {
    animation: `${iconBounce} 1.2s`,
    background: theme.palette.secondary.main,
    color: theme.palette.getContrastText(theme.palette.secondary.main),
  },
}));

const Contact = () => {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            minWidth: { xs: "100%", md: 320 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            py: { xs: 2, md: 0 },
          }}
        >
          <Box
            component="img"
            src="/public/file.svg"
            alt="Contact Illustration"
            sx={{
              height: { xs: 180, md: 320 },
              width: { xs: 180, md: 320 },
              objectFit: "contain",
              borderRadius: 4,
              boxShadow: 2,
              background: "rgba(255,255,255,0.1)",
            }}
          />
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" }, mx: 2 }}
        />
        <Box sx={{ flex: 1, width: "100%" }}>
          <form method="post" action="mailto:kiviamarakoon@gmail.com">
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  label="Email"
                  name="email"
                  size="small"
                  fullWidth
                  required
                />
                <TextField
                  label="Name"
                  name="name"
                  size="small"
                  fullWidth
                  required
                />
              </Stack>
              <TextField
                label="Subject"
                name="subject"
                size="small"
                fullWidth
                required
              />
              <TextField
                label="Message"
                name="message"
                size="small"
                fullWidth
                multiline
                rows={4}
                required
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                  sx={{ px: 4, height: 40, borderRadius: 2, fontWeight: 700 }}
                >
                  SEND
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box sx={{ mt: { xs: 4, md: 8 }, textAlign: "center" }}>
        <Typography variant="h6" sx={{ color: "text.primary", mb: 2 }}>
          Get in touch with me...
        </Typography>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
          >
            <StyledIconButton>
              <FacebookIcon fontSize="medium" />
            </StyledIconButton>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
          >
            <StyledIconButton>
              <InstagramIcon fontSize="medium" />
            </StyledIconButton>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <StyledIconButton>
              <LinkedInIcon fontSize="medium" />
            </StyledIconButton>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <StyledIconButton>
              <GitHubIcon fontSize="medium" />
            </StyledIconButton>
          </a>
          <a
            href="https://medium.com"
            target="_blank"
            rel="noopener"
            aria-label="Medium"
          >
            <StyledIconButton>
              <ArticleIcon fontSize="medium" />
            </StyledIconButton>
          </a>
          <a href="https://x.com" target="_blank" rel="noopener" aria-label="X">
            <StyledIconButton>
              <XIcon fontSize="medium" />
            </StyledIconButton>
          </a>
        </Stack>
      </Box>
    </Container>
  );
};

export default Contact;
