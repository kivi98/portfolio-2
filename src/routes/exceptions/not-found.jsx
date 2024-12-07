import { Box, Button, Stack, Typography } from '@mui/material';
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
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        px: 3,
        color: 'text.main',
      }}
    >
      <Typography variant={'h1'} sx={{ mb: 2 }}>
        404: Page Not Found
      </Typography>
      <Box>
        <Typography variant={'subtitle2'} sx={{ textAlign: 'center' }}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <NavLink to={'/'}>
          <KButton btnLabel={'Go to Home'} />
        </NavLink>
      </Box>
    </Stack>
  );
};

export default NotFound;
