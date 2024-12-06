import KImageBox from '../../../components/common/imageBox-standard.jsx';
import aboutImage from '../../../assets/images/about-me.png';
import SkillCard from '../../../components/common/skill-card.jsx';
import TwoColumnSection from '../../../components/common/section-body-type-2.jsx';

const Achievements = () => {
  return (
    <TwoColumnSection
      title={'Achievements'}
      rightComponent={
        <KImageBox
          src={aboutImage}
          alt={'body-image'}
          height={{ xs: 300, md: 400 }}
        />
      }
      leftComponent={
        <SkillCard title={'XYZ'} date={'20/12/2023'} description={'XYZ'} />
      }
    />
  );
};

export default Achievements;
