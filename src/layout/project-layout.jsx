import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const ProjectLayout = () => {
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

export default ProjectLayout;
