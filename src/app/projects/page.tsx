"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useProjects, useSearchProjects } from "@/lib/queries";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6; // Show 6 projects per page

  // Use search query if search term exists, otherwise use regular projects query
  const searchQuery = useSearchProjects(search, page, limit);
  const projectsQuery = useProjects(page, limit);

  // Use the appropriate query based on whether we're searching
  const query = search.trim() ? searchQuery : projectsQuery;

  const { data, isLoading, isError, error } = query;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
      >
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to load projects: {error?.message || "Unknown error occurred"}
        </Alert>
      </Container>
    );
  }

  const projects = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
      >
        <Box sx={{ width: { xs: "100%", md: "40%" } }}>
          <Box
            component="img"
            src="/public/file.svg"
            alt="Projects Illustration"
            sx={{
              height: 300,
              borderRadius: 5,
              width: "100%",
              objectFit: "cover",
              background: "rgba(255,255,255,0.1)",
            }}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "60%" }, px: { xs: 0, md: 2 } }}>
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              fontWeight: 800,
              mb: 1,
              width: "100%",
              fontSize: { xs: 32, md: 50 },
            }}
          >
            Projects
          </Typography>
          <Divider
            sx={{
              backgroundColor: "secondary.light",
              height: 2,
              width: "100%",
            }}
          />
          <Typography variant="subtitle1" sx={{ color: "text.primary", mt: 2 }}>
            A collection of projects I have worked on in the past
          </Typography>
        </Box>
      </Stack>
      <Box sx={{ py: 2 }}>
        <Divider sx={{ width: "100%" }} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          width="100%"
        >
          <TextField
            name="projectSearch"
            placeholder="Search Projects"
            size="small"
            value={search}
            onChange={handleSearchChange}
            sx={{ width: { xs: "100%", sm: 300 } }}
          />
        </Stack>
      </Box>

      {projects.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {search
              ? "No projects found matching your search."
              : "No projects available at the moment."}
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              mt: 3,
              gap: 2,
              display: "flex",
              flexWrap: "wrap",
              mb: 5,
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {projects.map((project) => (
              <Card
                key={project.id}
                sx={{
                  width: 340,
                  m: 1,
                  borderRadius: 4,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  background: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(35, 39, 47, 0.7)"
                      : "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={project.image}
                  alt={project.title}
                  sx={{
                    objectFit: "cover",
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                  }}
                />
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="h6"
                      fontWeight={700}
                      sx={{ fontSize: 20 }}
                    >
                      {project.title}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="body2">{project.likes}</Typography>
                      <FavoriteIcon color="secondary" fontSize="small" />
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    {project.description.length > 120
                      ? project.description.slice(0, 120) + "..."
                      : project.description}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ mb: 1 }}
                  >
                    <Avatar sx={{ width: 28, height: 28 }} />
                    <Typography variant="caption" color="text.secondary">
                      Tags: {project.contributors.join(", ")}
                    </Typography>
                  </Stack>
                  <Button
                    variant="contained"
                    color="secondary"
                    href={project.link}
                    target="_blank"
                    sx={{ mt: 1, borderRadius: 2, fontWeight: 700 }}
                  >
                    Read
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="secondary"
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Projects;
