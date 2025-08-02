"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { ArrowBack, Home, Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const BlogPostNotFound = () => {
  const router = useRouter();

  const handleBackToBlogs = () => {
    router.push("/blog");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleSearchBlogs = () => {
    router.push("/blog");
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
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(35, 39, 47, 0.7)"
              : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(8px)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="text.primary"
        >
          Blog Post Not Found
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          The blog post you're looking for doesn't exist or has been moved.
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Don't worry! You can explore our other blog posts or go back to the
          main page.
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
            startIcon={<Search />}
            onClick={handleSearchBlogs}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Browse Blogs
          </Button>

          <Button
            variant="text"
            color="secondary"
            startIcon={<Home />}
            onClick={handleGoHome}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Go Home
          </Button>
        </Stack>

        <Box sx={{ mt: 4, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Popular Topics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Check out our latest articles on Next.js, React, Node.js, and more!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogPostNotFound;
