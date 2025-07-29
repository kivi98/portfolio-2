import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import { Skill } from "../../../features/skills.config";

interface SkillChipProps {
  itemList: Skill[];
  skillType: string;
}

const SkillChip = ({ itemList, skillType }: SkillChipProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      {skillType && (
        <Typography
          variant="h6"
          sx={{
            color: "text.main",
            mb: 2,
            fontWeight: "bold",
          }}
        >
          {skillType}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 3,
        }}
      >
        {itemList.map((skill) => (
          <Chip
            key={skill.id}
            label={skill.label}
            sx={{
              backgroundColor: skill.color,
              color: "white",
              fontWeight: "bold",
              fontSize: "0.8rem",
              height: "28px",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: skill.color,
                opacity: 0.8,
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Box>
      <Box sx={{ width: "100%" }}>
        {itemList.map((skill) => (
          <Box key={skill.id} sx={{ mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: 500,
                  fontSize: "0.9rem",
                }}
              >
                {skill.label}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                {skill.level}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={skill.level}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: skill.color,
                  borderRadius: 4,
                  boxShadow: `0 0 8px ${skill.color}40`,
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SkillChip;
