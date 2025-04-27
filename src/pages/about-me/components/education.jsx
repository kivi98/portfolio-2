import { Stack } from '@mui/material';
import TwoColumnSection from '../../../components/common/section-body-type-2';
import KImageBox from '../../../components/common/imageBox-standard';
import SkillCard from '../../../components/common/skill-card.jsx';
import aboutImage from '../../../assets/images/about-me.png';

const Education = () => {
  return (
    <TwoColumnSection
      title={'Education'}
      rightComponent={
        <Stack
          direction={'column'}
          sx={{
            width: '100%',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <SkillCard
            date={'2024 - Present'}
            title={'MSc. Computer Science'}
            subtitle={'University of Sri Jayawardenapura'}
            description={'Specialized in Artificial Intelligence'}
          />
          <SkillCard
            date={'2021 - 2024'}
            title={'BSc. Information Systems'}
            subtitle={'University of Colombo School of Computing'}
            description={'Specialized in Software Engineering'}
          />
        </Stack>
      }
      leftComponent={
        <KImageBox
          src={aboutImage}
          alt={'body-image'}
          height={{ xs: 300, md: 400 }}
        />
      }
    />
  );
};

export default Education;
