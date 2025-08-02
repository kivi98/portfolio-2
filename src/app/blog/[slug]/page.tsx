"use client";

import React from "react";
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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useBlogBySlug } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { LoadingSpinner, ErrorMessage } from "@/lib/hooks";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const router = useRouter();
  const { slug } = params;
  const { data: blog, isLoading, isError, error } = useBlogBySlug(slug);

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
        title: blog.title,
        text: blog.excerpt || blog.content.slice(0, 150),
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 4, md: 8 }, pt: { xs: "90px", md: "130px" } }}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body1"
          onClick={handleBackClick}
          sx={{
            color: "text.secondary",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          Blogs
        </Link>
        <Typography color="text.primary">{blog.title}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderRadius: 3,
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(35, 39, 47, 0.7)"
              : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <IconButton onClick={handleBackClick} size="small">
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1" fontWeight={700}>
            {blog.title}
          </Typography>
        </Stack>

        {/* Meta information */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ mb: 3 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <Person />
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              {blog.author}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarToday fontSize="small" color="action" />
            <Typography variant="body2" color="text.secondary">
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Favorite fontSize="small" color="secondary" />
            <Typography variant="body2" color="text.secondary">
              {blog.likes} likes
            </Typography>
          </Stack>

          <Tooltip title="Share">
            <IconButton onClick={handleShare} size="small">
              <Share />
            </IconButton>
          </Tooltip>
        </Stack>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            {blog.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" color="secondary" />
            ))}
          </Stack>
        )}

        <Divider sx={{ mb: 3 }} />
      </Paper>

      {/* Content */}
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
        }}
      >
        <Box
          sx={{
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              color: "text.primary",
              fontWeight: 600,
              mt: 4,
              mb: 2,
            },
            "& h1": { fontSize: "2.5rem" },
            "& h2": { fontSize: "2rem" },
            "& h3": { fontSize: "1.75rem" },
            "& h4": { fontSize: "1.5rem" },
            "& h5": { fontSize: "1.25rem" },
            "& h6": { fontSize: "1rem" },
            "& p": {
              color: "text.secondary",
              lineHeight: 1.7,
              mb: 2,
              fontSize: "1.1rem",
            },
            "& ul, & ol": {
              color: "text.secondary",
              pl: 3,
              mb: 2,
            },
            "& li": {
              mb: 1,
              lineHeight: 1.6,
            },
            "& blockquote": {
              borderLeft: 3,
              borderColor: "secondary.main",
              pl: 3,
              ml: 0,
              my: 3,
              fontStyle: "italic",
              color: "text.secondary",
            },
            "& code": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
              borderRadius: 1,
              px: 1,
              py: 0.5,
              fontSize: "0.9em",
              fontFamily: "monospace",
            },
            "& pre": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(0,0,0,0.3)"
                  : "rgba(0,0,0,0.05)",
              borderRadius: 2,
              p: 2,
              overflow: "auto",
              mb: 3,
              "& code": {
                backgroundColor: "transparent",
                p: 0,
              },
            },
            "& a": {
              color: "secondary.main",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            "& img": {
              maxWidth: "100%",
              height: "auto",
              borderRadius: 2,
              my: 2,
            },
            "& table": {
              width: "100%",
              borderCollapse: "collapse",
              mb: 3,
            },
            "& th, & td": {
              border: 1,
              borderColor: "divider",
              p: 1,
              textAlign: "left",
            },
            "& th": {
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.05)",
              fontWeight: 600,
            },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {blog.content}
          </ReactMarkdown>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogPostPage;
