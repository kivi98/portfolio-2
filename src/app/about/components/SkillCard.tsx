import { Box, Stack, Typography, Divider } from "@mui/material";
import { ReactNode } from "react";

interface SkillCardProps {
  title: string;
  subtitle?: string;
  description?: ReactNode;
  date: string;
  listDescription?: ReactNode;
  zoomInAnimation?: boolean;
}

const SkillCard = ({
  title,
  subtitle,
  description,
  date,
  listDescription,
  zoomInAnimation,
}: SkillCardProps) => {
  return (
    <Box
      sx={(theme) => ({
        p: 3,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        borderRadius: "20px",
        background:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.02)"
            : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        transition: "all 0.3s ease",
        ...(zoomInAnimation && {
          "&:hover": {
            transform: "translateY(-4px)",
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.2)"
                : "rgba(0,0,0,0.2)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 16px 32px rgba(0,0,0,0.3)"
                : "0 16px 32px rgba(0,0,0,0.08)",
          },
        }),
      })}
    >
      <Typography
        variant="h6"
        sx={{ color: "text.primary", fontWeight: 700, lineHeight: 1.35 }}
      >
        {title}
      </Typography>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          mt: 0.75,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            color: "secondary.main",
            fontSize: "0.8rem !important",
            fontWeight: 600,
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ color: "text.disabled", fontSize: "0.75rem !important" }}
        >
          {date}
        </Typography>
      </Stack>
      <Divider sx={{ my: 1.5 }} />
      <Box sx={{ flexGrow: 1 }}>
        {description && (
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", lineHeight: 1.7 }}
          >
            {description}
          </Typography>
        )}
        {listDescription && (
          <Box
            component="ul"
            sx={{
              m: 0,
              pl: 2,
              listStyle: "disc",
              "& li": {
                color: "text.secondary",
                mb: 1.25,
                paddingRight: 1,
                fontSize: "0.875rem",
                "&:last-child": { mb: 0 },
                "& p": { margin: 0, lineHeight: 1.7 },
              },
            }}
          >
            {listDescription}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SkillCard;
