import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import blogs from '../dummy-blog-data/blogs.json';
import KDivider from '../../../components/common/divider-vertical.jsx';

const BlogView = () => {
  const blogId = Number(useParams().id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedBlog = blogs.find((blog) => blog.id === blogId);
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ mt: { xs: -3, md: -9 } }}>
      <AppBar
        position={'relative'}
        sx={{ backgroundColor: 'primary.main', zIndex: 1000 }}
      >
        <Stack
          direction={'row'}
          sx={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{ color: 'text.main', ml: 1 }}
            aria-label={'menu'}
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 50,
              color: 'text.main',
            }}
          >
            {/*<Typography variant={'h3'}>Blog Title</Typography>*/}
          </Box>
          <IconButton sx={{ color: 'text.main', mr: 1 }} aria-label={'search'}>
            <SearchIcon />
          </IconButton>
        </Stack>
      </AppBar>
      <Container>
        <Box sx={{ mt: 3, px: 2 }}>
          <Typography variant={'h1'}>{selectedBlog.title}</Typography>
          <KDivider
            orientation={'horizontal'}
            width={'100%'}
            sx={{ mt: 2, mb: '0.1rem' }}
          />
          <Stack
            direction={'row'}
            sx={{
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant={'subtitle2'}
              color={'transparentLevelsWhite.6'}
              sx={{ fontSize: 14 }}
            >
              {selectedBlog.author}
            </Typography>
            <Typography
              variant={'subtitle2'}
              color={'transparentLevelsWhite.6'}
              sx={{ fontSize: 14 }}
            >
              {selectedBlog.date}
            </Typography>
          </Stack>
          <KDivider
            orientation={'horizontal'}
            width={'100%'}
            sx={{ mb: 2, mt: '0.1rem' }}
          />
          <Typography variant={'subtitle2'} color={'transparentLevelsWhite.9'}>
            {selectedBlog.content}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogView;
