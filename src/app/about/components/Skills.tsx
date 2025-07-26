import { List, ListItem } from "@mui/material";
import TwoColumnSection from "./TwoColumnSection";
import SkillChip from "./SkillChip";
import {
  languageSkills,
  webSkills,
  databaseSkills,
  cloudSkills,
  toolSkills,
  osSkills,
  frameworkSkills,
} from "../../../features/skills.config";

const Skills = () => {
  return (
    <TwoColumnSection
      title={"Skills"}
      leftComponent={
        <List>
          <ListItem>
            <SkillChip
              itemList={languageSkills}
              skillType={"Programming Languages"}
            />
          </ListItem>
          <ListItem>
            <SkillChip itemList={webSkills} skillType={"Web Development"} />
          </ListItem>
          <ListItem>
            <SkillChip itemList={databaseSkills} skillType={"Databases"} />
          </ListItem>
          <ListItem>
            <SkillChip itemList={cloudSkills} skillType={"Cloud"} />
          </ListItem>
        </List>
      }
      rightComponent={
        <List sx={{ mt: { xs: -4, md: 0 } }}>
          <ListItem>
            <SkillChip itemList={toolSkills} skillType={"Tools"} />
          </ListItem>
          <ListItem>
            <SkillChip itemList={osSkills} skillType={"Operating Systems"} />
          </ListItem>
          <ListItem>
            <SkillChip itemList={frameworkSkills} skillType={"Frameworks"} />
          </ListItem>
        </List>
      }
    />
  );
};

export default Skills;
