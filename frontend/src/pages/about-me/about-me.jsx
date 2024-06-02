import { Box, Container, Stack, Typography } from '@mui/material';
import aboutImage from '../../assets/images/about-me.png';
import TwoColumnSection from '../../components/Layouts/section-body-type-2.jsx';
import OneColumnSection from '../../components/Layouts/section-body-type-1.jsx';
import SkillIcon from '../../components/Layouts/skill-icon.jsx';
import SkillCard from '../../components/Layouts/skill-card.jsx';
import KImageBox from '../../components/common/imageBox-standard.jsx';

const About = () => {
  return (
    <Container>
      <TwoColumnSection
        title={'Who Am I'}
        rightComponent={
          <KImageBox
            src={aboutImage}
            alt={'body-image'}
            height={{ xs: 300, md: 400 }}
          />
        }
        leftComponent={
          <Typography
            variant={'body1'}
            fontSize={20}
            sx={{
              fontSize: { xs: 14, md: 20 },
              textAlign: 'justify',
            }}
          >
            <span>
              <span style={{ fontSize: 36, fontWeight: 500 }}>I'</span>m just an
              ordinary student trying to be an expert in Software Engineering
              field. Eager to explore the dynamic world of technology, I am
              committed to honing my programming skills and embracing innovative
              solutions to real-world challenges. I’m just an ordinary student
              trying to be an expert in Software Engineering field. Eager to
              explore the dynamic world of technology, I am committed to honing
              my programming skills and embracing innovative solutions to
              real-world challenges.
            </span>
          </Typography>
        }
      />

      <TwoColumnSection
        title={'Education'}
        rightComponent={
          <Typography variant={'body1'} sx={{ xs: 14, md: 20 }}>
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
          <KImageBox
            src={aboutImage}
            alt={'body-image'}
            height={{ xs: 300, md: 400 }}
          />
        }
      />

      <OneColumnSection
        title={'Skills'}
        sectionDescription={
          <Typography
            variant={'caption'}
            sx={{ fontSize: { xs: 14, md: 20 }, textAlign: 'justify' }}
          >
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
          <KImageBox
            src={aboutImage}
            alt={'body-image'}
            height={{ xs: 300, md: 400 }}
          />
        }
        leftComponent={
          <Stack
            direction={'column'}
            sx={{
              width: '100%',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <SkillCard
              title={'Certified Cyber-Security'}
              date={'20/12/2023'}
              description={'ISC2 Certifications'}
            />
            <SkillCard
              title={'Certified Cyber-Security'}
              date={'20/12/2023'}
              description={'ISC2 Certifications'}
            />
            <SkillCard
              title={'Certified Cyber-Security'}
              date={'20/12/2023'}
              description={'ISC2 Certifications'}
            />
          </Stack>
        }
      />

      <TwoColumnSection
        title={'Volunteering'}
        rightComponent={
          <SkillCard
            title={'Volunteer at XYZ'}
            date={'20/12/2023'}
            description={'XYZ'}
          />
        }
        leftComponent={
          <KImageBox
            src={aboutImage}
            alt={'body-image'}
            height={{ xs: 300, md: 400 }}
          />
        }
      />

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

      <OneColumnSection
        title={'Experience'}
        sectionDescription={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <SkillCard title={'XYZ'} date={'20/12/2023'} description={'XYZ'} />
          </Box>
        }
      />
    </Container>
  );
};

export default About;
