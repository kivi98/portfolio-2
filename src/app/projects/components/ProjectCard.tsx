"use client";
import { Project } from "@/types";
import {
  Card,
  CardContent,
  Typography,
  Stack,
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
  Launch,
  Bookmark,
  BookmarkBorder,
  ArrowForward,
} from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProjectCard = ({ project }: { project: Project | any }) => {
  const theme = useTheme();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Handle both Project and Post structures
  const image =
    project.image ||
    (project as any).coverImage ||
    "/images/project-placeholder.svg";
  const description =
    project.description || (project as any).content?.substring(0, 150) || "";
  const contributors =
    project.contributors ||
    ((project as any).owner
      ? [
          `${(project as any).owner.firstName} ${(project as any).owner.lastName}`,
        ]
      : ["Unknown"]);
  const technologies =
    project.technologies ||
    ((project as any).tags
      ? (project as any).tags.map((tag: any) =>
          typeof tag === "string" ? tag : tag.name,
        )
      : []);
  const date = project.date || (project as any).createdAt;
  const liveUrl =
    project.link || (project as any).liveUrl || (project as any).githubUrl;
  const slug = project.slug || `project-${project.id}`;

  // Extract clean description
  const getDescription = (desc: string, maxLength: number = 150) => {
    if (!desc) return "";
    return desc.length > maxLength ? desc.slice(0, maxLength) + "..." : desc;
  };

  const handleCardClick = () => {
    router.push(`/projects/${slug}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleLiveDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card
      onClick={handleCardClick}
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
          "& .project-image": {
            transform: "scale(1.1)",
          },
          "& .project-overlay": {
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
          src={image}
          alt={project.title}
          fill
          className="project-image"
          style={{
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <Box
          className="project-overlay"
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

        {/* Likes indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            background: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(8px)",
            borderRadius: 3,
            px: 1.5,
            py: 0.5,
            border: `1px solid rgba(255, 255, 255, 0.1)`,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <FavoriteIcon
              sx={{ fontSize: 16, color: theme.palette.secondary.main }}
            />
            <Typography
              variant="caption"
              sx={{ color: "white", fontWeight: 600, fontSize: "0.75rem" }}
            >
              {project.likes || 0}
            </Typography>
          </Stack>
        </Box>
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
          {project.title}
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
            {Array.isArray(contributors)
              ? contributors.join(", ")
              : contributors}
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
              {date ? new Date(date).toLocaleDateString() : "Recent"}
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
          {getDescription(description)}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}
        >
          {technologies?.slice(0, 3).map((tech: string, index: number) => (
            <Chip
              key={tech || index}
              label={tech}
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
          ))}
          {technologies && technologies.length > 3 && (
            <Chip
              label={`+${technologies.length - 3}`}
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
          <Stack spacing={1.5}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCardClick}
              endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
              fullWidth
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
              View Details
            </Button>
            {liveUrl && (
              <Button
                variant="outlined"
                color="secondary"
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLiveDemoClick}
                endIcon={<Launch sx={{ fontSize: 16 }} />}
                fullWidth
                sx={{
                  borderRadius: 3,
                  fontWeight: 600,
                  py: 1,
                  textTransform: "none",
                  fontSize: "0.85rem",
                  borderWidth: 2,
                  "&:hover": {
                    borderWidth: 2,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                Live Demo
              </Button>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
