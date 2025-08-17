"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Avatar,
  Divider,
  Stack,
  Breadcrumbs,
  Link,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Favorite,
  Share,
  ArrowBack,
  CalendarToday,
  Person,
} from "@mui/icons-material";
import { useBlogBySlug } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { LoadingSpinner, ErrorMessage } from "@/lib/hooks";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";
import Image from "next/image";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const router = useRouter();
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getSlug();
  }, [params]);
  const { data: blog, isLoading, isError, error } = useBlogBySlug(slug);
  const blogData = blog?.data;

  if (!slug) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
      >
        <LoadingSpinner />
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
      >
        <LoadingSpinner />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
      >
        <ErrorMessage error={error} message="Blog post not found" />
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
      >
        <Typography
          variant="h4"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          Blog post not found
        </Typography>
      </Container>
    );
  }

  const handleBackClick = () => {
    router.push("/blog");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogData?.title,
        text: blogData?.excerpt || blogData?.content.slice(0, 150),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 4, md: 8 },
        pt: { xs: "90px", md: "130px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Breadcrumbs */}
      <Box sx={{ width: "100%", maxWidth: "900px", mb: 3 }}>
        <Breadcrumbs>
          <Link
            component="button"
            variant="body1"
            onClick={handleBackClick}
            sx={{
              color: "text.secondary",
              textDecoration: "none",
              cursor: "pointer",
              "&:hover": {
                color: "secondary.main",
              },
            }}
          >
            Blogs
          </Link>
          <Typography
            color="text.primary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "300px",
            }}
          >
            {blogData?.title}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Blog Title */}
      {/* <Box
        sx={{ width: "100%", maxWidth: "900px", mb: 4, textAlign: "center" }}
      >
        <Typography
          variant="h3"
          component="h1"
          fontWeight={700}
          sx={{
            mb: 2,
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #fff, #e0e0e0)"
                : "linear-gradient(135deg, #1a1a1a, #333)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: { xs: "2rem", md: "3rem" },
            lineHeight: 1.2,
          }}
        >
          {blogData?.title}
        </Typography>
      </Box> */}

      {/* Featured Image */}
      {blogData?.coverImage && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "900px",
            height: { xs: 250, md: 400 },
            mb: 4,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 12px 40px rgba(0, 0, 0, 0.4)"
                : "0 12px 40px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Image
            src={blogData.coverImage}
            alt={blogData.title}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />
        </Box>
      )}

      {/* Meta Information */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "900px",
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 4,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(35, 39, 47, 0.8)"
              : "rgba(255,255,255,0.9)",
          backdropFilter: "blur(12px)",
          border: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Meta information */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "center", sm: "center" }}
          justifyContent="center"
          sx={{ mb: blogData?.tags && blogData?.tags.length > 0 ? 3 : 0 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <Person />
            </Avatar>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {blogData?.blogOwner.firstName} {blogData?.blogOwner.lastName}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarToday fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {new Date(blogData?.createdAt || "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Favorite fontSize="small" color="secondary" />
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {blogData?.likes} likes
            </Typography>
          </Stack>

          <Tooltip title="Share this blog">
            <IconButton
              onClick={handleShare}
              size="small"
              sx={{
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                "&:hover": {
                  background: "secondary.main",
                  color: "white",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Share />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Tags */}
        {blogData?.tags && blogData?.tags.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            sx={{ gap: 1 }}
          >
            {blogData?.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                color="secondary"
                sx={{
                  fontWeight: 500,
                  "&:hover": {
                    background: "secondary.dark",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </Stack>
        )}
      </Paper>

      {/* Content */}
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "900px",
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(35, 39, 47, 0.8)"
              : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          border: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.05)",
          minHeight: "60vh",
        }}
      >
        {/* add titile here instead of the content */}
        <Typography
          variant="h1"
          color="text.primary"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: 700,
            fontSize: { xs: "1.5rem", md: "2.5rem" },
          }}
        >
          {blogData?.title}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <MdxRenderer content={blogData?.content || ""} />
      </Paper>

      {/* Back to Blog Button */}
      <Box
        sx={{ width: "100%", maxWidth: "900px", mt: 4, textAlign: "center" }}
      >
        <IconButton
          onClick={handleBackClick}
          sx={{
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
            "&:hover": {
              background: "secondary.main",
              color: "white",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
            p: 2,
          }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1, fontWeight: 500 }}
        >
          Back to Blogs
        </Typography>
      </Box>
    </Container>
  );
};

export default BlogPostPage;
