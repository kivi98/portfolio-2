import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/header.jsx';

const Layout = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: 'primary.light',
          minHeight: 'calc(100vh - 150px)',
          maxHeight: 'fit-content',
          display: 'flex',
          pt: { xs: '100px', md: '150px' },
          color: 'text.main',
          pb: { xs: 8, md: 0 },
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
