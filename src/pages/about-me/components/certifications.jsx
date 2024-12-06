import KImageBox from '../../../components/common/imageBox-standard.jsx';
import aboutImage from '../../../assets/images/about-me.png';
import { Box, IconButton, Stack } from '@mui/material';
import SkillCard from '../../../components/common/skill-card.jsx';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TwoColumnSection from '../../../components/common/section-body-type-2.jsx';

const Certifications = () => {
  return (
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
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Stack
            direction={'column'}
            sx={{
              width: '100%',
              gap: 1,
              alignItems: 'center',
              maxHeight: '45vh',
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              msOverflowStyle: 'none',
              scrollbarWidth: 'none',
            }}
          >
            <SkillCard
              title={'Azure Fundamentals Certification'}
              subtitle={'Microsoft'}
              date={'20/12/2023'}
              description={
                'Gained foundational knowledge of Azure services, cloud computing principles, and security, enabling effective integration of cloud solutions in projects.'
              }
            />
            <SkillCard
              title={'GitHub Foundation Exam'}
              subtitle={'GitHub'}
              date={'20/12/2023'}
              description={
                'Demonstrated proficiency in GitHub tools and workflows, essential for modern version control and collaborative software development.'
              }
            />
            <SkillCard
              title={'Postman API Fundamentals Student Expert'}
              subtitle={'Postman'}
              date={'20/12/2023'}
              description={
                'Mastered API testing and documentation with Postman, enhancing API integration and debugging capabilities.'
              }
            />
            <SkillCard
              title={'Certified Cyber-Security'}
              subtitle={'ISC2 Certifications'}
              date={'20/12/2023'}
              description={
                'Validated foundational knowledge in cybersecurity concepts, ensuring secure application design and deployment'
              }
            />
            <SkillCard
              title={'Cyber-security Essentials'}
              subtitle={'Cisco'}
              date={'20/12/2023'}
              description={
                'Developed a strong understanding of cybersecurity practices to mitigate threats and vulnerabilities in software systems.'
              }
            />
            <SkillCard
              title={'Introduction to Cyber-security'}
              subtitle={'Cisco'}
              date={'20/12/2023'}
              description={
                'Acquired introductory knowledge of cybersecurity concepts, essential for creating resilient applications.'
              }
            />
            <SkillCard
              title={'Agile Foundation'}
              subtitle={'PMIS'}
              date={'20/12/2023'}
              description={
                'Developed practical skills for implementing Scrum practices in software development projects.'
              }
            />
            <SkillCard
              title={'Scrum: The Basics'}
              subtitle={'PMIS'}
              date={'20/12/2023'}
              description={
                'Understood the core principles of Scrum to enhance team collaboration and iterative development.'
              }
            />
            <SkillCard
              title={'Agile Software Development: Scrum for Developers'}
              subtitle={'PMIS'}
              date={'20/12/2023'}
              description={
                'Deepened expertise in Scrum methodologies, enabling better handling of complex projects and team dynamics.'
              }
            />
            <SkillCard
              title={'Scrum: Advanced'}
              subtitle={'PMIS'}
              date={'20/12/2023'}
              description={
                'Deepened expertise in Scrum methodologies, enabling better handling of complex projects and team dynamics.'
              }
            />
            <SkillCard
              title={'Creating API Documentation'}
              subtitle={'LinkedIn Learning'}
              date={'20/12/2023'}
              description={
                'Enhanced skills in crafting clear and effective API documentation to improve developer collaboration and API usability.'
              }
            />
          </Stack>

          {/*<Box*/}
          {/*  sx={{*/}
          {/*    height: 50,*/}
          {/*    width: '100%',*/}
          {/*    display: 'flex',*/}
          {/*    justifyContent: 'center',*/}
          {/*    position: 'relative',*/}
          {/*    backgroundColor: 'transparent',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <IconButton>*/}
          {/*    <KeyboardArrowUpIcon color={'text'} />*/}
          {/*  </IconButton>*/}
          {/*</Box>*/}
        </Box>
      }
    />
  );
};

export default Certifications;
