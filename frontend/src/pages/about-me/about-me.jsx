import { Box, Container, Typography } from '@mui/material';
import SectionTitle from '../../components/common/section-title.jsx';
import aboutImage from '../../assets/images/about-me.png';
import TwoColumnSection from '../../components/common/section-body-type-1.jsx';
import OneColumnSection from '../../components/common/section-body-type-2.jsx';
import SkillIcon from '../../components/common/skill-icon.jsx';

const About = () => {
  return (
    <Container
      sx={{
        pt: 16,
      }}
    >
      <SectionTitle title={'Who Am I'} />
      <TwoColumnSection
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

      <SectionTitle title={'Education'} />
      <TwoColumnSection
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

      <SectionTitle title={'Skills'} />
      <OneColumnSection
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
    </Container>
  );
};

export default About;
