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
          pt: '150px',
          color: 'text.main',
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
