"use client";
import React from "react";
import { Box, Container, Skeleton, Stack, Paper, Divider, useTheme } from "@mui/material";

const BlogPostLoading = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
    >
      {/* Breadcrumbs skeleton */}
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Skeleton variant="text" width={60} height={24} />
        <Skeleton variant="text" width={20} height={24} />
        <Skeleton variant="text" width={200} height={24} />
      </Stack>

      {/* Header skeleton */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 3,
          background:
            theme.palette.mode === "dark"
              ? "rgba(35, 39, 47, 0.7)"
              : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width="60%" height={40} />
        </Stack>

        {/* Meta information skeleton */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="text" width={100} height={20} />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="text" width={120} height={20} />
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton variant="text" width={80} height={20} />
          </Stack>

          <Skeleton variant="circular" width={32} height={32} />
        </Stack>

        {/* Tags skeleton */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Skeleton variant="rounded" width={60} height={24} />
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="rounded" width={70} height={24} />
        </Stack>

        <Divider sx={{ mb: 3 }} />
      </Paper>

      {/* Content skeleton */}
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
        }}
      >
        <Stack spacing={2}>
          <Skeleton variant="text" width="90%" height={32} />
          <Skeleton variant="text" width="85%" height={24} />
          <Skeleton variant="text" width="88%" height={24} />
          <Skeleton variant="text" width="92%" height={24} />
          <Skeleton variant="text" width="80%" height={24} />

          <Box sx={{ mt: 3 }}>
            <Skeleton variant="text" width="70%" height={28} />
            <Skeleton variant="text" width="95%" height={24} />
            <Skeleton variant="text" width="88%" height={24} />
            <Skeleton variant="text" width="92%" height={24} />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Skeleton variant="text" width="75%" height={28} />
            <Skeleton variant="text" width="90%" height={24} />
            <Skeleton variant="text" width="85%" height={24} />
            <Skeleton variant="text" width="88%" height={24} />
          </Box>

          <Box sx={{ mt: 3 }}>
            <Skeleton variant="text" width="60%" height={28} />
            <Skeleton variant="text" width="100%" height={24} />
            <Skeleton variant="text" width="95%" height={24} />
            <Skeleton variant="text" width="90%" height={24} />
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default BlogPostLoading;
