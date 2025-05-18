import OneColumnSection from '../../../components/common/section-body-type-1.jsx';
import { Box } from '@mui/material';
import SkillIcon from '../../../components/common/skill-icon.jsx';
import skillsConfig from '../../../utils/skillsConfig';

const SkillBadges = () => {
  return (
    <OneColumnSection
      sectionBody={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {skillsConfig.map((skill, index) => (
            <SkillIcon 
              key={index}
              image={skill.image} 
              placeholderText={skill.name} 
            />
          ))}
        </Box>
      }
    />
  );
};

export default SkillBadges;
