"use client";
import { Blog, Post } from "@/types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Divider,
  Chip,
  Avatar,
  Button,
  Box,
  useTheme,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  CalendarToday,
  Person,
  ReadMore,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";

const BlogCard = ({ blog }: { blog: Post | Blog }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Extract excerpt from content, removing markdown syntax
  const getExcerpt = (content: string, maxLength: number = 150) => {
    if (blog.excerpt) return blog.excerpt;
    if (!content) return "";

    // Comprehensive markdown stripping
    const cleanContent = content
      .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
      .replace(/\[([^\]]+)\]\(.*?\)/g, "$1") // Keep link text, remove url
      .replace(/#{1,6}\s?/g, "") // Remove headers
      .replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold
      .replace(/(\*|_)(.*?)\1/g, "$2") // Remove italic
      .replace(/`{3}[\s\S]*?`{3}/g, "") // Remove code blocks
      .replace(/`(.+?)`/g, "$1") // Remove inline code
      .replace(/>\s?/g, "") // Remove blockquotes
      .replace(/\n+/g, " ") // Replace newlines with spaces
      .trim();

    return cleanContent.length > maxLength
      ? cleanContent.slice(0, maxLength) + "..."
      : cleanContent;
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      component="a"
      href={`/blog/${blog.slug}`}
      sx={{
        width: "100%",
        minWidth: { xs: 280, sm: 300 },
        maxWidth: { xs: 400, sm: 450 },
        borderRadius: 4,
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(30, 30, 30, 0.6)"
            : "rgba(255,255,255,0.8)",
        backdropFilter: "blur(20px)",
        border: (theme) =>
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(255, 255, 255, 0.5)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        position: "relative",
        textDecoration: "none", // Ensure link underline doesn't show
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 20px 40px rgba(0, 0, 0, 0.4)"
              : "0 20px 40px rgba(0, 0, 0, 0.1)",
          "& .blog-image": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden", height: 220 }}>
        <Image
          src={
            (blog.coverImage ||
              blog.image ||
              "/images/blog-placeholder.svg") as string
          }
          alt={blog.title}
          fill
          className="blog-image"
          style={{
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay - subtle */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%)",
            opacity: 0.8,
          }}
        />

        {/* Bookmark button */}
        <Fade in={isHovered}>
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
            }}
          >
            <Tooltip title={isBookmarked ? "Remove bookmark" : "Bookmark"}>
              <IconButton
                onClick={handleBookmarkClick}
                sx={{
                  background: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(8px)",
                  color: "white",
                  "&:hover": {
                    background: "rgba(0, 0, 0, 0.8)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
                size="small"
              >
                {isBookmarked ? (
                  <Bookmark
                    sx={{ fontSize: 18, color: theme.palette.secondary.main }}
                  />
                ) : (
                  <BookmarkBorder sx={{ fontSize: 18 }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Fade>
      </Box>

      <CardContent
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.secondary.main,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: "0.7rem",
            }}
          >
            {new Date(
              blog.createdAt || blog.date || Date.now(),
            ).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Typography>

          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.3,
              color: theme.palette.text.primary,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {blog.title}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ opacity: 0.8 }}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Avatar
              sx={{
                width: 20,
                height: 20,
                fontSize: "0.6rem",
                bgcolor: theme.palette.secondary.main,
              }}
            >
              {/* Fallback initial or icon */}
              <Person sx={{ fontSize: 12 }} />
            </Avatar>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {blog.owner?.firstName || (blog as any).blogOwner?.firstName}{" "}
              {blog.owner?.lastName || (blog as any).blogOwner?.lastName}
            </Typography>
          </Stack>

          <Box
            sx={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: theme.palette.text.secondary,
            }}
          />

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <FavoriteIcon
              sx={{ fontSize: 12, color: theme.palette.error.main }}
            />
            <Typography variant="caption" color="text.secondary">
              {blog.likes || 0}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flexGrow: 1,
            fontSize: "0.9rem",
          }}
        >
          {getExcerpt(blog.content)}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
          {(blog.tags || []).slice(0, 3).map((tag, index) => {
            const tagName = typeof tag === "string" ? tag : tag.name;
            const tagKey = typeof tag === "string" ? tag : tag.id;
            return (
              <Chip
                key={tagKey || index}
                label={tagName}
                size="small"
                sx={{
                  fontSize: "0.7rem",
                  height: 24,
                  fontWeight: 600,
                  borderRadius: "6px",
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                  color: theme.palette.text.secondary,
                }}
              />
            );
          })}
          {(blog.tags || []).length > 3 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ alignSelf: "center" }}
            >
              +{(blog.tags || []).length - 3}
            </Typography>
          )}
        </Stack>

        <Box sx={{ mt: 1 }}>
          <Typography
            variant="button"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              fontSize: "0.85rem",
              opacity: isHovered ? 1 : 0.8,
              transform: isHovered ? "translateX(4px)" : "none",
              transition: "all 0.3s ease",
            }}
          >
            Read Article <ReadMore sx={{ fontSize: 18, ml: 0.5 }} />
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
