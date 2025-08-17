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
  Button,
  LinearProgress,
  Fab,
  Fade,
} from "@mui/material";
import {
  Favorite,
  Share,
  ArrowBack,
  CalendarToday,
  Person,
  AccessTime,
  Visibility,
  BookmarkBorder,
  KeyboardArrowUp,
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
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getSlug();
  }, [params]);

  // Reading progress and scroll tracking
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setReadingProgress(progress);
      setShowScrollToTop(scrollTop > 300);
    };

    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  const { data: blog, isLoading, isError, error } = useBlogBySlug(slug);
  const blogData = blog?.data;

  // Estimated reading time calculation
  const estimatedReadingTime = React.useMemo(() => {
    if (!blogData?.content) return 0;
    const wordsPerMinute = 200;
    const wordCount = blogData.content.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  }, [blogData?.content]);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={readingProgress}
        sx={{
          position: "fixed",
          top: { xs: 70, md: 80 },
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 3,
          backgroundColor: "transparent",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "secondary.main",
          },
        }}
      />

      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          py: { xs: 4, md: 6 },
          pt: { xs: "100px", md: "120px" },
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Navigation Header */}
        <Box sx={{ mb: 4 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBackClick}
              sx={{
                color: "text.secondary",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "secondary.main",
                  color: "white",
                },
                transition: "all 0.3s ease",
              }}
            >
              Back to Blogs
            </Button>

            <Stack direction="row" spacing={1}>
              <Tooltip title="Bookmark">
                <IconButton size="small">
                  <BookmarkBorder />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share">
                <IconButton size="small" onClick={handleShare}>
                  <Share />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          <Breadcrumbs sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            <Link
              component="button"
              variant="body2"
              onClick={handleBackClick}
              sx={{
                color: "text.secondary",
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": { color: "secondary.main" },
              }}
            >
              Blog
            </Link>
            <Typography
              variant="body2"
              color="text.secondary"
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

        {/* Article Header */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          {/* Title */}
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              fontWeight: 800,
              lineHeight: 1.2,
              mb: 3,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #ffffff, #e0e0e0)"
                  : "linear-gradient(135deg, #1a1a1a, #333333)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            {blogData?.title}
          </Typography>

          {/* Author and Meta Info */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            justifyContent="center"
            spacing={{ xs: 2, sm: 4 }}
            sx={{ mb: 4 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  background: "linear-gradient(135deg, #e30000, #ff6b6b)",
                }}
              >
                <Person />
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {blogData?.blogOwner?.firstName}{" "}
                  {blogData?.blogOwner?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author
                </Typography>
              </Box>
            </Stack>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", sm: "block" } }}
            />

            <Stack direction="row" spacing={3}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <CalendarToday fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {new Date(blogData?.createdAt || "").toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <AccessTime fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {estimatedReadingTime} min read
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Favorite fontSize="small" color="secondary" />
                <Typography variant="body2" color="text.secondary">
                  {blogData?.likes || 0}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Tags */}
          {blogData?.tags && blogData?.tags.length > 0 && (
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              flexWrap="wrap"
              sx={{ gap: 1, mb: 4 }}
            >
              {blogData.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: "secondary.main",
                    color: "white",
                    fontWeight: 500,
                    "&:hover": {
                      backgroundColor: "secondary.dark",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                />
              ))}
            </Stack>
          )}
        </Box>

        {/* Featured Image */}
        {blogData?.coverImage && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 300, sm: 400, md: 500 },
              mb: 6,
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 20px 60px rgba(0, 0, 0, 0.5)"
                  : "0 20px 60px rgba(0, 0, 0, 0.15)",
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

        {/* Main Content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 300px" },
            gap: 4,
            alignItems: "start",
          }}
        >
          {/* Article Content */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4, md: 6 },
              borderRadius: 3,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(35, 39, 47, 0.4)"
                  : "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(20px)",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.05)",
              minHeight: "60vh",
            }}
          >
            <MdxRenderer content={blogData?.content || ""} />
          </Paper>

          {/* Sidebar - Desktop Only */}
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
              position: "sticky",
              top: 120,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(35, 39, 47, 0.4)"
                    : "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.05)",
              }}
            >
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                Article Info
              </Typography>

              <Stack spacing={2}>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Reading Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={readingProgress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 3,
                        backgroundColor: "secondary.main",
                      },
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {Math.round(readingProgress)}% completed
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Share this article
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Share">
                      <IconButton
                        size="small"
                        onClick={handleShare}
                        sx={{
                          backgroundColor: "secondary.main",
                          color: "white",
                          "&:hover": { backgroundColor: "secondary.dark" },
                        }}
                      >
                        <Share fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Bookmark">
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "rgba(255,255,255,0.1)"
                              : "rgba(0,0,0,0.1)",
                          "&:hover": {
                            backgroundColor: "secondary.main",
                            color: "white",
                          },
                        }}
                      >
                        <BookmarkBorder fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* Scroll to Top FAB */}
      <Fade in={showScrollToTop}>
        <Fab
          onClick={scrollToTop}
          size="medium"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            backgroundColor: "secondary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "secondary.dark",
              transform: "scale(1.1)",
            },
            transition: "all 0.3s ease",
            zIndex: 1000,
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Fade>
    </>
  );
};

export default BlogPostPage;
