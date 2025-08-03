import { Project } from "@/types";
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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CalendarToday, Person, Launch } from "@mui/icons-material";

const ProjectCard = ({ project }: { project: Project }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: "100%",
        minWidth: { xs: 280, sm: 300 },
        maxWidth: { xs: 400, sm: 450 },
        borderRadius: 3,
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 8px 32px rgba(0, 0, 0, 0.3)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "rgba(35, 39, 47, 0.33)"
            : "rgba(255,255,255,0.9)",
        backdropFilter: "blur(12px)",
        border: (theme) =>
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 12px 40px rgba(227, 0, 0, 0.2)"
              : "0 12px 40px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="200"
          image={project.image}
          alt={project.title}
          sx={{
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(0, 0, 0, 0.7)",
            borderRadius: "12px",
            px: 1.5,
            py: 0.5,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <FavoriteIcon
              sx={{ fontSize: 16, color: theme.palette.secondary.main }}
            />
            <Typography
              variant="caption"
              sx={{ color: "white", fontWeight: 600 }}
            >
              {project.likes}
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
            {project.contributors.join(", ")}
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
              {project.date
                ? new Date(project.date).toLocaleDateString()
                : "Recent"}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 3,
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          {project.description.length > 150
            ? project.description.slice(0, 150) + "..."
            : project.description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 3, flexWrap: "wrap", gap: 1 }}
        >
          {project.technologies?.slice(0, 3).map((tech) => (
            <Chip
              key={tech}
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
          {project.technologies && project.technologies.length > 3 && (
            <Chip
              label={`+${project.technologies.length - 3}`}
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
            href={project.link}
            target="_blank"
            endIcon={<Launch sx={{ fontSize: 16 }} />}
            fullWidth
            sx={{
              borderRadius: 2,
              fontWeight: 700,
              py: 1.5,
              textTransform: "none",
              fontSize: "0.9rem",
              boxShadow: "0 4px 12px rgba(227, 0, 0, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(227, 0, 0, 0.4)",
                transform: "translateY(-1px)",
              },
            }}
          >
            View Project
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
