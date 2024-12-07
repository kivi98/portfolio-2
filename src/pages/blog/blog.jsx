import {
  Box,
  Container,
  Stack,
  InputAdornment,
  Typography,
  Divider,
} from '@mui/material';
import blogImage from '../../assets/images/blogImage.png';
import BlogCard from './components/blog-card.jsx';
import test from '../../assets/images/test.png';
import KTextField from '../../components/common/textField-normal.jsx';
import SearchIcon from '@mui/icons-material/Search';
import KDivider from '../../components/common/divider-vertical.jsx';
import PopupDialog from '../../components/common/popup-dialog.jsx';
import useBlogLogic from './hooks/use-blog-logic.js';

const Blog = () => {
  const {
    open,
    handleClose,
    handleOpen,
    fullScreen,
    handleCloseFullScreen,
    handleFullScreen,
  } = useBlogLogic();
  return (
    <Container>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{ gap: 2, width: '100%', display: 'flex' }}
      >
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
              Blogs
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
              A collection of blogs I have worked on in the past
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
          <KTextField
            name={'blogSearch'}
            placeholder={'Search Blogs'}
            size={'small'}
            type={'search'}
            InputProps={{
              startAdornment: (
                <InputAdornment position={'start'}>
                  <SearchIcon sx={{ color: 'primary.lighter' }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', md: 300 } }}
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
        <BlogCard
          blogPostImage={test}
          open={open}
          openDialog={handleOpen}
          closeDialog={handleClose}
          fullScreen={fullScreen}
          openFullScreen={handleFullScreen}
          closeFullScreen={handleCloseFullScreen}
          description={'testing'}
          content={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }
          title={'This is a Testing Blog Post'}
          hearts={30}
        />
        <BlogCard
          blogPostImage={test}
          description={'testing'}
          title={'This is a Testing Blog Post'}
          hearts={30}
        />
        <BlogCard
          blogPostImage={test}
          description={'testing'}
          title={'This is a Testing Blog Post'}
          hearts={30}
        />
        <BlogCard
          blogPostImage={test}
          description={'testing'}
          title={'This is a Testing Blog Post'}
          hearts={30}
        />
      </Box>
    </Container>
  );
};

export default Blog;
