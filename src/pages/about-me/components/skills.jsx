import TwoColumnSection from '../../../components/common/section-body-type-2';
import GenerateChipArt from '../../../utils/generate-chip-art.jsx';
import { List, ListItem } from '@mui/material';

import {
  cloudSkills,
  databaseSkills,
  frameworkSkills,
  languageSkills,
  osSkills,
  toolSkills,
  webSkills,
} from '../Data/skill-data.js';

const Skills = () => {
  return (
    <TwoColumnSection
      title={'Skills'}
      leftComponent={
        <List>
          <ListItem>
            <GenerateChipArt
              itemList={languageSkills}
              skillType={'Programming Languages'}
            />
          </ListItem>
          <ListItem>
            <GenerateChipArt
              itemList={webSkills}
              skillType={'Web Development'}
            />
          </ListItem>
          <ListItem>
            <GenerateChipArt
              itemList={databaseSkills}
              skillType={'Databases'}
            />
          </ListItem>
          <ListItem>
            <GenerateChipArt itemList={cloudSkills} skillType={'Cloud'} />
          </ListItem>
        </List>
      }
      rightComponent={
        <List>
          <ListItem>
            <GenerateChipArt itemList={toolSkills} skillType={'Tools'} />
          </ListItem>
          <ListItem>
            <GenerateChipArt
              itemList={osSkills}
              skillType={'Operating Systems'}
            />
          </ListItem>
          <ListItem>
            <GenerateChipArt
              itemList={frameworkSkills}
              skillType={'Frameworks'}
            />
          </ListItem>
        </List>
      }
    />
  );
};

export default Skills;
