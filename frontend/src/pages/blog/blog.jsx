import { Box, Container, Typography, Stack } from '@mui/material';
import blogImage from '../../assets/images/blogImage.png';
import BlogCard from './components/blog-card.jsx';
import test from '../../assets/images/test.png';

const Blog = () => {
  return (
    <Container>
      <Box>
        <img
          src={blogImage}
          alt={'blogImage'}
          style={{
            height: 400,
            borderRadius: 5,
            width: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      {/* ToDo: create the search function here */}
      <Box>
        <BlogCard
          blogPostImage={test}
          description={'testing'}
          title={'This is a Testing Blog Post'}
        />
      </Box>
    </Container>
  );
};

export default Blog;
