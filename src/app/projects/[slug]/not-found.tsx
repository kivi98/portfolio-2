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
import { ArrowBack, Home, Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const ProjectNotFound = () => {
  const router = useRouter();
  const theme = useTheme();

  const handleBackToProjects = () => {
    router.push("/projects");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleSearchProjects = () => {
    router.push("/projects");
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
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="text.primary"
        >
          Project Not Found
        </Typography>

        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          The project you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Don&apos;t worry! You can explore our other projects or go back to the
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
            onClick={handleBackToProjects}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Back to Projects
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Search />}
            onClick={handleSearchProjects}
            sx={{ borderRadius: 2, fontWeight: 700 }}
          >
            Browse Projects
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
            Featured Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Check out our latest projects using React, Next.js, TypeScript, and
            more!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProjectNotFound;
