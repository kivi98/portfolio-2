import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import blogImage from '../../assets/images/blogImage.png';
import ProjectCard from './components/project-card.jsx';
import KDivider from '../../components/common/divider-vertical.jsx';
import data from './dummy-data/projects.json';
import SearchTextField from '../../components/common/search-text-field.jsx';
import useProjectsLogic from './hooks/use-projects-logic.js';

const Projects = () => {
  const { handleProjectClick } = useProjectsLogic();
  return (
    <Container>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ gap: 2, width: '100%', display: 'flex' }}
      >
        <Box sx={{ width: { xs: '100%', md: '40%' } }}>
          <img
            src={blogImage}
            alt={'blogImage'}
            style={{
              height: 300,
              borderRadius: 5,
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box
          sx={{ mb: 2, width: { xs: '100%', md: '60%' }, px: { xs: 0, md: 2 } }}
        >
          <Stack
            direction={'column'}
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'right',
              width: '100%',
            }}
          >
            <Typography
              variant={'h4'}
              sx={{
                color: 'text.main',
                fontWeight: 800,
                mb: 1,
                width: '100%',
                fontSize: 50,
              }}
            >
              Projects
            </Typography>
            <Divider
              sx={{
                backgroundColor: 'secondary.light',
                height: 1,
                width: '100%',
              }}
            />
            <Typography
              variant={'subtitle1'}
              sx={{ color: 'text.main', mt: 2 }}
            >
              A collection of projects I have worked on in the past
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Box sx={{ py: 2 }}>
        <KDivider orientation={'horizontal'} width={'100%'} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Stack
          direction={'row'}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <SearchTextField
            name={'projectSearch'}
            placeholder={'Search Projects'}
          />
        </Stack>
      </Box>
      <Box
        sx={{
          mt: 3,
          gap: 1,
          display: 'flex',
          flexWrap: 'wrap',
          mb: 5,
        }}
      >
        {data.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            viewProject={handleProjectClick}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Projects;
