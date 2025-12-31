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
  Modal,
  Backdrop,
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
  FormatListBulleted,
  Close,
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

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const router = useRouter();
  const [slug, setSlug] = useState<string>("");
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [showMobileToc, setShowMobileToc] = useState(false);

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getSlug();
  }, [params]);

  const { data: blog, isLoading, isError, error } = useBlogBySlug(slug);
  const blogData = blog?.data;

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

  // Extract TOC from content and set up intersection observer
  useEffect(() => {
    if (!blogData?.content) return;

    // Extract headings from content
    const extractTocFromContent = () => {
      // Wait for content to be rendered
      setTimeout(() => {
        const headings = document.querySelectorAll(
          ".mdx-content h1, .mdx-content h2, .mdx-content h3, .mdx-content h4, .mdx-content h5, .mdx-content h6",
        );
        const tocData: TocItem[] = [];

        headings.forEach((heading, index) => {
          const level = parseInt(heading.tagName.charAt(1));
          const text = heading.textContent || "";
          const id = `heading-${index}`;

          // Add ID to heading if it doesn't have one
          heading.id = id;

          tocData.push({ id, text, level });
        });

        setTocItems(tocData);
      }, 100);
    };

    extractTocFromContent();
  }, [blogData?.content]);

  // Intersection Observer for active heading tracking
  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -60% 0%",
        threshold: 0,
      },
    );

    tocItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      tocItems.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [tocItems]);

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

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      const offset = 120; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
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

      {/* Table of Contents - Fixed Left Sidebar */}
      {tocItems.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            left: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            width: "auto",
            minWidth: "300px",
            maxHeight: "70vh",
            overflowY: "auto",
            zIndex: 100,
            display: { xs: "none", xl: "block", md: "block", lg: "block" },
            pl: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              background: (theme) =>
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, rgba(35, 39, 47, 0.95) 0%, rgba(45, 49, 57, 0.95) 100%)"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.95) 100%)",
              backdropFilter: "blur(20px)",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(227, 0, 0, 0.3), transparent)",
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{
                mb: 3,
                color: "white",
                textTransform: "uppercase",
                letterSpacing: 1,
                fontSize: "0.75rem",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                pb: 1,
              }}
            >
              Table of Contents
            </Typography>
            <Stack spacing={1}>
              {tocItems.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  sx={{
                    justifyContent: "flex-start",
                    textAlign: "left",
                    textTransform: "none",
                    pl: 2 + (item.level - 1) * 1.5,
                    pr: 2,
                    py: 1,
                    minHeight: "auto",
                    color:
                      activeHeading === item.id ? "white" : "text.secondary",
                    backgroundColor:
                      activeHeading === item.id
                        ? "secondary.main"
                        : "rgba(255, 255, 255, 0.05)",
                    border:
                      activeHeading === item.id
                        ? "1px solid rgba(227, 0, 0, 0.3)"
                        : "1px solid transparent",
                    borderRadius: 2,
                    fontSize:
                      Math.max(0.85 - (item.level - 1) * 0.05, 0.75) + "rem",
                    fontWeight: activeHeading === item.id ? 600 : 500,
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      backgroundColor:
                        activeHeading === item.id
                          ? "secondary.dark"
                          : "rgba(255, 255, 255, 0.1)",
                      transform: "translateY(-1px)",
                      boxShadow:
                        activeHeading === item.id
                          ? "0 4px 12px rgba(227, 0, 0, 0.3)"
                          : "0 4px 12px rgba(0, 0, 0, 0.2)",
                    },
                    "&::before":
                      activeHeading === item.id
                        ? {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: "3px",
                            backgroundColor: "white",
                            borderRadius: "0 2px 2px 0",
                          }
                        : {},
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Stack>
          </Paper>
        </Box>
      )}

      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          py: { xs: 4, md: 6 },
          pt: { xs: "100px", md: "120px" },
          px: { xs: 2, md: 4 },
          ml: { xl: tocItems.length > 0 ? "270px" : "auto" },
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
              {tocItems.length > 0 && (
                <Tooltip title="Table of Contents">
                  <IconButton
                    size="small"
                    onClick={() => setShowMobileToc(true)}
                    sx={{ display: { xl: "none" } }}
                  >
                    <FormatListBulleted />
                  </IconButton>
                </Tooltip>
              )}
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
                  {blogData?.owner?.firstName || (blogData as any)?.blogOwner?.firstName}{" "}
                  {blogData?.owner?.lastName || (blogData as any)?.blogOwner?.lastName}
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
                    },
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
              {(blogData.tags || []).map((tag, index) => {
                const tagName = typeof tag === 'string' ? tag : tag.name;
                const tagKey = typeof tag === 'string' ? tag : tag.id;
                return (
                  <Chip
                    key={tagKey || index}
                    label={tagName}
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
                );
              })}
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

      {/* Mobile TOC Modal */}
      <Modal
        open={showMobileToc}
        onClose={() => setShowMobileToc(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(4px)",
            },
          },
        }}
      >
        <Fade in={showMobileToc}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "400px" },
              maxHeight: "80vh",
              overflowY: "auto",
              outline: "none",
            }}
          >
            <Paper
              elevation={24}
              sx={{
                p: 3,
                borderRadius: 3,
                background: (theme) =>
                  theme.palette.mode === "dark"
                    ? "linear-gradient(135deg, rgba(35, 39, 47, 0.98) 0%, rgba(45, 49, 57, 0.98) 100%)"
                    : "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 245, 0.98) 100%)",
                backdropFilter: "blur(20px)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(227, 0, 0, 0.3), transparent)",
                  borderRadius: "3px 3px 0 0",
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  mb: 3,
                  pb: 2,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontSize: "1rem",
                  }}
                >
                  Table of Contents
                </Typography>
                <IconButton
                  onClick={() => setShowMobileToc(false)}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Close />
                </IconButton>
              </Stack>

              <Stack spacing={1}>
                {tocItems.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => {
                      scrollToHeading(item.id);
                      setShowMobileToc(false);
                    }}
                    sx={{
                      justifyContent: "flex-start",
                      textAlign: "left",
                      textTransform: "none",
                      pl: 2 + (item.level - 1) * 1.5,
                      pr: 2,
                      py: 1.5,
                      color:
                        activeHeading === item.id ? "white" : "text.secondary",
                      backgroundColor:
                        activeHeading === item.id
                          ? "secondary.main"
                          : "rgba(255, 255, 255, 0.05)",
                      border:
                        activeHeading === item.id
                          ? "1px solid rgba(227, 0, 0, 0.3)"
                          : "1px solid transparent",
                      borderRadius: 2,
                      fontSize:
                        Math.max(0.9 - (item.level - 1) * 0.05, 0.8) + "rem",
                      fontWeight: activeHeading === item.id ? 600 : 500,
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        backgroundColor:
                          activeHeading === item.id
                            ? "secondary.dark"
                            : "rgba(255, 255, 255, 0.1)",
                        transform: "translateY(-1px)",
                        boxShadow:
                          activeHeading === item.id
                            ? "0 4px 12px rgba(227, 0, 0, 0.3)"
                            : "0 4px 12px rgba(0, 0, 0, 0.2)",
                      },
                      "&::before":
                        activeHeading === item.id
                          ? {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: "3px",
                              backgroundColor: "white",
                              borderRadius: "0 2px 2px 0",
                            }
                          : {},
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Stack>
            </Paper>
          </Box>
        </Fade>
      </Modal>

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
