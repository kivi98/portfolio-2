import { Box } from "@mui/material";
import OneColumnSection from "./OneColumnSection";
import SkillIcon from "./SkillIcon";

const SkillBadges = () => {
  return (
    <OneColumnSection
      title={"Skill Badges"}
      sectionDescription={
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {/* Skill badges will be rendered here */}
          <SkillIcon image="/badges/react-badge.png" placeholderText="React" />
          <SkillIcon image="/badges/node-badge.png" placeholderText="Node.js" />
          <SkillIcon image="/badges/azure-badge.png" placeholderText="Azure" />
          <SkillIcon image="/badges/git-badge.png" placeholderText="Git" />
        </Box>
      }
    />
  );
};

export default SkillBadges;
