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
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import { usePosts, useProjects, useSearchProjects } from "@/lib/queries";
import CustomCarousel from "../about/components/CustomCarousel";
import ProjectCard from "./components/ProjectCard";
import { ContentCategory, PostStatus } from "@/enum";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6; // Show 6 projects per page

  // Use search query if search term exists, otherwise use regular projects query
  const searchQuery = useSearchProjects(search, page, limit);
  const projectsQuery = usePosts(
    page,
    limit,
    ContentCategory.Project,
    PostStatus.Published,
  );

  // Use the appropriate query based on whether we're searching
  const query = search.trim() ? searchQuery : projectsQuery;

  const { data, isLoading, isError, error } = query;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 4, md: 8 },
          pt: { xs: "90px", md: "130px" },
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress size={60} color="secondary" />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 4, md: 8 },
          pt: { xs: "90px", md: "130px" },
          minHeight: "100vh",
        }}
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
      sx={{
        py: { xs: 4, md: 8 },
        pt: { xs: "90px", md: "150px" },
        minHeight: "100vh",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={4}
        alignItems="center"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "40%" } }}>
          <CustomCarousel
            images={projects.map((project: any) => ({
              id: project.id,
              src:
                project.image ||
                project.coverImage ||
                "/images/project-placeholder.jpg",
              alt: project.title,
            }))}
            height={300}
            width="100%"
            autoTransition={true}
            transitionInterval={5000}
            imageHeight={300}
            imageSx={{
              borderRadius: 5,
            }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            px: { xs: 0, md: 0 },
            justifyContent: "flex-start",
            height: { xs: "auto", md: 300 },
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
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
              My Projects
            </Typography>
            <Divider
              sx={{
                backgroundColor: "secondary.light",
                height: 2,
                width: "100%",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{ color: "text.primary", mt: 2, height: "100%", flexGrow: 1 }}
            >
              A collection of innovative projects I&apos;ve developed,
              showcasing my expertise in software development, design
              principles, and cutting-edge technologies. From web applications
              to mobile solutions, each project represents a unique challenge
              and creative solution.
            </Typography>
          </Box>
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
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            sx={{
              width: { xs: "100%", sm: 300 },
              "& .MuiInputBase-root": {
                backdropFilter: "blur(8px)",
                borderRadius: "1rem",
                boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              },
            }}
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
              gap: 2.5,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              mb: 5,
              px: { xs: 2, sm: 3, md: 0 },
              mx: "auto",
              maxWidth: "100%",
            }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
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
