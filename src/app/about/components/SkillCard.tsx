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
        pt: 2,
        px: 2.5,
        pb: 2.5,
        width: { xs: "calc(100% - 0px)", md: "100%" },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
        borderRadius: "10px",
        backgroundColor: theme.palette.mode === "dark"
          ? "transparentLevels.3"
          : "background.paper", // White cards in light mode
        boxShadow: theme.palette.mode === "dark"
          ? "0px 0px 12px rgba(0,0,0,0.3)"
          : "0px 2px 8px rgba(0,0,0,0.08)", // Softer shadow in light mode
        border: "1px solid",
        borderColor: theme.palette.mode === "dark"
          ? "divider"
          : "rgba(0,0,0,0.08)", // Subtle border in light mode
        marginInline: "2rem",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        ...(zoomInAnimation && {
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: theme.palette.mode === "dark"
              ? "0px 0px 16px rgba(227,0,0,0.3)"
              : "0px 4px 16px rgba(0,0,0,0.12)",
          },
        }),
      })}
    >
      <Stack
        direction={"row"}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography
          variant={"h3"}
          sx={{
            color: "text.primary",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant={"subtitle1"}
          sx={{ color: "secondary.light", fontSize: "0.75rem !important" }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant={"subtitle2"}
          sx={{ color: "text.secondary", fontSize: "0.75rem !important" }}
        >
          {date}
        </Typography>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        {description && (
          <Typography
            variant={"body1"}
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
            }}
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
                mb: 1.5,
                paddingRight: 1,
                "&:last-child": {
                  mb: 0,
                },
                "& p": {
                  margin: 0,
                  lineHeight: 1.6,
                },
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
