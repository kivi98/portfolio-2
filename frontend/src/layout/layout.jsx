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
          minHeight: '100vh',
          maxHeight: 'fit-content',
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
