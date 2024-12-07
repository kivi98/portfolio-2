import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const BlogsLayout = () => {
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

export default BlogsLayout;
