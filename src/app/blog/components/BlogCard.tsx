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

    // Remove markdown syntax for a cleaner excerpt
    const cleanContent = content
      .replace(/[#*`_\[\]]/g, "") // Remove markdown characters
      .replace(/!\[.*?\]\(.*?\)/g, "") // Remove image syntax
      .replace(/\[.*?\]\(.*?\)/g, "") // Remove link syntax
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
      sx={{
        width: "100%",
        minWidth: { xs: 280, sm: 300 },
        maxWidth: { xs: 400, sm: 450 },
        borderRadius: 4,
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(35, 39, 47, 0.4)"
            : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(16px)",
        border: (theme) =>
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.12)"
            : "1px solid rgba(0, 0, 0, 0.08)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 20px 60px rgba(227, 0, 0, 0.25)"
              : "0 20px 60px rgba(0, 0, 0, 0.15)",
          "& .blog-image": {
            transform: "scale(1.1)",
          },
          "& .blog-overlay": {
            opacity: 1,
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
          transform: "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.3s ease",
        },
        "&:hover::before": {
          transform: "scaleX(1)",
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden", height: 240 }}>
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

        {/* Gradient overlay */}
        <Box
          className="blog-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.7) 100%)",
            opacity: 0,
            transition: "opacity 0.3s ease",
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
        sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            fontSize: 18,
            lineHeight: 1.3,
            mb: 2,
            color: theme.palette.text.primary,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {blog.title}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              fontSize: "0.75rem",
              background: theme.palette.secondary.main,
            }}
          >
            <Person sx={{ fontSize: 14 }} />
          </Avatar>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 500 }}
          >
            {blog.owner?.firstName || (blog as any).blogOwner?.firstName}{" "}
            {blog.owner?.lastName || (blog as any).blogOwner?.lastName}
          </Typography>
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: theme.palette.text.secondary,
            }}
          />
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CalendarToday
              sx={{ fontSize: 12, color: theme.palette.text.secondary }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {new Date(
                blog.createdAt || blog.date || Date.now(),
              ).toLocaleDateString()}
            </Typography>
          </Stack>
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: theme.palette.text.secondary,
            }}
          />
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Add like logic here if needed, for now just display
            }}
            sx={{ cursor: "default" }}
          >
            <FavoriteIcon
              sx={{ fontSize: 12, color: theme.palette.secondary.main }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {blog.likes || 0}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flexGrow: 1,
            fontSize: "0.95rem",
          }}
        >
          {getExcerpt(blog.content)}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}
        >
          {(blog.tags || []).slice(0, 3).map((tag, index) => {
            const tagName = typeof tag === "string" ? tag : tag.name;
            const tagKey = typeof tag === "string" ? tag : tag.id;
            return (
              <Chip
                key={tagKey || index}
                label={tagName}
                size="small"
                color="secondary"
                sx={{
                  fontSize: "0.7rem",
                  height: 24,
                  fontWeight: 600,
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            );
          })}
          {(blog.tags || []).length > 3 && (
            <Chip
              label={`+${(blog.tags || []).length - 3}`}
              size="small"
              variant="outlined"
              sx={{
                fontSize: "0.7rem",
                height: 24,
                color: theme.palette.text.secondary,
                borderColor: theme.palette.text.secondary,
              }}
            />
          )}
        </Stack>

        <Box sx={{ mt: "auto" }}>
          <Button
            variant="contained"
            color="secondary"
            href={`/blog/${blog.slug}`}
            fullWidth
            startIcon={<ReadMore />}
            sx={{
              borderRadius: 3,
              fontWeight: 700,
              py: 1.5,
              textTransform: "none",
              fontSize: "0.9rem",
              background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
              boxShadow: `0 4px 12px ${theme.palette.secondary.main}40`,
              border: "none",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
                boxShadow: `0 6px 20px ${theme.palette.secondary.main}50`,
                transform: "translateY(-2px)",
              },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                transition: "left 0.5s ease",
              },
              "&:hover::before": {
                left: "100%",
              },
            }}
          >
            Read Full Article
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
