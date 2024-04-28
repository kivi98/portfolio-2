import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Header from '../components/header/header.jsx';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          backgroundColor: 'primary.light',
          minHeight: 'calc(100vh - 150px)',
          maxHeight: 'fit-content',
          display: 'flex',
          pt: { xs: '80px', md: '150px' },
          color: 'text.main',
          pb: { xs: 8, md: 0 },
        }}
      >
        {children}
      </Box>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
