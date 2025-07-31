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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const mockProjects = [
  {
    id: 1,
    title: "Project 1",
    description: "This is project 1",
    image: "https://picsum.photos/200/300?1",
    link: "https://www.google.com",
    contributors: ["Kivi", "Rash"],
    likes: 100,
  },
  {
    id: 2,
    title: "Project 2",
    description: "This is project 2",
    image: "https://picsum.photos/200/300?2",
    link: "https://www.google.com",
    contributors: ["Kivi", "Rash"],
    likes: 200,
  },
  {
    id: 3,
    title: "Project 3",
    description: "This is project 3",
    image: "https://picsum.photos/200/300?3",
    link: "https://www.google.com",
    contributors: ["Kivi", "Rash"],
    likes: 300,
  },
];

const Projects = () => {
  const [search, setSearch] = useState("");
  const filteredProjects = mockProjects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}>
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
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: { xs: "100%", sm: 300 } }}
          />
        </Stack>
      </Box>
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
        {filteredProjects.map((project) => (
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
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: 20 }}>
                  {project.title}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body2">{project.likes}</Typography>
                  <FavoriteIcon color="secondary" fontSize="small" />
                </Stack>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
    </Container>
  );
};

export default Projects;
