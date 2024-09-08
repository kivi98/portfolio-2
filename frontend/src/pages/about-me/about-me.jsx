import {
  Box,
  Container,
  List,
  ListItem,
  Menu,
  Stack,
  Typography,
} from '@mui/material';
import aboutImage from '../../assets/images/about-me.png';
import TwoColumnSection from '../../components/Layouts/section-body-type-2.jsx';
import OneColumnSection from '../../components/Layouts/section-body-type-1.jsx';
import SkillIcon from '../../components/Layouts/skill-icon.jsx';
import SkillCard from '../../components/Layouts/skill-card.jsx';
import KImageBox from '../../components/common/imageBox-standard.jsx';
import { MyImageArray } from './image-arrays/my-image-array.js';
import GenerateChipArt from '../../utils/generate-chip-art.jsx';
import {
  cloudSkills,
  databaseSkills,
  frameworkSkills,
  languageSkills,
  osSkills,
  toolSkills,
  webSkills,
} from './Data/skill-data.js';

const About = () => {
  console.log('array', MyImageArray);
  return (
    <Container>
      <TwoColumnSection
        title={'Who Am I'}
        rightComponent={
          <KImageBox
            imageArray={MyImageArray}
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
          <Stack
            direction={'column'}
            sx={{
              width: '100%',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <SkillCard
              date={'2021 - 2024'}
              title={'BSc. Information Systems'}
              description={'University of Colombo School of Computing'}
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

      <OneColumnSection
        // title={'Skills'}
        // sectionDescription={
        //
        // }
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
