import { Box, Stack, Typography, Divider } from "@mui/material";
import { ReactNode } from "react";

interface SkillCardProps {
  title: string;
  subtitle?: string;
  description?: ReactNode;
  date: string;
  listDescription?: ReactNode;
}

const SkillCard = ({
  title,
  subtitle,
  description,
  date,
  listDescription,
}: SkillCardProps) => {
  return (
    <Box
      sx={{
        pt: 2,
        px: 2.5,
        pb: 2.5,
        width: { xs: "calc(100% - 20px)", md: "96%" },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
        borderRadius: "10px",
        backgroundColor: "transparentLevels.3",
        boxShadow: "0px 0px 12px rgba(0,0,0,0.1)",
        border: "1px solid",
        borderColor: "divider",
        marginInline: "2rem",
        position: "relative",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.2)",
        },
      }}
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
