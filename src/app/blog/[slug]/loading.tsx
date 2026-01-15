"use client";
import React from "react";
import { Box, Container, CircularProgress } from "@mui/material";

const BlogPostLoading = () => {
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
          minHeight: "60vh",
        }}
      >
        <CircularProgress size={60} color="secondary" />
      </Box>
    </Container>
  );
};

export default BlogPostLoading;
