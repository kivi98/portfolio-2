"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  useTheme,
} from "@mui/material";
import { ArrowBack, Home } from "@mui/icons-material";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const BlogPostError = ({ error, reset }: ErrorProps) => {
  const router = useRouter();
  const theme = useTheme();

  const handleBackToBlogs = () => {
    router.push("/blog");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          background:
            theme.palette.mode === "dark"
              ? "rgba(35, 39, 47, 0.7)"
              : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(8px)",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom color="error">
          Oops! Something went wrong
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          {error.message || "Failed to load the blog post"}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          The blog post you&apos;re looking for might not exist or there was an
          error loading it. Please try again or navigate to a different page.
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBack />}
            onClick={handleBackToBlogs}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Back to Blogs
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Home />}
            onClick={handleGoHome}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Go Home
          </Button>

          <Button
            variant="text"
            color="secondary"
            onClick={reset}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Try Again
          </Button>
        </Stack>

        {process.env.NODE_ENV === "development" && (
          <Box
            sx={{ mt: 4, p: 2, bgcolor: "background.paper", borderRadius: 2 }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: "monospace" }}
            >
              Error: {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default BlogPostError;
