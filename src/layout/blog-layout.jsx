import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const BlogLayout = () => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Outlet />
    </Box>
  );
};

export default BlogLayout;
