import { Box, Container, InputAdornment, Stack } from '@mui/material';
import blogImage from '../../assets/images/blogImage.png';
import KTextField from '../../components/common/textField-normal.jsx';
import SearchIcon from '@mui/icons-material/Search';
import ProjectCard from '../blog/components/blog-card.jsx';
import test from '../../assets/images/test.png';

const Projects = () => {
  return (
    <Container>
      <Box>
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
      <Box sx={{ my: 2 }}>
        <Stack
          direction={'row'}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <KTextField
            name={'projectSearch'}
            placeholder={'Search Projects'}
            size={'small'}
            type={'search'}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <SearchIcon sx={{ color: 'primary.lighter' }} />
                </InputAdornment>
              ),
            }}
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
        <ProjectCard
          blogPostImage={test}
          description={'testing'}
          title={'This is a Testing Project Post'}
          hearts={30}
        />
        <ProjectCard
          blogPostImage={test}
          description={'testing'}
          title={'This is a Testing Project Post'}
          hearts={30}
        />
        <ProjectCard
          blogPostImage={test}
          description={'testing'}
          title={'This is a Testing Project Post'}
          hearts={30}
        />
        <ProjectCard
          blogPostImage={test}
          description={'testing'}
          title={'This is a Testing Project Post'}
          hearts={30}
        />
      </Box>
    </Container>
  );
};

export default Projects;
