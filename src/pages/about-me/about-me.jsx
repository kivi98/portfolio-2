import { Container } from '@mui/material';

import WhoAmI from './components/who-am-i.jsx';
import Education from './components/education.jsx';
import Skills from './components/skills.jsx';
import SkillBadges from './components/skill-badges.jsx';
import Certifications from './components/certifications.jsx';
import Volunteering from './components/volunteering.jsx';
import Achievements from './components/achievements.jsx';
import Experience from './components/experience.jsx';

const About = () => {
  return (
    <Container>
      <WhoAmI />
      <Education />
      <Skills />
      <SkillBadges />
      <Certifications />
      <Volunteering />
      {/*<Achievements />*/}
      <Experience />
    </Container>
  );
};

export default About;
