import OneColumnSection from '../../../components/common/section-body-type-1.jsx';
import { Box } from '@mui/material';
import SkillIcon from '../../../components/common/skill-icon.jsx';
import aboutImage from '../../../assets/images/about-me.png';

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
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
          <SkillIcon image={aboutImage} placeholderText={'test'} />
        </Box>
      }
    />
  );
};

export default SkillBadges;
