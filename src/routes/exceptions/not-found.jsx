import { Box, Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import KButton from '../../components/common/button.jsx';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Page not found: ${location.pathname}`);
  }, [location]);

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'text.main',
      }}
    >
      <h1>404: Page Not Found</h1>
      <Box>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <NavLink to={'/'}>
          <KButton
            sx={{
              color: 'text.main',
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.light',
              },
            }}
            btnLabel={'Go to Home'}
          />
        </NavLink>
      </Box>
    </Stack>
  );
};

export default NotFound;
