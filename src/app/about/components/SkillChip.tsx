import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import { Skill } from "../../../features/skills.config";

interface SkillChipProps {
  itemList: Skill[];
  skillType: string;
}

const SkillChip = ({ itemList, skillType }: SkillChipProps) => {
  return (
    <Box sx={{ width: "100%" }}>
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 2,
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
              "&:hover": {
                backgroundColor: skill.color,
                opacity: 0.8,
              },
            }}
          />
        ))}
      </Box>
      <Box sx={{ width: "100%" }}>
        {itemList.map((skill) => (
          <Box key={skill.id} sx={{ mb: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {skill.label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {skill.level}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={skill.level}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: skill.color,
                  borderRadius: 3,
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
