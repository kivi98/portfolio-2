import { Box, Tooltip } from "@mui/material";

interface SkillIconProps {
  image: string;
  placeholderText: string;
}

const SkillIcon = ({ image, placeholderText }: SkillIconProps) => {
  return (
    <Tooltip title={placeholderText} arrow>
      <Box
        component="img"
        src={image}
        alt={placeholderText}
        sx={{
          width: { xs: 50, md: 60 },
          height: { xs: 50, md: 60 },
          borderRadius: 1,
          cursor: "pointer",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
        onError={(e) => {
          // Fallback to placeholder if image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    </Tooltip>
  );
};

export default SkillIcon;
