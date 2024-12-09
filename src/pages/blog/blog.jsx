import {
  Box,
  Container,
  Stack,
  InputAdornment,
  Typography,
  Divider,
  TextField,
} from '@mui/material';
import blogImage from '../../assets/images/blogImage.png';
import BlogCard from './components/blog-card.jsx';
import test from '../../assets/images/test.png';
import KTextField from '../../components/common/textField-normal.jsx';
import SearchIcon from '@mui/icons-material/Search';
import KDivider from '../../components/common/divider-vertical.jsx';
import useBlogLogic from './hooks/use-blog-logic.js';
import blogs from './dummy-blog-data/blogs.json';

const Blog = () => {
  const { handleBlogClick } = useBlogLogic();
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
      <Box sx={{ py: 1 }}>
        <KDivider orientation={'horizontal'} width={'100%'} />
      </Box>
      <Box sx={{ mb: 1 }}>
        <Stack
          direction={'row'}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            mb: 2,
          }}
        >
          <TextField
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
            sx={{
              width: { xs: '100%', md: 400 },
              backgroundColor: 'primary.light2',
              borderRadius: 3,
              borderColor: 'primary.main',
              transition: 'width 0.3s ease-in-out',
              '&:focus-within': {
                width: { xs: '100%', md: 600 },
              },
              '.MuiOutlinedInput-root': {
                '& fieldset': {
                  color: 'primary.light3',
                  border: 0.5,
                  borderRadius: 3,
                },
                '&:hover fieldset': {
                  borderColor: 'primary.lighter',
                  borderRadius: 3,
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.lighter',
                  borderWidth: 1,
                  borderRadius: 3,
                },
                '& .MuiOutlinedInput-input': {
                  color: 'text.dark',
                  borderRadius: 3,
                },
              },
            }}
          />
        </Stack>
      </Box>
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          flexWrap: 'wrap',
          mb: 5,
          justifyContent: 'space-between',
        }}
      >
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} viewArticle={handleBlogClick} />
        ))}
      </Box>
    </Container>
  );
};

export default Blog;
