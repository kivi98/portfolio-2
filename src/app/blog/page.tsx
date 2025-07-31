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
  Chip,
  Avatar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";

const mockBlogs = [
  {
    id: 1,
    title: "Sample Blog Post",
    author: "Kivi Amarakoon",
    date: "2023-10-01",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "https://picsum.photos/200/300?1",
    tags: ["sample", "blog", "post"],
    likes: 100,
  },
  {
    id: 2,
    title: "Another Blog Post",
    author: "Kivi Amarakoon",
    date: "2023-10-05",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://picsum.photos/200/300?2",
    tags: ["blog", "post"],
    likes: 200,
  },
  {
    id: 3,
    title: "Yet Another Blog Post",
    author: "Kivi Amarakoon",
    date: "2023-10-10",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://picsum.photos/200/300?3",
    tags: ["yet", "post"],
    likes: 300,
  },
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const filteredBlogs = mockBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
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
            alt="Blog Illustration"
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
            Blogs
          </Typography>
          <Divider
            sx={{
              backgroundColor: "secondary.light",
              height: 2,
              width: "100%",
            }}
          />
          <Typography variant="subtitle1" sx={{ color: "text.primary", mt: 2 }}>
            A collection of blogs I have worked on in the past
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
            name="blogSearch"
            placeholder="Search Blogs"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
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
        {filteredBlogs.map((blog) => (
          <Card
            key={blog.id}
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
              image={blog.image}
              alt={blog.title}
              sx={{
                objectFit: "cover",
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: 20 }}>
                {blog.title}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ my: 1 }}
              >
                <Avatar sx={{ width: 28, height: 28 }} />
                <Typography variant="caption" color="text.secondary">
                  {blog.author} • {new Date(blog.date).toLocaleDateString()}
                </Typography>
              </Stack>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {blog.content.length > 120
                  ? blog.content.slice(0, 120) + "..."
                  : blog.content}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 1, flexWrap: "wrap" }}
              >
                {blog.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" color="secondary" />
                ))}
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="body2">{blog.likes}</Typography>
                <FavoriteIcon color="secondary" fontSize="small" />
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ ml: "auto", borderRadius: 2, fontWeight: 700 }}
                >
                  Read
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Blog;
