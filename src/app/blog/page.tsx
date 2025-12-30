"use client";
import React, { useState } from "react";
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBlogs, useSearchBlogs } from "@/lib/queries";
import CustomCarousel from "../about/components/CustomCarousel";
import BlogCard from "./components/BlogCard";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6; // Show 6 blogs per page

  // Use search query if search term exists, otherwise use regular blogs query
  const searchQuery = useSearchBlogs(search, page, limit);
  const blogsQuery = useBlogs(page, limit);

  // Use the appropriate query based on whether we're searching
  const query = search.trim() ? searchQuery : blogsQuery;

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
          <CircularProgress size={60} />
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
          Failed to load blogs: {error?.message || "Unknown error occurred"}
        </Alert>
      </Container>
    );
  }

  const blogs = data?.data || [];
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
            images={blogs.map((blog) => ({
              id: blog.id,
              src: blog.coverImage,
              alt: blog.title,
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
            height: 300,
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
              My Blog
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
              Exploring the intersection of technology, creativity, and
              innovation. Dive into my thoughts on software development, design
              principles, and the ever-evolving digital landscape. From coding
              best practices to emerging tech trends, discover insights that
              bridge theory and real-world application.
            </Typography>
          </Box>
          {/* <Box sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 0 }}>
            <Button variant="contained" color="secondary" sx={{ width: "100%" }}>
              Read More
            </Button>
          </Box> */}
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

      {blogs.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {search
              ? "No blogs found matching your search."
              : "No blogs available at the moment."}
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
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
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

export default Blog;
