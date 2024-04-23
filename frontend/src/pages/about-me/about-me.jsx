import { Box, Container, Typography } from '@mui/material';
import SectionTitle from '../../components/Layouts/section-title.jsx';
import aboutImage from '../../assets/images/about-me.png';
import TwoColumnSection from '../../components/Layouts/section-body-type-2.jsx';
import OneColumnSection from '../../components/Layouts/section-body-type-1.jsx';
import SkillIcon from '../../components/Layouts/skill-icon.jsx';
import SkillCard from '../../components/Layouts/skill-card.jsx';

const About = () => {
  return (
    <Container>
      <TwoColumnSection
        title={'Who Am I'}
        rightComponent={
          <img src={aboutImage} alt={'body-image'} style={{ height: 400 }} />
        }
        leftComponent={
          <Typography variant={'body1'} fontSize={20}>
            <span>
              I’m just an ordinary student trying to be an expert in Software
              Engineering field. Eager to explore the dynamic world of
              technology, I am committed to honing my programming skills and
              embracing innovative solutions to real-world challenges. I’m just
              an ordinary student trying to be an expert in Software Engineering
              field. Eager to explore the dynamic world of technology, I am
              committed to honing my programming skills and embracing innovative
              solutions to real-world challenges.
            </span>
          </Typography>
        }
      />

      <TwoColumnSection
        title={'Education'}
        rightComponent={
          <Typography variant={'body1'} fontSize={20}>
            <span>
              <b>University of Colombo School of Computing</b>
              <br />
              <br />
              <b>Degree:</b> BSc in Information Systems
              <br />
              <b>Year:</b> 2021 - Present
              <br />
            </span>
          </Typography>
        }
        leftComponent={
          <img src={aboutImage} alt={'body-image'} style={{ height: 400 }} />
        }
      />

      <OneColumnSection
        title={'Skills'}
        sectionDescription={
          <Typography variant={'caption'} fontSize={20}>
            <span>
              C, HTML, Java, CSS, JavaScript, React, Node.js, Express.js,
              MongoDB, SQL, Git, GitHub, Linux, Windows, Visual Studio Code,
              Figma, Microsoft Office, Google Suite, WordPress, Canva, and more.
            </span>
          </Typography>
        }
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

      <TwoColumnSection
        title={'Certifications'}
        rightComponent={
          <img src={aboutImage} alt={'body-image'} style={{ height: 400 }} />
        }
        leftComponent={
          <SkillCard
            title={'Certified Cyber-Security'}
            date={'20/12/2023'}
            description={'ISC2 Certifications'}
          />
        }
      />
    </Container>
  );
};

export default About;
